'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { BookOpen, Eye, Shield, Volume2 } from 'lucide-react';
import { useState } from 'react';

const features = [
  {
    icon: BookOpen,
    title: 'Jargon Decoder',
    emoji: '📖',
    description: 'AI that translates complex text into plain English',
    color: 'from-purple-400 to-pink-400',
    details: [
      'Full page decode or selected text',
      'Interactive tooltips with definitions',
      'Smart context-aware simplifications',
      'Visual progress indicators',
    ],
  },
  {
    icon: Eye,
    title: 'Dyslexia Reading Mode',
    emoji: '📚',
    description: 'Fonts, spacing, and overlays designed for dyslexic brains',
    color: 'from-blue-400 to-cyan-400',
    details: [
      'OpenDyslexic font support',
      'Customizable letter & line spacing',
      'Color overlays to reduce eye strain',
      'Bionic reading mode',
    ],
  },
  {
    icon: Shield,
    title: 'Sensory Shield',
    emoji: '🛡️',
    description: 'Freeze animations and reduce sensory overload',
    color: 'from-green-400 to-emerald-400',
    details: [
      'Stops CSS animations instantly',
      'Pauses auto-playing videos',
      'Prevents flashing elements',
      'Creates calmer browsing',
    ],
  },
  {
    icon: Volume2,
    title: 'Text-to-Speech',
    emoji: '🔊',
    description: 'Let your ears do the reading',
    color: 'from-orange-400 to-red-400',
    details: [
      'Adjustable reading speed',
      'Multiple voice options',
      'Word-by-word highlighting',
      'Smart punctuation pauses',
    ],
  },
];

export default function Features() {
  return (
    <section className="py-20 px-6 relative bg-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
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
             <span className="text-purple-400 font-black uppercase tracking-widest text-[10px]">What's Included</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-slate-400 bg-clip-text text-transparent tracking-tighter">
            Everything You Need
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium">
            Powerful tools designed to make reading and browsing easier for everyone.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="perspective-1000"
    >
      <motion.div
        className="relative group cursor-pointer"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Card */}
        <div className="relative bg-slate-900/60 backdrop-blur-2xl rounded-[32px] p-8 shadow-2xl border border-white/10 overflow-hidden group-hover:border-purple-500/30 transition-all duration-500">
          {/* Gradient Background */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500`}
          />

          {/* Icon/Emoji Container */}
          <div className="flex items-center gap-5 mb-6" style={{ transform: 'translateZ(30px)' }}>
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}>
              <feature.icon className="w-7 h-7 text-white" strokeWidth={2.5} />
            </div>
            <motion.span 
              className="text-4xl"
              animate={{ rotate: isHovered ? [0, 10, -10, 0] : 0 }}
              transition={{ duration: 0.5 }}
            >
              {feature.emoji}
            </motion.span>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-black mb-3 text-white tracking-tighter" style={{ transform: 'translateZ(20px)' }}>
            {feature.title}
          </h3>

          {/* Description */}
          <p className="text-slate-400 text-base mb-6 leading-relaxed font-medium" style={{ transform: 'translateZ(10px)' }}>
            {feature.description}
          </p>

          {/* Details List */}
          <div 
            className="space-y-4 overflow-hidden transition-all duration-500"
            style={{ 
              maxHeight: isHovered ? '200px' : '0px',
              opacity: isHovered ? 1 : 0,
              transform: 'translateZ(5px)'
            }}
          >
            {feature.details.map((detail, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-sm text-slate-300 font-bold"
              >
                <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.color}`} />
                <span>{detail}</span>
              </div>
            ))}
          </div>

          {/* Static Hint when not hovered */}
          {!isHovered && (
            <p className="text-xs font-black uppercase tracking-widest text-slate-600 animate-pulse">
              Hover to explore details
            </p>
          )}

          {/* Glow Effect */}
          <motion.div
            className={`absolute -inset-1 bg-gradient-to-br ${feature.color} rounded-[32px] blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
