import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { userId, version, browserInfo } = await req.json();

    if (!userId) {
      return new Response(JSON.stringify({ error: 'User ID is required' }), { status: 400 });
    }

    if (!supabaseAdmin) {
      return new Response(JSON.stringify({ error: 'Server configuration error' }), { status: 500 });
    }

    const { error } = await supabaseAdmin
      .from('profiles')
      .update({
        last_seen_at: new Date().toISOString(),
        extension_version: version,
        browser_info: browserInfo,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    if (error) throw error;

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    console.error('Sync Error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
