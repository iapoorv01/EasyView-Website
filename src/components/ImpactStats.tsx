'use client';

import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const motionValue = useSpring(0, { damping: 20, stiffness: 60 });
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export default function ImpactStats() {
  const stats = [
    {
      value: 20,
      suffix: '%',
      label: 'World Population',
      icon: '🌍',
      color: 'from-indigo-400 to-purple-400',
    },
    {
      value: 4,
      suffix: '',
      label: 'Reading Modes',
      icon: '📚',
      color: 'from-blue-400 to-cyan-400',
    },
    {
      value: 100,
      suffix: '%',
      label: 'Fully Private',
      icon: '🛡️',
      color: 'from-green-400 to-emerald-400',
    },
    {
      value: 0,
      suffix: '',
      label: 'Data Leaks',
      icon: '🔒',
      color: 'from-red-400 to-orange-400',
    },
  ];

  return (
    <section className="py-20 px-6 relative overflow-hidden bg-slate-950">
      {/* Background Elements */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <motion.div
             className="inline-flex items-center gap-3 mb-6 px-5 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full"
          >
             <span className="text-blue-400 font-black uppercase tracking-widest text-[10px]">By the Numbers</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-indigo-200 to-slate-400 bg-clip-text text-transparent tracking-tighter">
            Our Impact
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium">
            Helping millions of people read and browse the web with ease.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative"
            >
              <div
                className="relative bg-white/5 backdrop-blur-2xl rounded-[32px] p-8 shadow-2xl border border-white/10 text-center overflow-hidden group-hover:border-white/20 transition-all duration-500"
              >
                {/* Gradient Background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500`}
                />

                {/* Icon */}
                <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-500">
                  {stat.icon}
                </div>

                {/* Number */}
                <div className={`text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent tracking-tighter`}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] leading-tight">{stat.label}</p>

                {/* Glow Effect */}
                <motion.div
                  className={`absolute -inset-1 bg-gradient-to-br ${stat.color} rounded-[32px] blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Privacy Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <motion.div
            className="inline-flex items-center gap-4 px-8 py-4 bg-white/5 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shadow-lg shadow-indigo-500/20">
              <span className="text-2xl">🔐</span>
            </div>
            <div className="text-left">
              <p className="text-sm font-black text-white uppercase tracking-widest mb-1">Your Privacy is Protected</p>
              <p className="text-xs text-slate-500 font-medium">Your data and keys stay on your device. We never see them.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
