'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock, Github, Chrome, LogIn, UserPlus } from 'lucide-react';

function LoginContent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/dashboard');
      }
    };
    checkSession();
  }, [router]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        alert(error.message);
      } else if (data?.user) {
        window.postMessage({
          type: "EASYVIEW_AUTH",
          userId: data.user.id,
          email: data.user.email
        }, "*");
        try {
          const redirect = searchParams?.get('redirect');
          if (redirect) {
            router.push(redirect);
          } else {
            router.push('/dashboard');
          }
        } catch (e) {
          router.push('/dashboard');
        }
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) alert("Check your email for confirmation!");
      else alert("Signup successful!");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-slate-950 overflow-hidden p-6 font-sans text-white">
      {/* Dynamic Background Orbs */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-[440px] z-10"
      >
        <div className="bg-slate-900/40 backdrop-blur-3xl rounded-[40px] p-8 md:p-10 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="text-center mb-10">
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/5 border border-white/10 shadow-2xl mb-6 p-4"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <img src="/logo.png" alt="EasyView logo" className="w-full h-full object-contain" />
            </motion.div>

            <h2 className="text-4xl font-black tracking-tighter mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
              EasyView
            </h2>
            <p className="text-slate-400 text-sm font-medium">Simplify your reading experience</p>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-black/30 p-1 rounded-2xl mb-8 border border-white/5">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 text-xs font-black uppercase tracking-widest transition-all rounded-xl flex items-center justify-center gap-2 ${isLogin ? "bg-white/10 text-white shadow-lg" : "text-slate-500 hover:text-slate-300"
                }`}
            >
              <LogIn className="w-3.5 h-3.5" /> Login
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 text-xs font-black uppercase tracking-widest transition-all rounded-xl flex items-center justify-center gap-2 ${!isLogin ? "bg-white/10 text-white shadow-lg" : "text-slate-500 hover:text-slate-300"
                }`}
            >
              <UserPlus className="w-3.5 h-3.5" /> Signup
            </button>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-4">Email Address</label>
              <div className="relative group">
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-white/5 rounded-2xl border border-white/5 outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-white placeholder:text-slate-600"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-4">Password</label>
              <div className="relative group">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-white/5 rounded-2xl border border-white/5 outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-white placeholder:text-slate-600"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-purple-600 to-indigo-600 py-4 rounded-2xl shadow-xl hover:shadow-purple-500/20 transition-all flex items-center justify-center gap-3 group"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-black tracking-widest uppercase text-xs text-white">
                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
              </span>
              <Sparkles className="w-4 h-4 text-white group-hover:animate-pulse" />
            </motion.button>
          </form>

          <div className="flex items-center gap-4 my-8">
            <div className="h-[1px] flex-1 bg-white/5" />
            <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">or continue with</span>
            <div className="h-[1px] flex-1 bg-white/5" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button type="button" className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all">
              <Chrome className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-wider">Chrome</span>
            </button>
            <button type="button" className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all">
              <Github className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-wider">GitHub</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
