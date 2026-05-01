'use client';

import { motion } from 'framer-motion';
import { AlertCircle, Zap, Users } from 'lucide-react';

export default function ProblemStatement() {
  return (
    <section className="py-20 px-6 relative overflow-hidden bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-6 px-5 py-2 bg-red-500/10 border border-red-500/20 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            <AlertCircle className="w-4 h-4 text-red-400" />
            <span className="text-red-400 font-black uppercase tracking-widest text-[10px]">The Problem</span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-black mb-8 text-white leading-tight tracking-tighter">
            Most websites are{' '}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              hard to read
            </span>{' '}
            for many users
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {[
              {
                icon: '🧠',
                title: 'Complex Language',
                description: 'Legal and technical jargon makes content difficult to follow.',
                color: 'purple'
              },
              {
                icon: '⚡',
                title: 'Sensory Overload',
                description: 'Moving parts and bright flashes can be overwhelming.',
                color: 'amber'
              },
              {
                icon: '📄',
                title: 'Difficult Layouts',
                description: 'Crowded pages and small fonts make reading a struggle.',
                color: 'blue'
              },
            ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-xl rounded-[24px] p-6 border border-white/10 hover:border-white/20 transition-all text-left group"
                >
                  <div className="text-3xl mb-5 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h3 className="text-base font-black mb-2 text-white uppercase tracking-widest">{item.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{item.description}</p>
                </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Background Decoration */}
      <motion.div
        className="absolute -bottom-20 -left-20 w-96 h-96 bg-red-600/10 rounded-full blur-[120px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </section>
  );
}
