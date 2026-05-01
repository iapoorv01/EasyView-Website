'use client';

import { motion } from 'framer-motion';
import { Download, Github } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-slate-950">
      {/* Animated Dark Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Floating Orbs with Dark Glow */}
      <motion.div
        className="absolute top-10 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]"
        animate={{
          y: [0, -60, 0],
          x: [0, 40, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px]"
        animate={{
          y: [0, 60, 0],
          x: [0, -40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="text-6xl mb-8"
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            🧠
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tighter">
            Ready to Read Better?
          </h2>

          <p className="text-lg md:text-xl mb-10 text-slate-400 max-w-2xl mx-auto font-medium">
            Join thousands of users who make the web easier to read every day. Install EasyView in seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <motion.a
              href="https://chromewebstore.google.com/detail/easyview/fkmaolnondclckcdeeanjophpnhndgkk"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-2xl hover:shadow-indigo-500/40 transition-all"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-3 justify-center">
                <Download className="w-4 h-4 group-hover:animate-bounce" />
                Add to Chrome
              </span>
            </motion.a>

            <motion.a
              href="https://github.com/iapoorv01/EasyView"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/5 backdrop-blur-xl text-white font-black text-xs uppercase tracking-widest rounded-2xl border border-white/10 hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-3 justify-center">
                <Github className="w-4 h-4" />
                View on GitHub
              </span>
            </motion.a>
          </div>

          <motion.div
            className="mt-12 flex flex-wrap justify-center gap-8 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <span>Private & Secure</span>
            <span>Completely Free</span>
            <span>Open Source</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
