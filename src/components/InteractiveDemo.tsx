'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function InteractiveDemo() {
  const [isDecoded, setIsDecoded] = useState(false);

  const complexText = {
    before: 'The aforementioned party shall indemnify and hold harmless the lessor from any liability pertaining to negligence or malfeasance occurring on the premises.',
    after: 'You must protect the landlord from being blamed if someone gets hurt on the property because of carelessness or wrongdoing.',
    tooltip: 'Indemnify means to protect someone from being held responsible for damages or losses.',
  };

  return (
    <section className="py-20 px-6 relative bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
           <motion.div
            className="inline-flex items-center gap-3 mb-6 px-5 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full"
          >
            <span className="text-emerald-400 font-black uppercase tracking-widest text-[10px]">See it in Action</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-emerald-200 to-slate-400 bg-clip-text text-transparent tracking-tighter">
            Simplify Any Text
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium">
            Watch how our extension turns difficult language into something everyone can understand.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Demo Container */}
          <div className="bg-white/5 backdrop-blur-2xl rounded-[32px] p-6 md:p-10 shadow-2xl border border-white/10">
            {/* Toggle Switch */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex items-center gap-2 bg-slate-900 rounded-2xl p-1.5 border border-white/10 shadow-2xl">
                <button
                  onClick={() => setIsDecoded(false)}
                  className={`px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                    !isDecoded
                      ? 'bg-white/10 text-white shadow-xl border border-white/10'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Original Jargon 😵‍💫
                </button>
                <button
                  onClick={() => setIsDecoded(true)}
                  className={`px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                    isDecoded
                      ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 shadow-xl border border-emerald-500/20'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Simplified ✨
                </button>
              </div>
            </div>

            {/* Text Display */}
            <motion.div
              className="relative min-h-[200px] flex items-center justify-center"
              layout
            >
              <motion.div
                key={isDecoded ? 'after' : 'before'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-center px-6"
              >
                <p
                  className={`text-lg md:text-2xl leading-relaxed tracking-tight ${
                    isDecoded ? 'text-white font-bold' : 'text-slate-400 font-medium'
                  }`}
                >
                  {isDecoded ? complexText.after : complexText.before}
                </p>

                {isDecoded && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-10 inline-block"
                  >
                    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-3xl p-6 max-w-lg shadow-2xl">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                          <span className="text-xl">💡</span>
                        </div>
                        <div className="text-left">
                          <p className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-2">
                            Explanation
                          </p>
                          <p className="text-sm text-slate-300 font-medium leading-relaxed">{complexText.tooltip}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>

            {/* Feature Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-3 justify-center mt-16"
            >
              {['Legal Documents', 'Financial News', 'Medical Reports', 'Technical Manuals', 'Academic Papers'].map((category, index) => (
                <motion.span
                  key={category}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="px-5 py-2 bg-white/5 backdrop-blur-xl rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 border border-white/5 shadow-sm"
                >
                  {category}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Floating Elements */}
          <motion.div
            className="absolute -top-10 -right-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-[100px]"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute -bottom-10 -left-10 w-64 h-64 bg-teal-500/10 rounded-full blur-[120px]"
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
