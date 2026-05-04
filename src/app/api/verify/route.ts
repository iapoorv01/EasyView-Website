import crypto from 'crypto';

/**
 * api/verify - Browser-side verification
 * This route now ONLY verifies the cryptographic signature from Razorpay.
 * It NO LONGER updates the database. Database updates are handled 100% 
 * by the Razorpay Webhook for maximum reliability.
 */
export async function POST(req: Request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = await req.json();

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      return new Response(JSON.stringify({
        message: "Payment signature valid. Webhook will process the account upgrade shortly.",
        status: 'verifying'
      }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: "Invalid signature" }), { status: 400 });
    }
  } catch (error: any) {
    console.error("Verification Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
