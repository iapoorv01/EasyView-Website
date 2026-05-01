'use client';

import { motion } from 'framer-motion';
import { Chrome, Github } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-28 px-6 relative overflow-hidden bg-[#060914]">
      {/* Ambient background */}
      <motion.div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(59,130,246,0.07) 0%, transparent 70%)' }}
        animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 6, repeat: Infinity }}
      />
      {/* Top edge line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
        >
          {/* Emotional headline */}
          <motion.div
            className="text-6xl mb-8"
            animate={{ scale: [1, 1.08, 1], rotate: [0, 3, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            🧠
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-tight mb-5">
            The problem was<br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-orange-400 bg-clip-text text-transparent">
              never you.
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-slate-400 font-medium mb-12 max-w-xl mx-auto leading-relaxed">
            The web just needed to adapt.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <motion.a
              href="https://chromewebstore.google.com/detail/easyview/fkmaolnondclckcdeeanjophpnhndgkk"
              target="_blank" rel="noopener noreferrer"
              className="group relative flex items-center gap-3 px-8 py-5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-blue-500/40 transition-all overflow-hidden"
              whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                initial={{ x: '-100%' }}
                whileHover={{ x: '200%' }}
                transition={{ duration: 0.6 }}
              />
              <Chrome className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Try EasyView Now</span>
            </motion.a>

            <motion.a
              href="https://github.com/iapoorv01/EasyView"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-5 bg-white/5 backdrop-blur-xl border border-white/10 text-white font-semibold text-base rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all"
              whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }}
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </motion.a>
          </div>

          {/* Trust line */}
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 text-slate-600 text-xs font-bold uppercase tracking-widest"
          >
            <span>🔒 Private & Secure</span>
            <span>🆓 Completely Free</span>
            <span>⚡ Installs in Seconds</span>
            <span>🌐 Works Everywhere</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
