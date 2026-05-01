'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import ProblemStatement from './components/ProblemStatement';
import SolutionSection from './components/SolutionSection';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import PremiumSection from './components/PremiumSection';
import ImpactStats from './components/ImpactStats';
import CTA from './components/CTA';
import Footer from './components/Footer';
import FloatingParticles from './components/FloatingParticles';
import MouseFollower from './components/MouseFollower';

export default function Home() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <motion.div className="min-h-screen relative overflow-hidden bg-slate-950 text-slate-50">
      {!reducedMotion && <FloatingParticles />}
      {!reducedMotion && <MouseFollower />}

      <div className="relative z-10">
        {/* 1. Emotional entry */}
        <Hero />
        {/* 2. The pain */}
        <ProblemStatement />
        {/* 3. The transformation */}
        <SolutionSection />
        {/* 4. Feature depth */}
        <Features />
        {/* 5. Simple onboarding */}
        <HowItWorks />
        {/* 6. Premium differentiation */}
        <PremiumSection />
        {/* 7. Trust & social proof */}
        <ImpactStats />
        {/* 8. Emotional close */}
        <CTA />
        <Footer />
      </div>

      {/* Reduced Motion toggle */}
      <button
        onClick={() => setReducedMotion(!reducedMotion)}
        className="fixed bottom-6 left-6 z-50 px-4 py-2 backdrop-blur-lg rounded-full shadow-lg text-xs font-medium transition-all bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-white/10"
        aria-label="Toggle animations"
      >
        {reducedMotion ? '🎬 Enable Animations' : '🎬 Reduce Motion'}
      </button>
    </motion.div>
  );
}
