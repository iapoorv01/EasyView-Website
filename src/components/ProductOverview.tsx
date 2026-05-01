'use client';

import { motion } from 'framer-motion';

export default function ProductOverview() {
  return (
    <section className="py-20 px-6 relative bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-6 px-5 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full"
          >
            <span className="text-indigo-400 font-black uppercase tracking-widest text-[10px]">Our Mission</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-white via-indigo-200 to-slate-400 bg-clip-text text-transparent tracking-tighter">
            Reading Made Simple
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto font-medium">
            EasyView is a simple browser extension that changes how you see and read websites to fit your needs.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-2xl rounded-[32px] p-8 shadow-2xl border border-white/10"
          >
            <p className="text-slate-300 text-base leading-relaxed mb-6 font-medium">
              We built EasyView to help anyone who finds regular websites hard to navigate. We use smart technology to turn busy, confusing pages into clean, readable workspaces.
            </p>
            <p className="text-slate-400 leading-relaxed mb-6">
              You can change fonts, adjust spacing, and use special reading modes to make text easier to follow. Every part of the page is under your control.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Our tools help stop distracting movements and flashes, while our voice reader lets you listen to any text with ease.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid gap-8"
          >
            <div className="bg-white/5 backdrop-blur-2xl rounded-[32px] p-5 shadow-2xl border border-white/10 group overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80"
                alt="Focused reading interface for improved accessibility"
                className="w-full h-48 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
              />
              <p className="text-xs font-black uppercase tracking-widest text-slate-500 mt-5 px-1">
                Easier to Focus
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-2xl rounded-[32px] p-5 shadow-2xl border border-white/10 group overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1200&q=80"
                alt="Calm digital workspace representing sensory-safe browsing"
                className="w-full h-48 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
              />
              <p className="text-xs font-black uppercase tracking-widest text-slate-500 mt-5 px-1">
                Calmer Browsing
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-[32px] p-8 border border-white/10 shadow-2xl backdrop-blur-xl"
        >
          <h3 className="text-2xl font-black text-white mb-5 tracking-tight">What's Coming Next</h3>
          <p className="text-slate-300 text-base leading-relaxed mb-5 font-medium">
            We're working on even more ways to help you read. This includes more advanced AI tools to simplify complex text and the ability to use your own AI keys for maximum privacy.
          </p>
          <p className="text-slate-400 leading-relaxed">
            Our upcoming premium features will offer even better text simplification and the ability to sync your settings across all your devices.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
