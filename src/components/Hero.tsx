'use client';

import { motion } from 'framer-motion';
import { Chrome, ChevronDown, Eye } from 'lucide-react';
import AuthStatus from './AuthStatus';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [showAfter, setShowAfter] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setShowAfter(p => !p), 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-6 pt-20 pb-24 overflow-hidden bg-slate-950">
      <div className="absolute top-6 right-6 z-50"><AuthStatus /></div>

      {/* Ambient orbs — CSS-only, no JS animation overhead */}
      <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[140px] -translate-x-1/3 -translate-y-1/3 will-change-transform" style={{ animation: 'pulse 10s ease-in-out infinite' }} />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-500/8 rounded-full blur-[130px] translate-x-1/3 translate-y-1/3" style={{ animation: 'pulse 13s 2s ease-in-out infinite' }} />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 xl:gap-20 items-center relative z-10">
        {/* ── Left: copy ── */}
        <div>
          {/* Brand badge — single unified pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
          >
            <img src="/logo.png" alt="EasyView" className="w-5 h-5 object-contain" />
            <span className="text-sm font-bold text-white">EasyView</span>
            <span className="text-white/20 text-xs">·</span>
            <span className="text-sm text-slate-400">Clarity for Every Brain</span>
          </motion.div>

          {/* Emotional headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl xl:text-7xl font-black leading-[1.08] tracking-tighter mb-6 text-white"
          >
            Not every mind<br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-orange-400 bg-clip-text text-transparent">
              experiences the web
            </span><br />
            the same way.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
            className="text-base md:text-lg text-slate-400 mb-4 max-w-lg leading-relaxed"
          >
            For millions with dyslexia, ADHD, and sensory sensitivities, reading online can feel overwhelming.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
            className="text-base md:text-lg text-slate-200 font-semibold mb-10 max-w-lg leading-relaxed"
          >
            EasyView transforms the web into a{' '}
            <span className="text-blue-400">clear</span>,{' '}
            <span className="text-cyan-400">calm</span>, and{' '}
            <span className="text-orange-400">readable</span> experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-8"
          >
            <motion.a
              href="https://chromewebstore.google.com/detail/easyview/fkmaolnondclckcdeeanjophpnhndgkk"
              target="_blank" rel="noopener noreferrer"
              className="relative flex items-center gap-3 px-7 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-base rounded-2xl shadow-xl hover:shadow-blue-500/30 overflow-hidden transition-all"
              whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                initial={{ x: '-100%' }} whileHover={{ x: '200%' }}
                transition={{ duration: 0.5 }}
              />
              <Chrome className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Add to Chrome – It&apos;s Free</span>
            </motion.a>
            <motion.a
              href="#solution"
              className="flex items-center gap-2 text-slate-400 hover:text-white font-semibold text-sm transition-colors"
              whileHover={{ x: 4 }}
            >
              See How It Works
              <ChevronDown className="w-4 h-4" />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="flex flex-wrap gap-2.5"
          >
            {['🔒 Privacy-First', '🌐 Any Website', '⚡ No Data Tracking', '🆓 Always Free'].map((b, i) => (
              <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400 font-medium">
                {b}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── Right: Before/After browser mockup ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
        >
          <BeforeAfterVisual showAfter={showAfter} setShowAfter={setShowAfter} />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-slate-700 rounded-full flex items-start justify-center p-1.5">
          <motion.div className="w-1.5 h-1.5 bg-slate-500 rounded-full" animate={{ y: [0, 14, 0] }} transition={{ duration: 2, repeat: Infinity }} />
        </div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Before / After — same article, two worlds
───────────────────────────────────────────── */

function BeforeAfterVisual({ showAfter, setShowAfter }: { showAfter: boolean; setShowAfter: (v: boolean) => void }) {
  return (
    <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900">
      {/* Browser chrome */}
      <div className="bg-slate-800/90 px-4 py-3 flex items-center gap-2 border-b border-white/5">
        <span className="w-3 h-3 rounded-full bg-red-400/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
        <span className="w-3 h-3 rounded-full bg-green-400/70" />
        <div className="flex-1 mx-3 bg-slate-700/80 rounded-full px-3 py-1 text-[11px] text-slate-400 truncate">
          health.example.com/understanding-your-diagnosis
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-500/20 rounded-lg border border-blue-500/30 shrink-0">
          <Eye className="w-3 h-3 text-blue-400" />
          <span className="text-[11px] text-blue-400 font-bold">EasyView</span>
        </div>
      </div>

      {/* Toggle pills */}
      <div className="absolute top-[52px] left-1/2 -translate-x-1/2 z-20 flex bg-slate-900/95 backdrop-blur-sm rounded-full border border-white/10 p-1 gap-1 shadow-lg">
        <button
          onClick={() => setShowAfter(false)}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${!showAfter ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'text-slate-500 hover:text-slate-400'}`}
        >
          Before
        </button>
        <button
          onClick={() => setShowAfter(true)}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${showAfter ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'text-slate-500 hover:text-slate-400'}`}
        >
          After
        </button>
      </div>

      {/* Page content — same article, two renderings */}
      <div className="relative h-[340px] overflow-hidden">
        {/* Opacity-only crossfade — filter:blur in animate() is very expensive */}
        <motion.div
          animate={{ opacity: showAfter ? 0 : 1 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <BeforePage />
        </motion.div>
        <motion.div
          animate={{ opacity: showAfter ? 1 : 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <AfterPage />
        </motion.div>
      </div>

      {/* Bottom label */}
      <div className="bg-slate-900 px-4 py-3 flex items-center justify-center border-t border-white/5">
        <motion.div
          key={showAfter ? 'after-label' : 'before-label'}
          initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
          className={`flex items-center gap-2 text-xs font-bold px-4 py-1.5 rounded-full border ${showAfter ? 'bg-blue-500/15 text-blue-300 border-blue-500/25' : 'bg-red-500/15 text-red-300 border-red-500/25'}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${showAfter ? 'bg-blue-400' : 'bg-red-400'} animate-pulse`} />
          {showAfter ? '✨ With EasyView — Clear & Accessible' : '⚠️ Without EasyView — Hard to Read'}
        </motion.div>
      </div>
    </div>
  );
}

/* ── The SAME article, rendered without accessibility tools ── */
function BeforePage() {
  return (
    <div className="bg-white h-full overflow-hidden text-black relative">
      {/* Cookie/subscribe overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gray-900 text-white text-[7px] p-2 flex items-center justify-between border-t border-gray-600">
        <span>🍪 We use cookies to improve your experience. <span className="underline text-blue-400">Learn more</span></span>
        <button className="bg-blue-600 text-white px-2 py-0.5 rounded text-[7px] font-bold shrink-0">Accept All</button>
      </div>

      {/* Page layout: article + sidebar */}
      <div className="flex gap-0 h-full">
        {/* Main article column */}
        <div className="flex-1 p-3 overflow-hidden">
          {/* Nav */}
          <div className="flex gap-3 text-[7px] text-blue-700 underline border-b border-gray-200 pb-1 mb-2">
            <span>Home</span><span>Health</span><span>Mental Wellbeing</span><span>Conditions</span><span>Contact</span>
          </div>

          {/* Article */}
          <p className="text-[6px] text-gray-500 mb-0.5">HEALTH GUIDE · 12 MIN READ · REVIEWED BY DR. A. SHARMA</p>
          <h2 className="text-[9px] font-bold text-black leading-tight mb-1" style={{ fontFamily: 'Georgia, serif' }}>
            Understanding Your Diagnosis: A Complete Overview of Neurodevelopmental Conditions
          </h2>
          <p className="text-[6px] text-gray-400 mb-1">By Editorial Team | Updated March 2024</p>

          {/* Inline banner */}
          <div className="bg-yellow-100 border border-yellow-500 text-[6px] px-1.5 py-1 mb-1.5 text-yellow-900 font-bold animate-pulse">
            📣 SUBSCRIBE to get full access — Limited free articles remaining (1 of 5 used)
          </div>

          {/* Body text — dense, hard to read */}
          <p className="text-[7px] leading-tight text-gray-700 mb-1" style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.2px' }}>
            Neurodevelopmental conditions including attention-deficit/hyperactivity disorder (ADHD), dyslexia, dyspraxia, autism spectrum disorder (ASD), and related comorbidities manifest across a complex, heterogeneous spectrum of cognitive, attentional, and perceptual processing differences that significantly impact an individual&apos;s daily functioning, academic performance, occupational success, and quality of life.
          </p>
          <p className="text-[6px] leading-tight text-gray-600" style={{ fontFamily: 'Georgia, serif' }}>
            The etiology of these conditions is multifactorial, encompassing genetic predispositions, neurobiological differences, and environmental influences during critical developmental windows, necessitating a comprehensive, multidisciplinary approach to assessment, diagnosis, and intervention planning.
          </p>
        </div>

        {/* Sidebar */}
        <div className="w-24 bg-gray-50 border-l border-gray-200 p-2 shrink-0 overflow-hidden">
          <div className="bg-blue-600 text-white text-[6px] p-1.5 text-center font-black mb-2 rounded-sm">
            ADVERTISEMENT
          </div>
          <div className="bg-red-500 text-white text-[6px] p-1 mb-1.5 font-bold animate-bounce text-center">
            🔥 DEAL!<br />Save 70%!
          </div>
          <div className="text-[6px] text-gray-600 font-bold mb-1 uppercase">Related Articles</div>
          {['ADHD in Adults: Signs You Missed', 'Top 10 Focus Supplements', 'Is Your Child Dyslexic?'].map((t, i) => (
            <p key={i} className="text-[6px] text-blue-600 underline mb-0.5 leading-tight">{t}</p>
          ))}
          <div className="bg-green-400 text-black text-[6px] p-1 mt-2 font-black text-center rounded-sm">
            TAKE OUR QUIZ →
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── The SAME article, now transformed by EasyView ── */
function AfterPage() {
  return (
    <div className="bg-slate-950 h-full overflow-hidden p-5">
      {/* EasyView reader toolbar */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/8">
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-500/15 border border-blue-500/25 rounded-lg">
          <Eye className="w-3 h-3 text-blue-400" />
          <span className="text-[10px] text-blue-300 font-bold">Reader Mode</span>
        </div>
        <div className="flex gap-1.5 ml-auto">
          <div className="px-2 py-1 bg-white/5 rounded-lg text-[9px] text-slate-400 font-medium border border-white/8">🔊 Listen</div>
          <div className="px-2 py-1 bg-white/5 rounded-lg text-[9px] text-slate-400 font-medium border border-white/8">Aa 1.3×</div>
          <div className="px-2 py-1 bg-white/5 rounded-lg text-[9px] text-slate-400 font-medium border border-white/8">🛡️ Calm</div>
        </div>
      </div>

      {/* Clean article */}
      <div className="max-w-full">
        <p className="text-[9px] text-blue-400 font-semibold mb-2 tracking-wide uppercase">Health Guide</p>
        <h2
          className="text-sm font-bold text-white leading-relaxed mb-3"
          style={{ letterSpacing: '0.03em', lineHeight: '1.6' }}
        >
          Understanding Your Diagnosis
        </h2>

        {/* Reading progress bar */}
        <div className="h-0.5 bg-slate-800 rounded-full mb-4 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '35%' }}
            transition={{ duration: 2, ease: 'easeOut', delay: 0.5 }}
          />
        </div>

        {/* Body — same content, but readable */}
        <p
          className="text-[10px] text-slate-300 leading-loose mb-3"
          style={{ letterSpacing: '0.04em', lineHeight: '2.0', wordSpacing: '0.08em' }}
        >
          <motion.span
            className="bg-blue-500/15 text-blue-200 rounded px-0.5"
            animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }}
          >
            Neurodevelopmental conditions
          </motion.span>
          {' '}including ADHD, dyslexia, and autism affect how the brain processes information — and that affects how we read online.
        </p>
        <p
          className="text-[9px] text-slate-500 leading-loose"
          style={{ letterSpacing: '0.04em', lineHeight: '2.0' }}
        >
          These conditions have genetic, neurological, and environmental roots. A good diagnosis looks at the full picture.
        </p>

        {/* Jargon decoded badge */}
        <div className="mt-3 flex items-center gap-2 px-2.5 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-xl w-fit">
          <span className="text-[9px] text-purple-300 font-semibold">🧠 Jargon decoded by EasyView AI</span>
        </div>
      </div>
    </div>
  );
}
