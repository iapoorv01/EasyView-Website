'use client';

import { motion } from 'framer-motion';

const problems = [
  {
    emoji: '🔤',
    condition: 'Dyslexia',
    headline: 'Letters blur, move, or become hard to track.',
    detail: 'Text feels unstable. Words swim on the page. Reading a single paragraph can take enormous mental effort.',
    color: 'from-violet-500/20 to-purple-500/10',
    border: 'border-violet-500/25',
    badge: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
    visual: <DyslexiaVisual />,
  },
  {
    emoji: '⚡',
    condition: 'ADHD',
    headline: 'Distractions break focus every few seconds.',
    detail: 'Ads, pop-ups, and autoplay videos pull attention away. Finishing an article can feel impossible.',
    color: 'from-amber-500/20 to-orange-500/10',
    border: 'border-amber-500/25',
    badge: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    visual: <ADHDVisual />,
  },
  {
    emoji: '🌊',
    condition: 'Sensory Overload',
    headline: 'Flashing elements cause stress and fatigue.',
    detail: 'Animations, bright colors, and noise compete for attention. Browsing becomes physically exhausting.',
    color: 'from-rose-500/20 to-red-500/10',
    border: 'border-rose-500/25',
    badge: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
    visual: <SensoryVisual />,
  },
];

export default function ProblemStatement() {
  return (
    <section className="py-28 px-6 relative overflow-hidden bg-slate-950">
      {/* Background glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-600/5 rounded-full blur-[100px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 9, repeat: Infinity }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            <span className="text-red-400 text-xs font-bold uppercase tracking-widest">The Problem</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight mb-6">
            The web wasn&apos;t designed<br />
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              for every brain.
            </span>
          </h2>
        </motion.div>

        {/* Problem cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {problems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}
              className={`relative bg-gradient-to-br ${item.color} backdrop-blur-xl rounded-3xl p-6 border ${item.border} overflow-hidden group hover:scale-[1.02] transition-transform duration-300`}
            >
              {/* Visual representation */}
              <div className="mb-5 rounded-2xl overflow-hidden bg-slate-950/60 border border-white/5 h-28 flex items-center justify-center">
                {item.visual}
              </div>

              {/* Badge */}
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold mb-3 ${item.badge}`}>
                <span>{item.emoji}</span>
                <span>{item.condition}</span>
              </div>

              <h3 className="text-white font-bold text-base leading-snug mb-2">
                {item.headline}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Emotional close */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-2xl md:text-3xl font-bold text-slate-300 max-w-2xl mx-auto leading-relaxed">
            What should take seconds becomes{' '}
            <span className="text-white font-black">mentally exhausting.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Inline visual simulations ── */

function DyslexiaVisual() {
  const words = ['The', 'quick', 'brown', 'fox', 'jumps'];
  return (
    <div className="flex flex-wrap gap-1.5 px-4 py-3 justify-center items-center">
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="text-xs text-violet-200/70 font-mono"
          animate={{
            y: [0, i % 2 === 0 ? -3 : 3, 0],
            rotate: [0, i % 3 === 0 ? -4 : 4, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
        >
          {w}
        </motion.span>
      ))}
      <p className="w-full text-center text-[10px] text-violet-400/60 mt-1 font-medium">Letters that won&apos;t stay still</p>
    </div>
  );
}

function ADHDVisual() {
  const distractions = ['🔔 New message!', '🎬 Autoplay...', '📢 Limited offer!', '🔴 Notification'];
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {distractions.map((d, i) => (
        <motion.div
          key={i}
          className="absolute text-[9px] font-bold text-amber-300/80 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-full whitespace-nowrap"
          initial={{ x: 60, y: 0, opacity: 0 }}
          animate={{
            x: [60, -80, 60],
            y: [i * 12 - 18, i * 10 - 14, i * 12 - 18],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.7, ease: 'easeInOut' }}
        >
          {d}
        </motion.div>
      ))}
    </div>
  );
}

function SensoryVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl">
      <motion.div
        className="absolute inset-0"
        animate={{ backgroundColor: ['#1a0510', '#2d0a0a', '#0a0a1d', '#1a150a', '#0a1a10'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      />
      <div className="relative z-10 flex flex-col items-center gap-1">
        <motion.div
          className="w-16 h-2 rounded-full bg-rose-500"
          animate={{ scaleX: [1, 0.3, 1], opacity: [1, 0.2, 1] }}
          transition={{ duration: 0.4, repeat: Infinity }}
        />
        <motion.div
          className="w-10 h-2 rounded-full bg-orange-400"
          animate={{ scaleX: [0.5, 1, 0.5], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.6, repeat: Infinity }}
        />
        <p className="text-[10px] text-rose-300/70 font-medium mt-1">Overstimulating</p>
      </div>
    </div>
  );
}
