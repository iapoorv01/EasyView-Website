'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { LayoutDashboard, LogIn, User } from 'lucide-react';

export default function AuthStatus() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <div className="w-24 h-8 bg-white/5 animate-pulse rounded-full" />;

  if (user) {
    return (
      <Link href="/dashboard">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all backdrop-blur-sm shadow-xl shadow-indigo-500/10"
        >
          <LayoutDashboard className="w-4 h-4 text-indigo-400" />
          <span className="font-medium text-sm">Dashboard</span>
        </motion.button>
      </Link>
    );
  }

  return (
    <Link href="/login">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-xl shadow-indigo-500/20 border border-indigo-400/30"
      >
        <LogIn className="w-4 h-4" />
        <span className="font-medium text-sm">Sign In</span>
      </motion.button>
    </Link>
  );
}
