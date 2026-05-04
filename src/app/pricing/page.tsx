"use client";

import { useState } from "react";
import Script from "next/script";
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import { CheckCircle, Lock, Sparkles, ArrowLeft, Zap, Star } from "lucide-react";
import Link from "next/link";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PLANS = [
  { months: 1, price: 199, label: "1 Month", perMonth: 199, badge: null, highlight: false },
  { months: 6, price: 1099, label: "6 Months", perMonth: Math.round(1099 / 6), badge: "Popular", highlight: true, savings: "Save ₹95" },
  { months: 12, price: 2099, label: "12 Months", perMonth: Math.round(2099 / 12), badge: "Best Value", highlight: false, savings: "Save ₹289" },
];

export default function PricingPage() {
  const [loading, setLoading] = useState<number | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubscription = async (price: number, months: number) => {
    setLoading(months);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login?redirect=/pricing');
        setLoading(null);
        return;
      }
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: price,
          currency: "INR",
          userId: user.id,
          months: months
        }),
      });
      const order = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "EasyView Pro",
        description: "Unlock premium fonts & accessibility tools",
        order_id: order.id,
        handler: async function (response: any) {
          const { data: { user } } = await supabase.auth.getUser();
          const verifyRes = await fetch("/api/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId: user?.id || null,
              amount: price,
              months: months
            }),
          });

          const result = await verifyRes.json();

          if (verifyRes.ok && result.status === "premium") {
            setSuccess(true);
            window.postMessage({
              type: "EASYVIEW_PAYMENT_SUCCESS",
              isPremium: true,
              expiresAt: result.expiresAt,
              email: result.email
            }, "*");

            setTimeout(() => {
              router.push('/dashboard');
            }, 2500);
          } else {
            setLoading(null);
            alert("Verification failed: " + (result.error || "Unknown error"));
          }
        },
        prefill: {
          name: (user?.user_metadata?.full_name) || user?.email?.split('@')[0] || 'User',
          email: user?.email || undefined,
        },
        theme: { color: "#8b5cf6" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed to initialize");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-slate-950 overflow-hidden p-6 font-sans text-white">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      {/* Background Decor */}
      <motion.div
        className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="max-w-5xl mx-auto relative z-10 w-full">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">Back to Dashboard</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full p-1 rounded-[40px] bg-gradient-to-br from-purple-500/20 via-transparent to-indigo-500/20"
        >
          <div className="relative w-full p-8 md:p-12 rounded-[38px] backdrop-blur-3xl bg-slate-900/60 border border-white/10 shadow-2xl overflow-hidden">
            {success && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-8"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(16,185,129,0.4)]">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-3xl font-black mb-2 tracking-tighter">Payment Successful!</h2>
                <p className="text-slate-400 mb-8 max-w-sm">Your premium features are being unlocked. Redirecting you to your Command Center...</p>
                <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '0%' }}
                    transition={{ duration: 2.5, ease: "linear" }}
                    className="w-full h-full bg-emerald-500"
                  />
                </div>
              </motion.div>
            )}

            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-3 mb-5 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">Choose Your Plan</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tighter bg-gradient-to-r from-white via-purple-200 to-slate-400 bg-clip-text text-transparent">
                EasyView Pro
              </h1>
              <p className="text-slate-400 font-medium leading-relaxed max-w-xl mx-auto">
                Unlock the full potential of your reading experience with advanced neural tools and premium typography.
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-3 gap-5 mb-8">
              {PLANS.map((plan, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className={`relative rounded-[28px] p-[1px] ${plan.highlight
                    ? "bg-gradient-to-b from-purple-500 via-indigo-500 to-transparent"
                    : "bg-gradient-to-b from-white/20 to-white/5"
                    }`}
                >
                  {plan.badge && (
                    <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest z-20 ${plan.highlight
                      ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-[0_4px_15px_rgba(139,92,246,0.5)]"
                      : "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-[0_4px_15px_rgba(245,158,11,0.4)]"
                      }`}>
                      {plan.badge === "Popular" ? <span className="flex items-center gap-1"><Zap className="w-3 h-3" />{plan.badge}</span> : <span className="flex items-center gap-1"><Star className="w-3 h-3" />{plan.badge}</span>}
                    </div>
                  )}

                  <div className={`relative rounded-[27px] p-7 h-full flex flex-col overflow-hidden ${plan.highlight
                    ? "bg-gradient-to-b from-purple-950/80 to-slate-900/90"
                    : "bg-slate-900/80"
                    }`}>
                    {/* Inner glow for highlighted */}
                    {plan.highlight && (
                      <div className="absolute inset-0 bg-purple-500/5 rounded-[27px]" />
                    )}

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="mb-6">
                        <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">{plan.label}</div>
                        <div className={`text-5xl font-black tracking-tighter mb-1 ${plan.highlight ? "text-white" : "text-slate-200"
                          }`}>
                          ₹{plan.price}
                        </div>
                        <div className="text-xs text-slate-500 font-bold">
                          ₹{plan.perMonth}/mo
                          {plan.savings && (
                            <span className="ml-2 text-emerald-400">{plan.savings}</span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3 mb-8 flex-1">
                        {[
                          "Lexend & Atkinson Pro Fonts",
                          "Sensory Shield Pro (Stop Auto-Play)",
                          "Sensory Shield Pro (Calm Fades)",
                          "Unlimited Jargon Decoding",
                          "Priority Neural Sync",
                        ].map((feat, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className={`p-0.5 rounded-md ${plan.highlight ? "bg-purple-500/20" : "bg-white/5"
                              }`}>
                              <CheckCircle className={`w-3.5 h-3.5 ${plan.highlight ? "text-purple-300" : "text-emerald-400"
                                }`} />
                            </div>
                            <span className="text-xs text-slate-400 font-medium">{feat}</span>
                          </div>
                        ))}
                        <div className="flex items-center gap-3 pt-2">
                          <div className="p-0.5 rounded-md bg-amber-500/10">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          </div>
                          <span className="text-[10px] text-amber-500/80 font-black uppercase tracking-widest">More Neural Tools Coming Soon</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleSubscription(plan.price, plan.months)}
                        disabled={loading !== null}
                        className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all active:scale-95 disabled:opacity-60 ${plan.highlight
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-[0_10px_30px_rgba(139,92,246,0.4)]"
                          : "bg-white/10 hover:bg-white/15 text-white border border-white/10"
                          }`}
                      >
                        {loading === plan.months ? "Processing…" : "Upgrade to Pro"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Benefits Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-white/5">
              {[
                { text: "Lexend & Atkinson Hyperlegible Pro", icon: CheckCircle, color: "text-emerald-400" },
                { text: "Sensory Shield: No More Distractions", icon: CheckCircle, color: "text-emerald-400" },
                { text: "Bionic Reading & Neural Focus", icon: CheckCircle, color: "text-emerald-400" },
                { text: "Priority Updates & Early Access", icon: Lock, color: "text-amber-400" },
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                  <benefit.icon className={`w-5 h-5 ${benefit.color} group-hover:scale-110 transition-transform`} />
                  <span className="text-xs text-slate-300 font-bold leading-tight">{benefit.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 text-[10px] text-slate-600 text-center font-bold">
              Secure checkout powered by Razorpay · Access synced across all your devices.
            </div>

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[40%] bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
