'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import ProblemStatement from './components/ProblemStatement';
import Features from './components/Features';
import ProductOverview from './components/ProductOverview';
import InteractiveDemo from './components/InteractiveDemo';
import ImpactStats from './components/ImpactStats';
import HowItWorks from './components/HowItWorks';
import TechDetails from './components/TechDetails';
import CTA from './components/CTA';
import Footer from './components/Footer';
import FloatingParticles from './components/FloatingParticles';
import MouseFollower from './components/MouseFollower';

export default function Home() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <motion.div
      className="min-h-screen relative overflow-hidden bg-slate-950 text-slate-50 transition-colors duration-300"
    >
      {!reducedMotion && <FloatingParticles />}
      {!reducedMotion && <MouseFollower />}
      
      <div className="relative z-10">
        <Hero />
        <ProblemStatement />
        <ProductOverview />
        <Features />
        <InteractiveDemo />
        <ImpactStats />
        <HowItWorks />
        <TechDetails />
        <CTA />
        <Footer />
      </div>

      {/* Reduced Motion Toggle */}
      <button
        onClick={() => setReducedMotion(!reducedMotion)}
        className="fixed bottom-6 left-6 z-50 px-4 py-2 backdrop-blur-lg rounded-full shadow-lg text-sm font-medium transition-all bg-slate-800/80 text-slate-100 hover:bg-slate-700"
        aria-label="Toggle animations"
      >
        {reducedMotion ? '🎬 Enable Animations' : '🎬 Reduce Motion'}
      </button>
    </motion.div>
  );
}
