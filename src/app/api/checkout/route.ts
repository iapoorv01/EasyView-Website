import Razorpay from 'razorpay';
import crypto from 'crypto';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const { amount, currency, userId, months } = await req.json();

    const options = {
      amount: amount * 100, // amount in smallest currency unit
      currency,
      receipt: `receipt_${Date.now()}`,
      notes: {
        userId,
        months
      }
    };

    const order = await razorpay.orders.create(options);

    return new Response(JSON.stringify(order), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
