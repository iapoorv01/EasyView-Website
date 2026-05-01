import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { userId, featureName, action, urlDomain } = await req.json();

    if (!userId) {
      return new Response(JSON.stringify({ error: 'User ID is required' }), { status: 400 });
    }

    if (!supabaseAdmin) {
      return new Response(JSON.stringify({ error: 'Server configuration error' }), { status: 500 });
    }

    const { error } = await supabaseAdmin
      .from('usage_analytics')
      .insert({
        user_id: userId,
        feature_name: featureName,
        action: action,
        url_domain: urlDomain
      });

    if (error) throw error;

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    console.error('Usage Log Error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
