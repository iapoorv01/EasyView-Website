'use client';

import { motion } from 'framer-motion';
import { Chrome } from 'lucide-react';

const premiumFeatures = [
  {
    icon: '🧠',
    title: 'ADHD-Optimized Fonts',
    desc: 'Specially weighted typefaces proven to reduce cognitive load and improve focus retention.',
    badge: 'Focus Mode',
    color: 'from-violet-500/15 to-purple-500/5',
    border: 'border-violet-500/20',
    badgeColor: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
  },
  {
    icon: '🌊',
    title: 'Advanced Sensory Modes',
    desc: 'Full-spectrum sensory control — eliminate every form of visual noise, motion, and overload.',
    badge: 'Sensory Shield Pro',
    color: 'from-blue-500/15 to-cyan-500/5',
    border: 'border-blue-500/20',
    badgeColor: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
  },
  {
    icon: '♾️',
    title: 'Unlimited AI Usage',
    desc: 'No daily caps. Simplify, decode, and explain as much content as you need, every single day.',
    badge: 'Unlimited',
    color: 'from-orange-500/15 to-amber-500/5',
    border: 'border-orange-500/20',
    badgeColor: 'bg-orange-500/10 text-orange-300 border-orange-500/20',
  },
];

export default function PremiumSection() {
  return (
    <section className="py-28 px-6 relative overflow-hidden bg-[#06080f]">
      {/* Premium glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] rounded-full blur-[150px]"
        style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-6">
            <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest">Advanced Support</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight mb-6">
            Designed for deeper{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              cognitive needs.
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            For users who need more than the basics. Advanced Support unlocks the full power of EasyView.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {premiumFeatures.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative bg-gradient-to-br ${f.color} backdrop-blur-xl rounded-3xl p-6 border ${f.border} group hover:scale-[1.02] transition-transform duration-300`}
            >
              <div className="text-4xl mb-5">{f.icon}</div>
              <div className={`inline-flex items-center px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest mb-3 ${f.badgeColor}`}>
                {f.badge}
              </div>
              <h3 className="text-white font-bold text-lg mb-2 leading-snug">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Premium card CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden border border-indigo-500/20 bg-gradient-to-br from-indigo-950/60 to-slate-950/80 backdrop-blur-xl p-10 text-center"
        >
          {/* Decorative background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 via-transparent to-violet-600/5" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/15 border border-indigo-500/25 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-indigo-300 text-sm font-bold">Advanced Support Plan</span>
            </div>

            <h3 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
              Go further with your accessibility.
            </h3>
            <p className="text-slate-400 max-w-lg mx-auto mb-8 leading-relaxed">
              Unlock ADHD fonts, unlimited AI, and pro sensory modes. Everything you need to make the web truly work for your mind.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href="https://chromewebstore.google.com/detail/easyview/fkmaolnondclckcdeeanjophpnhndgkk"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 px-7 py-4 bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-bold rounded-2xl shadow-xl hover:shadow-indigo-500/30 transition-all"
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
              >
                <Chrome className="w-5 h-5" />
                Get Advanced Support
              </motion.a>
              <span className="text-slate-500 text-sm">Upgrade anytime inside the extension</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
