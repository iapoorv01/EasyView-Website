import crypto from 'crypto';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-razorpay-signature');
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!secret) {
      console.error("RAZORPAY_WEBHOOK_SECRET is not configured");
      return new Response(JSON.stringify({ error: "Webhook secret not configured" }), { status: 500 });
    }

    // 1. Verify the signature
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      return new Response(JSON.stringify({ error: "Invalid signature" }), { status: 400 });
    }

    const payload = JSON.parse(body);
    const event = payload.event;

    // 2. Handle the 'payment.captured' event
    if (event === 'payment.captured') {
      const payment = payload.payload.payment.entity;
      const { userId, months } = payment.notes;
      const razorpay_order_id = payment.order_id;
      const razorpay_payment_id = payment.id;

      if (!userId) {
        return new Response(JSON.stringify({ message: "No userId in notes, ignoring" }), { status: 200 });
      }

      if (!supabaseAdmin) {
        throw new Error("Supabase Admin key not configured");
      }

      // 3. Idempotency Check: See if this payment is already recorded
      const { data: existingPayment } = await supabaseAdmin
        .from('payments')
        .select('id')
        .eq('payment_id', razorpay_payment_id)
        .single();

      if (existingPayment) {
        return new Response(JSON.stringify({ message: "Payment already processed" }), { status: 200 });
      }

      // 4. Record the Payment in the Audit Table
      const { error: paymentError } = await supabaseAdmin
        .from('payments')
        .insert({
          user_id: userId,
          order_id: razorpay_order_id,
          payment_id: razorpay_payment_id,
          status: 'captured',
          amount: payment.amount / 100, // Razorpay amount is in paise
          currency: payment.currency
        });

      if (paymentError) console.error("Error logging payment in webhook:", paymentError);

      const expiresAt = new Date();
      expiresAt.setMonth(expiresAt.getMonth() + (Number(months) || 1));

      // 5. Update User Profile using Admin client to bypass RLS
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

      return new Response(JSON.stringify({ message: "Webhook processed successfully" }), { status: 200 });
    }

    return new Response(JSON.stringify({ message: "Event ignored" }), { status: 200 });
  } catch (error: any) {
    console.error("Webhook Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
