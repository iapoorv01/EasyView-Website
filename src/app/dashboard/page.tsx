"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  User,
  Crown,
  Settings,
  LogOut,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  Zap,
  Sparkles,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function getProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);

      // Broadcast to content.js so extension always has userId stored
      // This handles already-logged-in users and fresh logins equally
      window.postMessage({
        type: 'EASYVIEW_AUTH',
        userId: user.id,
        email: user.email,
        isPremium: profile?.is_premium
      }, '*');

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (data) {
        setProfile(data);
        if (!data.onboarding_sent) {
          triggerOnboarding(user);
        }
      } else if (!data && !error) {
        console.log('New user detected, triggering onboarding and creating profile with 1-day trial...');
        triggerOnboarding(user);
        const trialExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
        await supabase.from('profiles').insert([
          {
            id: user.id,
            email: user.email,
            onboarding_sent: true,
            is_premium: true,
            premium_expires_at: trialExpiry,
            premium_since: new Date().toISOString()
          }
        ]);
        // Refresh profile state to show trial
        const { data: newProfile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        if (newProfile) setProfile(newProfile);
      }
      setLoading(false);
    }

    async function triggerOnboarding(user: any) {
      try {
        await fetch('/api/onboarding', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: user.email,
            name: user.email?.split('@')[0],
            userId: user.id
          })
        });
      } catch (err) {
        console.error('Failed to send onboarding email:', err);
      }
    }

    getProfile();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f1d] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const timeRemaining = profile?.premium_expires_at
    ? new Date(profile.premium_expires_at).getTime() - new Date().getTime()
    : 0;

  const remainingDays = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));
  const remainingHours = Math.ceil(timeRemaining / (1000 * 60 * 60));

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-white p-6 md:p-12 font-sans relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Trial/Expiry Notice */}
        {profile?.is_premium && timeRemaining > 0 && timeRemaining <= 24 * 60 * 60 * 1000 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-2xl flex items-center gap-4 shadow-lg backdrop-blur-md"
          >
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              {profile.premium_since && (new Date().getTime() - new Date(profile.premium_since).getTime() < 24 * 60 * 60 * 1000) ? (
                <>
                  <h4 className="text-sm font-black text-purple-200 uppercase tracking-widest">Free Trial Activated!</h4>
                  <p className="text-xs text-slate-300">Welcome to EasyView Pro. You have {remainingHours} hours left of 24 for unlimited access to all premium features.</p>
                </>
              ) : (
                <>
                  <h4 className="text-sm font-black text-purple-200 uppercase tracking-widest">Subscription Ending Soon</h4>
                  <p className="text-xs text-slate-300">You have {remainingHours} hours of premium access remaining. {remainingHours <= 12 ? 'Renew now to maintain your neural enhancements!' : ''}</p>
                </>
              )}
            </div>
          </motion.div>
        )}

        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex items-center gap-5">
            <motion.div
              className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-3 shadow-2xl"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <img src="/logo.png" alt="EasyView logo" className="w-full h-full object-contain" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-black tracking-tighter mb-1 bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent">
                Command Center
              </h1>
              <p className="text-slate-400 text-sm font-medium">Welcome back, <span className="text-white font-bold">{user.email?.split('@')[0]}</span></p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/">
              <button className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-bold hover:bg-white/10 transition-all flex items-center gap-2">
                <ExternalLink className="w-4 h-4" /> Visit Extension
              </button>
            </Link>
            <button onClick={handleLogout} className="px-5 py-2.5 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm font-bold hover:bg-red-500/20 transition-all flex items-center gap-2">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-blue-600 flex items-center justify-center text-3xl font-black shadow-2xl border border-white/10">
                    {user.email?.[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-2xl font-bold">{user.email}</h2>
                      {profile?.is_premium && (
                        <span className="bg-amber-400 text-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">Pro</span>
                      )}
                    </div>
                    <p className="text-slate-500 text-sm flex items-center gap-2 italic">
                      <ShieldCheck className="w-4 h-4" /> Secure Neural Session Active
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
                <div className="bg-black/20 rounded-2xl p-5 border border-white/5">
                  <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Subscription Status</h3>
                  {profile?.is_premium && timeRemaining > 0 ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-emerald-400 font-bold">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Premium Active</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-400 text-sm">
                        <Calendar className="w-5 h-5" />
                        <span>
                          {remainingDays > 1
                            ? `Expires in ${remainingDays} days`
                            : `Expires in ${remainingHours} hours`}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-slate-400 font-bold">
                        <User className="w-5 h-5" />
                        <span>Free Tier Plan</span>
                      </div>
                      <Link href="/pricing" className="block">
                        <button className="w-full bg-white/10 hover:bg-white/20 py-2.5 rounded-xl text-xs font-black transition-all">Upgrade Now</button>
                      </Link>
                    </div>
                  )}
                </div>

                <div className="bg-black/20 rounded-2xl p-5 border border-white/5">
                  <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Extension Sync</h3>
                  <div className="flex items-center gap-3 text-blue-400 font-bold">
                    <Zap className="w-5 h-5" />
                    <span>Cloud Link Enabled</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                    Settings and Premium access are automatically synced with your Chrome Extension profile.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Access Section */}
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl">
              <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Your Neural Toolkit</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Jargon Decoder', status: 'Available', premium: false },
                  { title: 'Sensory Shield Pro', status: profile?.is_premium ? 'Unlocked' : 'Locked', premium: true },
                  { title: 'ADHD Pro Fonts', status: profile?.is_premium ? 'Unlocked' : 'Locked', premium: true },
                  { title: 'Bionic Reading', status: 'Available', premium: false },
                  { title: 'Hyperlegible Mode', status: profile?.is_premium ? 'Unlocked' : 'Locked', premium: true },
                  { title: 'Focus Spotlight', status: 'Available', premium: false },
                ].map((item, id) => (
                  <div key={id} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all">
                    <span className="font-bold text-slate-300">{item.title}</span>
                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${item.status === 'Unlocked' || item.status === 'Available'
                      ? 'bg-emerald-500/10 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                      : 'bg-red-500/10 text-red-500'
                      }`}>{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar / CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {!profile?.is_premium && (
              <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-[32px] p-8 shadow-2xl relative overflow-hidden group border border-white/20">
                <Crown className="absolute -top-4 -right-4 w-32 h-32 text-white/10 rotate-12 group-hover:rotate-0 transition-all duration-500" />
                <h2 className="text-2xl font-black mb-4 relative z-10">Go Unlimited</h2>
                <p className="text-purple-100/80 text-sm mb-8 leading-relaxed relative z-10">
                  Unlock Lexend (ADHD Pro), Atkinson Hyperlegible, and advanced neural formatting for a lifetime of clarity.
                </p>
                <Link href="/pricing">
                  <button className="w-full bg-white text-indigo-700 py-4 rounded-2xl font-black shadow-lg hover:shadow-white/20 transition-all flex items-center justify-center gap-2 group/btn relative z-10">
                    Upgrade to Pro <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            )}

            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[32px] p-8">
              <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-6">Quick Links</h3>
              <div className="space-y-4">
                <Link href="/documentation" className="flex items-center justify-between text-slate-400 hover:text-white transition-colors group">
                  <span className="font-medium text-sm">How to use</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
                <Link href="/privacy-policy" className="flex items-center justify-between text-slate-400 hover:text-white transition-colors group">
                  <span className="font-medium text-sm">Privacy Compliance</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
              </div>
            </div>

            {/* Coming Soon Section */}
            <div className="bg-gradient-to-br from-slate-900 to-black border border-white/5 rounded-[32px] p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <Sparkles className="w-5 h-5 text-amber-500/30" />
              </div>
              <h3 className="text-sm font-black text-amber-500 uppercase tracking-widest mb-6">Roadmap</h3>
              <div className="space-y-6">
                {[
                  { title: 'Neural Heatmaps', desc: 'Visualize your attention peaks' },
                  { title: 'Smart Page Summaries', desc: 'AI-driven rapid comprehension' },
                  { title: 'Voice-to-Focus', desc: 'Auditory reading assistance' },
                ].map((roadmap, i) => (
                  <div key={i} className="relative pl-6 before:absolute before:left-0 before:top-1 before:w-2 before:h-2 before:bg-white/10 before:rounded-full">
                    <h4 className="text-xs font-bold text-white mb-1">{roadmap.title}</h4>
                    <p className="text-[10px] text-slate-500 font-medium">{roadmap.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-white/5 text-center">
                <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">Always Evolving</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
