import { supabaseAdmin } from '@/lib/supabase';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return new Response(JSON.stringify({ error: 'User ID is required' }), { status: 400 });
  }

  try {
    if (!supabaseAdmin) {
      return new Response(JSON.stringify({ error: 'Server configuration error' }), { status: 500 });
    }

    // Always-safe columns (existed before migration)
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('is_premium, premium_expires_at')
      .eq('id', userId)
      .single();

    if (error) throw error;

    // Check if subscription has expired
    let isPremium = data?.is_premium || false;
    let premiumExpiresAt = data?.premium_expires_at;

    if (isPremium && premiumExpiresAt) {
      const expiryDate = new Date(premiumExpiresAt);
      if (new Date() > expiryDate) {
        isPremium = false;
        await supabaseAdmin
          .from('profiles')
          .update({ is_premium: false })
          .eq('id', userId);
      }
    } else if (!isPremium && !premiumExpiresAt) {
      // NEW USER TRIAL: Give 1 day of free pro features if they've never had premium/trial
      console.log(`UserStatus: Activating 1-day trial for new user ${userId}`);
      const trialExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

      const { error: trialError } = await supabaseAdmin
        .from('profiles')
        .update({
          is_premium: true,
          premium_expires_at: trialExpiry,
          premium_since: new Date().toISOString()
        })
        .eq('id', userId);

      if (!trialError) {
        isPremium = true;
        premiumExpiresAt = trialExpiry;
        return new Response(JSON.stringify({
          isPremium: true,
          isTrial: true,
          trialActivated: true,
          expiresAt: trialExpiry,
          quota: { used: 0, limit: 5, remaining: 5 }
        }), {
          status: 200,
          headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        });
      }
    }

    // Try to get quota columns — gracefully handle if migration hasn't run yet
    let decodesUsed = 0;
    try {
      const { data: quotaData } = await supabaseAdmin
        .from('profiles')
        .select('free_decodes_used, free_decodes_reset_at')
        .eq('id', userId)
        .single();

      if (quotaData) {
        decodesUsed = quotaData.free_decodes_used ?? 0;
        const resetAt = quotaData.free_decodes_reset_at
          ? new Date(quotaData.free_decodes_reset_at)
          : null;
        const startOfThisMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        if (!resetAt || resetAt < startOfThisMonth) {
          decodesUsed = 0;
        }
      }
    } catch {
      // Quota columns don't exist yet — migration pending, default to 0
      decodesUsed = 0;
    }

    return new Response(JSON.stringify({
      isPremium,
      isTrial: data?.is_premium === false && premiumExpiresAt !== null, // True if they are premium now but were free before (in this request cycle)
      expiresAt: premiumExpiresAt,
      quota: {
        used: decodesUsed,
        limit: 5,
        remaining: Math.max(0, 5 - decodesUsed),
      }
    }), {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
