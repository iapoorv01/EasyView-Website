import crypto from 'crypto';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      months = 1
    } = await req.json();

    if (!supabaseAdmin) {
      throw new Error("Supabase Admin key not configured");
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      let profile: any = null;

      if (userId) {
        // 1. Record the Payment in the Audit Table
        const { error: paymentError } = await supabaseAdmin
          .from('payments')
          .insert({
            user_id: userId,
            order_id: razorpay_order_id,
            payment_id: razorpay_payment_id,
            status: 'captured', // Signature match implies success at this stage
            amount: months * 99, // Storing in Rupees as requested
            currency: 'INR'
          });

        if (paymentError) console.error("Error logging payment:", paymentError);

        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + months);

        // 2. Update User Profile using Admin client to bypass RLS
        const { error: updateError } = await supabaseAdmin
          .from('profiles')
          .update({
            is_premium: true,
            premium_since: new Date().toISOString(),
            premium_expires_at: expiresAt.toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('id', userId);

        if (updateError) throw updateError;

        // Fetch updated profile
        const { data, error: fetchError } = await supabaseAdmin
          .from('profiles')
          .select('premium_expires_at, email')
          .eq('id', userId)
          .single();

        if (fetchError) throw fetchError;
        profile = data;
      }

      return new Response(JSON.stringify({
        message: "Payment verified, logged, and profile updated",
        status: 'premium',
        expiresAt: profile?.premium_expires_at || null,
        email: profile?.email || null
      }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: "Invalid signature" }), { status: 400 });
    }
  } catch (error: any) {
    console.error("Verification Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
