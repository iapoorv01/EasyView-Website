'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { BookOpen, Brain, Shield, FileText } from 'lucide-react';

/* ─────────────────────────────────────────────
   Live Demo previews — one per feature layer
───────────────────────────────────────────── */

function ReadingDemo() {
  const [mode, setMode] = useState<'normal' | 'dyslexia' | 'bionic'>('normal');
  const text = 'The quick brown fox jumps over the lazy dog near the riverside.';
  return (
    <div className="h-full flex flex-col gap-3">
      <div className="flex gap-2 flex-wrap">
        {(['normal', 'dyslexia', 'bionic'] as const).map(m => (
          <button key={m} onClick={() => setMode(m)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all capitalize ${mode === m ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' : 'bg-white/5 text-slate-500 border-white/8 hover:border-white/15'}`}
          >{m === 'dyslexia' ? 'OpenDyslexic' : m === 'bionic' ? 'Bionic Reading' : 'Standard'}</button>
        ))}
      </div>
      <div className="flex-1 bg-slate-950/80 rounded-2xl border border-white/8 p-4 overflow-hidden">
        <div className="text-[10px] text-slate-500 mb-2 uppercase tracking-widest font-semibold">Live Preview</div>
        <AnimatePresence mode="wait">
          <motion.div key={mode} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            {mode === 'normal' && (
              <p className="text-slate-400 text-sm leading-[2]">{text}</p>
            )}
            {mode === 'dyslexia' && (
              <p className="text-slate-200 text-sm leading-[2]" style={{ fontFamily: 'var(--font-body), sans-serif', letterSpacing: '0.04em', wordSpacing: '0.08em' }}>
                {text}
              </p>
            )}
            {mode === 'bionic' && (
              <p className="text-slate-300 text-sm leading-[2]">
                {text.split(' ').map((word, i) => {
                  // Standard Bionic Fixation: 1 char for short, 2 for med, 3 for long
                  let fix = 1;
                  if (word.length > 5) fix = 3;
                  else if (word.length > 3) fix = 2;

                  return (
                    <span key={i} className="inline-block mr-1">
                      <strong className="text-white font-bold">{word.slice(0, fix)}</strong>
                      <span className="opacity-70">{word.slice(fix)}</span>
                    </span>
                  );
                })}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
        {mode === 'dyslexia' && (
          <div className="mt-3 px-3 py-2 bg-blue-500/10 border border-blue-500/15 rounded-xl">
            <p className="text-[9px] text-blue-300 font-medium">↑ Wider spacing + weighted font applied</p>
          </div>
        )}
        {mode === 'bionic' && (
          <div className="mt-3 px-3 py-2 bg-cyan-500/10 border border-cyan-500/15 rounded-xl">
            <p className="text-[9px] text-cyan-300 font-medium">↑ Bold anchors guide your eye through each word</p>
          </div>
        )}
      </div>
    </div>
  );
}

function AIDemo() {
  const [decoded, setDecoded] = useState(false);
  const [loading, setLoading] = useState(false);
  const jargon = 'The patient exhibits heterogeneous neurodevelopmental comorbidities necessitating multidisciplinary psychoeducational intervention.';
  const plain = 'The patient has several overlapping brain-related conditions that need a team of different specialists to provide support.';

  const handleDecode = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setDecoded(true); }, 1600);
  };

  return (
    <div className="h-full flex flex-col gap-3">
      <div className="flex-1 bg-slate-950/80 rounded-2xl border border-white/8 p-4 space-y-3 overflow-hidden">
        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Input — Original Text</div>
        <p className="text-slate-500 text-xs leading-relaxed border-l-2 border-slate-700 pl-3">{jargon}</p>
        <div className="h-px bg-white/5" />
        <AnimatePresence mode="wait">
          {!decoded && !loading && (
            <motion.button key="btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={handleDecode}
              className="w-full py-2.5 bg-gradient-to-r from-purple-500/20 to-violet-500/20 border border-purple-500/30 rounded-xl text-xs font-bold text-purple-300 hover:from-purple-500/30 hover:to-violet-500/30 transition-all"
            >
              🧠 Decode with AI →
            </motion.button>
          )}
          {loading && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3 py-2">
              <motion.div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <motion.span key={i} className="w-1.5 h-1.5 rounded-full bg-purple-400" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }} />
                ))}
              </motion.div>
              <span className="text-xs text-purple-400 font-medium">AI processing...</span>
            </motion.div>
          )}
          {decoded && !loading && (
            <motion.div key="result" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-[10px] text-purple-400 uppercase tracking-widest font-semibold mb-2">✓ Plain English</div>
              <p className="text-white text-xs leading-relaxed font-medium border-l-2 border-purple-500 pl-3">{plain}</p>
              <button onClick={() => setDecoded(false)} className="mt-2 text-[9px] text-slate-500 hover:text-slate-400 transition-colors underline">Reset demo</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SensoryDemo() {
  const [shieldOn, setShieldOn] = useState(false);
  return (
    <div className="h-full flex flex-col gap-3">
      <button
        onClick={() => setShieldOn(p => !p)}
        className={`w-full py-3 rounded-xl text-xs font-bold border transition-all duration-500 ${shieldOn ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/20'}`}
      >
        {shieldOn ? '🛡️ Sensory Shield — ACTIVE (click to deactivate)' : '⚡ Activate Sensory Shield'}
      </button>
      <div className="flex-1 bg-slate-950/80 rounded-2xl border border-white/8 p-4 overflow-hidden relative">
        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-3">Page Simulation</div>
        <div className="space-y-2">
          {[
            { label: 'Banner animation', color: 'red' },
            { label: 'Autoplay video', color: 'orange' },
            { label: 'Carousel slider', color: 'yellow' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-800/50 border border-white/5">
              {!shieldOn ? (
                <motion.span className={`w-2 h-2 rounded-full bg-${item.color}-400 shrink-0`} animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }} transition={{ duration: 0.6 + i * 0.2, repeat: Infinity }} />
              ) : (
                <motion.span initial={{ scale: 1.3 }} animate={{ scale: 1 }} className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
              )}
              <span className="text-xs text-slate-400 flex-1">{item.label}</span>
              <span className={`text-[10px] font-bold ${shieldOn ? 'text-green-400' : 'text-slate-600'}`}>{shieldOn ? '✓ Frozen' : 'Running'}</span>
            </div>
          ))}
        </div>
        {shieldOn && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-xl">
            <p className="text-[9px] text-green-300 font-medium">All motion neutralised — calm reading enabled</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function ContentDemo() {
  const [view, setView] = useState<'reader' | 'export'>('reader');
  return (
    <div className="h-full flex flex-col gap-3">
      <div className="flex gap-2">
        {(['reader', 'export'] as const).map(v => (
          <button key={v} onClick={() => setView(v)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all capitalize ${view === v ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' : 'bg-white/5 text-slate-500 border-white/8 hover:border-white/15'}`}
          >{v === 'reader' ? '📄 Reader Mode' : '📥 Export'}</button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {view === 'reader' ? (
          <motion.div key="reader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 bg-slate-950/80 rounded-2xl border border-white/8 p-4">
            <div className="w-8 h-0.5 bg-orange-500 rounded-full mb-3" />
            <p className="text-[10px] text-orange-400 font-semibold mb-2 uppercase tracking-widest">Article — Reader Mode</p>
            <p className="text-sm text-white font-semibold mb-2 leading-relaxed">Understanding Your Diagnosis</p>
            <div className="space-y-1.5 mb-3">
              {[100, 88, 100, 72, 95].map((w, i) => (
                <div key={i} className="h-1.5 bg-slate-700 rounded-full" style={{ width: `${w}%` }} />
              ))}
            </div>
            <p className="text-[9px] text-slate-500 font-medium">No ads · No sidebars · No distractions</p>
          </motion.div>
        ) : (
          <motion.div key="export" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 bg-slate-950/80 rounded-2xl border border-white/8 p-4 space-y-2.5">
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-1">Export Article As</div>
            {[
              { fmt: 'EPUB', icon: '📚', desc: 'E-book for e-reader', color: 'orange' },
              { fmt: 'DOCX', icon: '📝', desc: 'Word document', color: 'blue' },
              { fmt: 'HTML', icon: '🌐', desc: 'Web page', color: 'green' },
            ].map(({ fmt, icon, desc, color }) => (
              <div key={fmt} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl bg-${color}-500/10 border border-${color}-500/20`}>
                <span className="text-base">{icon}</span>
                <div className="flex-1">
                  <p className={`text-xs font-bold text-${color}-300`}>Download as {fmt}</p>
                  <p className="text-[9px] text-slate-500">{desc}</p>
                </div>
                <span className={`text-[10px] text-${color}-400 font-bold`}>↓</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Feature layer definitions
───────────────────────────────────────────── */

const featureLayers = [
  {
    id: 'reading', icon: BookOpen, label: 'Reading Support', gradient: 'from-blue-500 to-cyan-500',
    activeBg: 'bg-blue-500/15', border: 'border-blue-500/30', textColor: 'text-blue-400',
    description: 'Dyslexia-optimised typography that makes every word easier to track.',
    features: [
      { icon: '🔤', title: 'OpenDyslexic Font', desc: 'Weighted chars reduce letter confusion.' },
      { icon: '👁️', title: 'Bionic Reading', desc: 'Bold anchors guide your eye forward.' },
      { icon: '↔️', title: 'Spacing Control', desc: 'Fine-tune letter, word, and line spacing.' },
      { icon: '🎨', title: 'Color Overlays', desc: 'Tinted backgrounds reduce glare.' },
    ],
    demo: <ReadingDemo />,
  },
  {
    id: 'ai', icon: Brain, label: 'AI Understanding', gradient: 'from-purple-500 to-violet-500',
    activeBg: 'bg-purple-500/15', border: 'border-purple-500/30', textColor: 'text-purple-400',
    description: 'Powered by Amazon Nova — decodes complex language in real time.',
    features: [
      { icon: '🧠', title: 'Jargon Decoder', desc: 'Turns legal & medical text plain.' },
      { icon: '📝', title: 'Page Simplifier', desc: 'Rewrites full articles simply.' },
      { icon: '💡', title: 'Context Explainer', desc: 'Click any sentence for clarity.' },
      { icon: '🔍', title: 'Smart Tooltips', desc: 'Instant definitions on hover.' },
    ],
    demo: <AIDemo />,
  },
  {
    id: 'sensory', icon: Shield, label: 'Sensory Control', gradient: 'from-green-500 to-emerald-500',
    activeBg: 'bg-green-500/15', border: 'border-green-500/30', textColor: 'text-green-400',
    description: 'Silence the chaos — remove everything designed to overwhelm.',
    features: [
      { icon: '🛡️', title: 'Animation Freeze', desc: 'Stops all CSS animations & GIFs.' },
      { icon: '📺', title: 'Autoplay Block', desc: 'No videos start without permission.' },
      { icon: '⚡', title: 'Flash Prevention', desc: 'Neutralises strobing elements.' },
      { icon: '🌑', title: 'Dark Overlay', desc: 'Dims harsh backgrounds.' },
    ],
    demo: <SensoryDemo />,
  },
  {
    id: 'content', icon: FileText, label: 'Content Freedom', gradient: 'from-orange-500 to-amber-500',
    activeBg: 'bg-orange-500/15', border: 'border-orange-500/30', textColor: 'text-orange-400',
    description: 'Your content, your format — reader mode and flexible exports.',
    features: [
      { icon: '📄', title: 'Document Reader', desc: 'Strip noise, clean focused view.' },
      { icon: '📚', title: 'Export to EPUB', desc: 'Save articles as e-books.' },
      { icon: '📝', title: 'Export to DOCX', desc: 'Download for assistive tools.' },
      { icon: '🔊', title: 'Text-to-Speech', desc: 'Natural voice with word highlight.' },
    ],
    demo: <ContentDemo />,
  },
];

export default function Features() {
  const [active, setActive] = useState(0);
  const current = featureLayers[active];

  return (
    <section className="py-28 px-6 relative bg-slate-950">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-purple-400 text-xs font-bold uppercase tracking-widest">Feature Layers</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight mb-4">Everything your brain needs.</h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">Four deep layers. Try the live demos below.</p>
        </motion.div>

        {/* Tab selector */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {featureLayers.map((layer, i) => {
            const Icon = layer.icon;
            const isActive = active === i;
            return (
              <button key={layer.id} onClick={() => setActive(i)}
                className={`group flex flex-col items-center gap-2 px-4 py-4 rounded-2xl border transition-all duration-300 ${isActive ? `${layer.activeBg} ${layer.border} shadow-lg` : 'bg-white/4 border-white/8 hover:bg-white/8 hover:border-white/15'}`}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${layer.gradient} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <span className={`text-xs font-bold text-center leading-tight ${isActive ? layer.textColor : 'text-slate-400'}`}>{layer.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Active layer: 2-column — feature list + live demo */}
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
            className={`rounded-3xl border ${current.border} bg-slate-900/40 backdrop-blur-xl p-7`}
          >
            <div className="mb-6">
              <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold border ${current.activeBg} ${current.border} ${current.textColor}`}>{current.label}</span>
              <p className="text-slate-300 text-base font-medium mt-2 max-w-xl leading-relaxed">{current.description}</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left: feature mini-cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {current.features.map((f, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                    className="bg-slate-900/60 rounded-2xl p-4 border border-white/8 hover:border-white/15 transition-colors"
                  >
                    <span className="text-xl block mb-2">{f.icon}</span>
                    <h4 className={`font-bold text-xs mb-1 ${current.textColor}`}>{f.title}</h4>
                    <p className="text-slate-500 text-[11px] leading-relaxed">{f.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* Right: live demo */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`w-1.5 h-1.5 rounded-full ${current.textColor.replace('text-', 'bg-')} animate-pulse`} />
                  <span className="text-xs text-slate-500 font-semibold uppercase tracking-widest">Live Demo</span>
                </div>
                <div className="flex-1 min-h-[260px]">
                  {current.demo}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Coming soon */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-center mt-8">
          <span className="text-slate-500 text-sm font-medium">Many more features coming — this is just the beginning.</span>
        </motion.div>
      </div>
    </section>
  );
}
