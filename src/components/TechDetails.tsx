'use client';

import { motion } from 'framer-motion';
import { Code2, Cpu, Lock, Zap } from 'lucide-react';

export default function TechDetails() {
  const techStack = [
    { name: 'Manifest V3', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
    { name: 'Google Gemini', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    { name: 'OpenRouter AI', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    { name: 'Neural Latency', color: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
    { name: 'Open Source', color: 'bg-pink-500/10 text-pink-400 border-pink-500/20' },
    { name: 'Web Speech API', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-200' },
  ];

  const features = [
    {
      icon: Cpu,
      title: 'Smart AI Switching',
      description: 'Automatically chooses the best AI model to give you the most accurate results.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Lock,
      title: 'Secure Storage',
      description: 'Your settings and data are saved safely on your own device.',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      icon: Zap,
      title: 'Works Everywhere',
      description: 'Designed to work perfectly on any website you visit.',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Code2,
      title: 'Built to Last',
      description: 'Using the latest web technology for a fast and safe experience.',
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-6 px-5 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full"
          >
            <span className="text-indigo-400 font-black uppercase tracking-widest text-[10px]">Modern Tech</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-indigo-200 to-slate-400 bg-clip-text text-transparent tracking-tighter">
            How it Works
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium">
            We use the latest technology to make the web easier to read for everyone.
          </p>
        </motion.div>

        {/* Tech Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-20"
        >
          {techStack.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`px-6 py-2.5 rounded-2xl font-black uppercase text-[9px] tracking-[0.2em] border shadow-2xl backdrop-blur-xl ${tech.color}`}
            >
              {tech.name}
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group relative"
            >
              <div className="bg-white/5 backdrop-blur-2xl rounded-[32px] p-8 shadow-2xl border border-white/10 h-full group-hover:border-white/20 transition-all">
                <motion.div
                  className={`w-14 h-14 mb-6 rounded-[20px] bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-xl`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </motion.div>

                <h3 className="text-xl font-black mb-3 text-white tracking-tight">{feature.title}</h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">{feature.description}</p>

                {/* Hover Glow */}
                <motion.div
                  className={`absolute -inset-1 bg-gradient-to-br ${feature.color} rounded-[32px] blur-2xl opacity-0 group-hover:opacity-20 transition-opacity -z-10`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Open Source Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 text-center"
        >
          <motion.a
            href="https://github.com/iapoorv01/EasyView"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 px-10 py-5 bg-white/5 backdrop-blur-2xl text-white rounded-2xl shadow-2xl border border-white/10 hover:bg-white/10 transition-all group"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Code2 className="w-6 h-6 text-purple-400 group-hover:animate-pulse" />
            <span className="font-black text-xs uppercase tracking-[0.3em]">View Source Code</span>
          </motion.a>
        </motion.div>
      </div>

      {/* Background Decoration */}
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px] -z-10"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </section>
  );
}
