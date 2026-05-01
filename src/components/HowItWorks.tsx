'use client';

import { motion } from 'framer-motion';
import { Download, Settings, Zap } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '1',
      icon: Download,
      title: 'Install',
      description: 'Add EasyView to your Chrome browser in just one click.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      number: '2',
      icon: Settings,
      title: 'Set it Up',
      description: 'Choose your favorite fonts, colors, and reading speed.',
      color: 'from-indigo-500 to-blue-500',
    },
    {
      number: '3',
      icon: Zap,
      title: 'Start Reading',
      description: 'Click the icon on any website to make it easier to read.',
      color: 'from-emerald-500 to-teal-500',
    },
  ];

  return (
    <section className="py-20 px-6 relative overflow-hidden bg-slate-950">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-6 px-5 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full"
          >
            <span className="text-purple-400 font-black uppercase tracking-widest text-[10px]">Easy Setup</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-indigo-200 to-slate-400 bg-clip-text text-transparent tracking-tighter">
            Getting Started
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Get up and running in less than two minutes.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connector Lines */}
          <div className="hidden md:block absolute top-14 left-[10%] right-[10%] h-[2px] bg-white/5" />

          <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.55, delay: index * 0.15 }}
                className="relative"
              >
                {/* Step Number Circle */}
                <div className="relative z-20 w-fit md:mx-auto mb-10">
                  <motion.div
                    className={`h-14 w-14 rounded-2xl bg-slate-900 border border-white/10 text-white font-black text-xl flex items-center justify-center shadow-2xl group-hover:border-purple-500/50 transition-all`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <span className={`bg-gradient-to-br ${step.color} bg-clip-text text-transparent`}>
                      {step.number}
                    </span>
                  </motion.div>
                  {/* Pulse Effect */}
                  <div className="absolute inset-0 bg-white/5 rounded-2xl animate-ping opacity-20" />
                </div>

                <motion.div
                  className="relative bg-white/5 backdrop-blur-2xl rounded-[32px] p-8 shadow-2xl border border-white/10 group h-full hover:border-white/20 transition-all"
                  whileHover={{ y: -10 }}
                >
                  <div className={`absolute inset-x-10 top-0 h-[2px] bg-gradient-to-r ${step.color} opacity-40`} />

                  <div className="flex flex-col items-center md:items-start text-center md:text-left gap-5 mb-5">
                    <div className={`relative w-14 h-14 shrink-0 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                      <step.icon className={`relative w-6 h-6 text-white`} strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black tracking-[0.3em] text-slate-500 mb-2 uppercase">Step {step.number}</p>
                      <h3 className="text-xl font-black text-white tracking-tight">{step.title}</h3>
                    </div>
                  </div>

                  <p className="text-slate-400 leading-relaxed font-medium">{step.description}</p>

                  <div className="mt-10 flex items-center justify-center md:justify-start gap-2 opacity-30">
                    <span className={`h-1.5 w-12 rounded-full bg-gradient-to-r ${step.color}`} />
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-700" />
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-700" />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
