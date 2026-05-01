'use client';

import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const spring = useSpring(0, { damping: 20, stiffness: 60 });
  const rounded = useTransform(spring, (v) => Math.round(v));
  useEffect(() => { if (isInView) spring.set(value); }, [isInView, spring, value]);
  return <span ref={ref}><motion.span>{rounded}</motion.span>{suffix}</span>;
}

const stats = [
  { value: 20, suffix: '%+', label: 'of the global population', sub: 'live with a reading or attention difficulty', icon: '🌍', gradient: 'from-blue-400 to-cyan-400' },
  { value: 1, suffix: ' in 5', label: 'people benefit from accessibility', sub: 'but most websites ignore their needs', icon: '🧠', gradient: 'from-violet-400 to-purple-400' },
  { value: 100, suffix: '%', label: 'privacy — always', sub: 'all settings stay on your device', icon: '🔒', gradient: 'from-green-400 to-emerald-400' },
  { value: 0, suffix: '', label: 'data collected', sub: 'we never see your browsing activity', icon: '🛡️', gradient: 'from-orange-400 to-amber-400' },
];

const badges = [
  { icon: '🔒', label: 'Privacy-First', desc: 'All processing stays on your device' },
  { icon: '🌐', label: 'Works on Any Website', desc: 'Not just hand-picked sites — everywhere' },
  { icon: '📵', label: 'No Data Tracking', desc: 'Zero telemetry, zero analytics on you' },
  { icon: '🆓', label: 'Core Features Free', desc: 'The most important tools, always free' },
];

export default function ImpactStats() {
  return (
    <section className="py-28 px-6 relative overflow-hidden bg-slate-950">
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[140px]"
        style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.07) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Impact & Trust</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight mb-4">
            Helping{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">20%+</span>
            {' '}of people<br />access the web better.
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.1 }}
              whileHover={{ scale: 1.04, y: -4 }}
              className="group bg-white/4 backdrop-blur-xl rounded-3xl p-6 border border-white/8 hover:border-white/15 transition-all text-center"
            >
              <div className="text-3xl mb-3">{s.icon}</div>
              <div className={`text-3xl md:text-4xl font-black mb-1 bg-gradient-to-r ${s.gradient} bg-clip-text text-transparent tracking-tighter`}>
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </div>
              <p className="text-white text-xs font-bold uppercase tracking-widest mb-1">{s.label}</p>
              <p className="text-slate-500 text-[11px] leading-relaxed">{s.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <p className="text-center text-slate-500 text-sm font-medium mb-8 uppercase tracking-widest">Built on trust</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {badges.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3 bg-white/4 border border-white/8 rounded-2xl p-4 hover:border-white/15 transition-colors"
              >
                <span className="text-xl shrink-0">{b.icon}</span>
                <div>
                  <p className="text-white text-xs font-bold mb-0.5">{b.label}</p>
                  <p className="text-slate-500 text-[11px] leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
