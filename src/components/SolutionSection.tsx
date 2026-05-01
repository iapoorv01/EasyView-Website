'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

/* ─────────────────────────────────────────────
   Each card loops between a real "before" and
   "after" state so the transformation makes sense
───────────────────────────────────────────── */

function usePhaseLoop(periodMs = 3000, index = 0) {
  const [isAfter, setIsAfter] = useState(false);
  useEffect(() => {
    const delay = setTimeout(() => {
      const id = setInterval(() => setIsAfter(p => !p), periodMs);
      return () => clearInterval(id);
    }, index * 600);
    return () => clearTimeout(delay);
  }, [periodMs, index]);
  return isAfter;
}

/* ── Card 1: Cluttered page → clean reading view ── */
function ClarityCard() {
  const isAfter = usePhaseLoop(3200, 0);
  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900 h-52">
      <AnimatePresence mode="wait">
        {!isAfter ? (
          <motion.div key="before" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 p-3 bg-white">
            {/* Cluttered page */}
            <div className="flex gap-1.5 mb-1.5">
              <motion.div className="flex-1 bg-red-500 text-white text-[6px] px-1.5 py-1 font-black" animate={{ opacity: [1, 0.6, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>🔥 FLASH SALE ENDS NOW!!!</motion.div>
              <div className="bg-yellow-400 text-black text-[6px] px-1.5 py-1 font-black whitespace-nowrap">BUY!</div>
            </div>
            <div className="flex gap-1.5">
              <div className="flex-1 space-y-0.5">
                <div className="text-[6px] leading-tight text-gray-700" style={{ fontFamily: 'Georgia', letterSpacing: '-0.3px' }}>Lorem ipsum dolor sit amet consectetur adipiscing elit sed eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim minim veniam quis exercitation.</div>
                <div className="bg-orange-100 border border-orange-400 text-[5.5px] px-1 py-0.5 text-orange-900 font-bold">⚡ Subscribe! Limited time offer remaining today only!</div>
                <div className="text-[5.5px] leading-none text-gray-500" style={{ letterSpacing: '-0.4px' }}>Duis aute irure dolor reprehenderit voluptate velit cillum dolore fugiat nulla pariatur excepteur sint occaecat cupidatat non.</div>
              </div>
              <div className="w-14 space-y-1 shrink-0">
                <div className="bg-blue-600 text-white text-[5px] p-1 text-center font-black">AD</div>
                <motion.div className="bg-green-500 text-white text-[5px] p-1 text-center font-black" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 0.6, repeat: Infinity }}>BUY NOW</motion.div>
                <div className="bg-purple-500 text-white text-[5px] p-1 text-center">SHARE</div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="after" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 p-4 bg-slate-950">
            {/* Clean reader view */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-0.5 bg-blue-500 rounded-full" />
              <span className="text-[9px] text-blue-400 font-semibold">Reader Mode</span>
            </div>
            <p className="text-[10px] text-white font-semibold mb-2 leading-relaxed" style={{ letterSpacing: '0.03em' }}>Understanding the Topic</p>
            <div className="space-y-1.5">
              {[100, 90, 100, 75].map((w, i) => (
                <div key={i} className="h-1.5 bg-slate-700 rounded-full" style={{ width: `${w}%` }} />
              ))}
            </div>
            <div className="mt-3 flex gap-1.5">
              <div className="px-2 py-1 bg-blue-500/15 border border-blue-500/25 rounded-lg text-[8px] text-blue-300">🔊 Listen</div>
              <div className="px-2 py-1 bg-purple-500/15 border border-purple-500/25 rounded-lg text-[8px] text-purple-300">📖 Bionic</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Phase label */}
      <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-bold border ${!isAfter ? 'bg-red-500/20 text-red-300 border-red-500/30' : 'bg-blue-500/20 text-blue-300 border-blue-500/30'}`}>
        {isAfter ? '✓ After' : 'Before'}
      </div>
    </div>
  );
}

/* ── Card 2: Jargon sentence → plain English ── */
function SimplifyCard() {
  const isAfter = usePhaseLoop(3400, 1);
  const before = '"The patient exhibits heterogeneous neurodevelopmental comorbidities necessitating multidisciplinary psychoeducational intervention."';
  const after = '"The patient has several overlapping brain conditions that need a team of specialists to support."';
  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900 h-52">
      <div className="absolute inset-0 p-4 flex flex-col justify-between">
        {/* Source text */}
        <div>
          <p className="text-[9px] text-slate-500 font-medium uppercase tracking-widest mb-2">{isAfter ? 'Plain English' : 'Original text'}</p>
          <AnimatePresence mode="wait">
            <motion.p
              key={isAfter ? 'after' : 'before'}
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4 }}
              className={`text-[11px] leading-relaxed ${isAfter ? 'text-white font-medium' : 'text-slate-400 font-normal'}`}
              style={{ letterSpacing: isAfter ? '0.02em' : '0' }}
            >
              {isAfter ? after : before}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* AI indicator */}
        <AnimatePresence>
          {isAfter && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex items-center gap-2 px-3 py-2 bg-purple-500/10 border border-purple-500/20 rounded-xl"
            >
              <motion.span className="w-2 h-2 rounded-full bg-purple-400" animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1, repeat: Infinity }} />
              <span className="text-[9px] text-purple-300 font-semibold">Decoded by EasyView AI</span>
            </motion.div>
          )}
          {!isAfter && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex items-center gap-2 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-xl"
            >
              <span className="text-[9px] text-red-300 font-medium">Complex jargon — hard to understand</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Phase label */}
      <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-bold border ${!isAfter ? 'bg-red-500/20 text-red-300 border-red-500/30' : 'bg-purple-500/20 text-purple-300 border-purple-500/30'}`}>
        {isAfter ? '✓ After' : 'Before'}
      </div>
    </div>
  );
}

/* ── Card 3: Distracting animations → calm frozen page ── */
function CalmCard() {
  const isAfter = usePhaseLoop(3000, 2);
  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900 h-52">
      <AnimatePresence mode="wait">
        {!isAfter ? (
          <motion.div key="chaos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="absolute inset-0 p-4 bg-slate-900 overflow-hidden">
            {/* Distracting elements */}
            <motion.div className="absolute top-4 left-4 px-3 py-1.5 bg-red-500 rounded-lg text-white text-[8px] font-black" animate={{ x: [0, 4, -4, 0], opacity: [1, 0.7, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>🔔 New notification!</motion.div>
            <motion.div className="absolute top-12 right-4 px-3 py-1.5 bg-yellow-500 rounded-lg text-black text-[8px] font-black" animate={{ y: [0, -5, 0], scale: [1, 1.05, 1] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}>🎬 Autoplay next...</motion.div>
            <motion.div className="absolute top-24 left-8 w-20 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" animate={{ scaleX: [1, 0.3, 1], opacity: [1, 0.3, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }} />
            <motion.div className="absolute bottom-16 right-8 px-2 py-1 bg-green-500 rounded text-white text-[8px] font-black" animate={{ rotate: [0, 3, -3, 0], scale: [1, 1.08, 1] }} transition={{ duration: 0.7, repeat: Infinity }}>📢 SUBSCRIBE!</motion.div>
            <motion.div className="absolute bottom-8 left-4 w-24 h-2 bg-blue-400 rounded-full" animate={{ x: [0, 8, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity }} />
            <div className="absolute bottom-4 right-4 text-[8px] text-slate-500 font-medium">Sensory overload...</div>
          </motion.div>
        ) : (
          <motion.div key="calm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="absolute inset-0 p-4 bg-slate-950 flex flex-col justify-between">
            {/* Calm, frozen */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-0.5 bg-green-500 rounded-full" />
              <span className="text-[9px] text-green-400 font-semibold">🛡️ Sensory Shield Active</span>
            </div>
            <div className="space-y-2">
              {/* Frozen elements with ✓ badges */}
              {['Animations frozen', 'Autoplay blocked', 'Flash prevention on'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-xl">
                  <span className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                    <span className="text-[7px] text-white font-black">✓</span>
                  </span>
                  <span className="text-[9px] text-green-300 font-medium">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-[9px] text-slate-500 font-medium text-center">Calm, distraction-free browsing</p>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Phase label */}
      <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-bold border ${!isAfter ? 'bg-red-500/20 text-red-300 border-red-500/30' : 'bg-green-500/20 text-green-300 border-green-500/30'}`}>
        {isAfter ? '✓ After' : 'Before'}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Section
───────────────────────────────────────────── */

const cards = [
  {
    label: 'Clutter → Clarity',
    icon: '🌀',
    desc: 'Every page becomes a clean, focused reading space.',
    color: 'blue',
    borderColor: 'border-blue-500/20',
    badgeColor: 'bg-blue-500/10 text-blue-300',
    visual: <ClarityCard />,
  },
  {
    label: 'Complex → Simple',
    icon: '🧩',
    desc: 'AI rewrites jargon into plain, understandable language.',
    color: 'purple',
    borderColor: 'border-purple-500/20',
    badgeColor: 'bg-purple-500/10 text-purple-300',
    visual: <SimplifyCard />,
  },
  {
    label: 'Distraction → Focus',
    icon: '⚡',
    desc: 'All animations and noise are silenced instantly.',
    color: 'green',
    borderColor: 'border-green-500/20',
    badgeColor: 'bg-green-500/10 text-green-300',
    visual: <CalmCard />,
  },
];

export default function SolutionSection() {
  return (
    <section id="solution" className="py-28 px-6 relative overflow-hidden bg-[#060914]">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-blue-600/6 rounded-full blur-[120px]" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity }} />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">The Transformation</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight mb-4">
            EasyView adapts the web{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">to you.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            One click. See exactly what changes — live, below.
          </p>
        </motion.div>

        {/* 3 transformation cards — each showing a real animated before/after */}
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`rounded-3xl border ${card.borderColor} bg-slate-900/40 backdrop-blur-xl p-5 space-y-4`}
            >
              {/* Card header */}
              <div className="flex items-center gap-3">
                <span className="text-xl">{card.icon}</span>
                <div>
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${card.badgeColor}`}>{card.label}</span>
                  <p className="text-slate-500 text-xs mt-0.5 leading-snug">{card.desc}</p>
                </div>
              </div>

              {/* Live animated visual */}
              {card.visual}

              {/* Loop indicator */}
              <div className="flex items-center gap-1.5 justify-center">
                <motion.div className="w-1 h-1 rounded-full bg-slate-600" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }} />
                <motion.div className="w-1 h-1 rounded-full bg-slate-600" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }} />
                <motion.div className="w-1 h-1 rounded-full bg-slate-600" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 1 }} />
                <span className="text-[9px] text-slate-600 font-medium ml-1">auto-loops</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
