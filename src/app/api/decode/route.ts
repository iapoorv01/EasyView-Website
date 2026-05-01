import { supabaseAdmin } from '@/lib/supabase';

const FREE_LIMIT = 5;
const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemma-3-27b-it:generateContent';

// Handle CORS preflight (Chrome extension needs this)
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(),
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, text, type = 'jargon' } = body;

    if (!userId || !text) {
      return jsonResponse({ error: 'userId and text are required' }, 400);
    }

    if (!supabaseAdmin) {
      return jsonResponse({ error: 'Server configuration error' }, 500);
    }

    // --- 1. Fetch user profile ---
    const { data: profile, error: fetchError } = await supabaseAdmin
      .from('profiles')
      .select('is_premium, premium_expires_at, free_decodes_used, free_decodes_reset_at')
      .eq('id', userId)
      .single();

    if (fetchError || !profile) {
      return jsonResponse({ error: 'User not found' }, 404);
    }

    // --- 2. Check if premium expired ---
    let isPremium = profile.is_premium || false;
    if (isPremium && profile.premium_expires_at) {
      if (new Date() > new Date(profile.premium_expires_at)) {
        isPremium = false;
        await supabaseAdmin.from('profiles').update({ is_premium: false }).eq('id', userId);
      }
    }

    // --- 3. Monthly reset check ---
    let decodesUsed = profile.free_decodes_used ?? 0;
    const resetAt = profile.free_decodes_reset_at ? new Date(profile.free_decodes_reset_at) : null;
    const now = new Date();
    // Use UTC month boundary to match Supabase's date_trunc('month', now()) which is UTC
    const startOfThisMonthUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));

    if (!resetAt || resetAt < startOfThisMonthUTC) {
      // Reset counter for the new month
      decodesUsed = 0;
      await supabaseAdmin
        .from('profiles')
        .update({ free_decodes_used: 0, free_decodes_reset_at: startOfThisMonthUTC.toISOString() })
        .eq('id', userId);
    }

    // --- 4. Quota gate ---
    if (!isPremium && decodesUsed >= FREE_LIMIT) {
      return jsonResponse({
        error: 'quota_exceeded',
        used: decodesUsed,
        limit: FREE_LIMIT,
        message: 'You have used all 5 free Jargon Decoder uses this month. Upgrade to Pro for unlimited access.',
      }, 429);
    }

    // --- 5. Call Gemini with EasyView's key ---
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return jsonResponse({ error: 'AI service not configured' }, 500);
    }

    const prompt = buildPrompt(text, type);
    const geminiRes = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
      }),
    });

    if (!geminiRes.ok) {
      const errData = await geminiRes.json().catch(() => ({}));
      console.error('Gemini error:', errData);
      return jsonResponse({ error: 'AI request failed', detail: errData?.error?.message }, 502);
    }

    const geminiData = await geminiRes.json();
    const resultText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // --- 6. Increment usage counter (only for free users) ---
    if (!isPremium) {
      const { error: incrementError } = await supabaseAdmin
        .from('profiles')
        .update({ free_decodes_used: decodesUsed + 1 })
        .eq('id', userId);
      if (incrementError) {
        console.error('Failed to increment free_decodes_used:', incrementError);
      }
    }

    // --- 7. Parse and return result ---
    const parsed = parseResult(resultText, type);
    return jsonResponse({
      success: true,
      data: parsed,
      quota: {
        used: isPremium ? null : decodesUsed + 1,
        limit: isPremium ? null : FREE_LIMIT,
        isPremium,
      },
    });

  } catch (err: any) {
    console.error('/api/decode error:', err);
    return jsonResponse({ error: err.message || 'Internal server error' }, 500);
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────

function buildPrompt(text: string, type: string): string {
  let cleanText = text.replace(/\s+/g, ' ').trim();

  if (type === 'simplify') {
    return `You are a plain language expert helping neurodivergent users understand complex text.

ORIGINAL TEXT:
"""
${cleanText.slice(0, 3000)}
"""

YOUR TASK:
Rewrite this text in SIMPLE, PLAIN ENGLISH that is easy to understand.

RULES:
1. Use short sentences (max 15 words each)
2. Use common, everyday words
3. Avoid jargon, technical terms, and formal language
4. Break down complex ideas into simple steps
5. Use active voice ("We will send" not "It will be sent")
6. Explain any necessary technical terms in parentheses
7. Keep the same meaning and all important information
8. Use bullet points for lists when helpful
9. Write at a 6th-grade reading level

RESPOND with valid JSON only (no markdown):
{
  "simplified": "the rewritten text in plain English",
  "readingLevel": "estimated grade level (e.g., '6th grade')",
  "keyChanges": ["brief list of main simplifications made"]
}`;
  }

  // Default: jargon detection
  // Extension specifically applies character stripping for jargon detection
  cleanText = text
    .replace(/\s+/g, ' ')
    .replace(/[^\w\s.,;:'"()-]/g, '')
    .trim();

  return `You are an expert accessibility assistant helping neurodivergent users understand complex terminology.

CONTEXT: Analyze this webpage content and identify terms that may be difficult to understand.

PAGE CONTENT:
"""
${cleanText.slice(0, 4000)}
"""

YOUR TASK:
1. Identify complex terms in these categories:
   - LEGAL: contracts, agreements, liability, terms of service
   - FINANCIAL: fees, payments, billing, transactions
   - TECHNICAL: software, digital, computing terms
   - MEDICAL: health, conditions, treatments
   - GOVERNMENT: regulations, policies, bureaucratic language
   - ACADEMIC: formal, scholarly language

2. For each term provide:
   - The exact term as it appears (preserve case)
   - A simple 2-4 word alternative
   - A brief explanation (max 15 words)
   - Category (legal/financial/technical/medical/government/academic)
   - Difficulty level (1-3, where 3 is most complex)

3. PRIORITIZE:
   - Terms related to user actions or decisions
   - Terms that could cause confusion or anxiety
   - Terms with legal or financial implications
   - Acronyms and abbreviations

RESPOND with valid JSON array only (no markdown):
[
  {
    "jargon": "exact term",
    "simple": "easy alternative",
    "explanation": "brief context in plain English",
    "category": "legal|financial|technical|medical|government|academic",
    "difficulty": 1-3
  }
]

Return up to 15 terms, sorted by importance. If no complex terms found, return empty array [].`;
}

function parseResult(text: string, type: string): any {
  try {
    if (type === 'simplify') {
      const match = text.match(/\{[\s\S]*\}/);
      if (!match) return null;
      const result = JSON.parse(match[0]);
      return result.simplified ? result : null;
    }

    // jargon
    const match = text.match(/\[[\s\S]*?\]/);
    if (!match) return [];
    const result = JSON.parse(match[0]);
    return Array.isArray(result)
      ? result
        .filter((item: any) => item.jargon && item.simple && item.jargon.length >= 3 && item.jargon.length <= 50)
        .map((item: any) => ({
          jargon: String(item.jargon).trim(),
          simple: String(item.simple).trim(),
          explanation: String(item.explanation || '').trim(),
          category: item.category || 'general',
          difficulty: Math.min(3, Math.max(1, Number(item.difficulty) || 2)),
        }))
        .sort((a: any, b: any) => b.difficulty - a.difficulty)
      : [];
  } catch {
    return type === 'simplify' ? null : [];
  }
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };
}

function jsonResponse(body: object, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: corsHeaders() });
}
