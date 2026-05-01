'use client';

import { motion } from 'framer-motion';
import { FileText, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-16 px-6 bg-slate-950 text-white relative overflow-hidden border-t border-white/5">
      {/* Subtle Background Animation */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(139,127,214,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '40px 40px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-16 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <img
                src="/logo.png"
                alt="EasyView logo"
                className="w-10 h-10 object-contain"
              />
              <h3 className="text-2xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent tracking-tighter">
                EasyView
              </h3>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Making the web accessible for everyone through better design and smarter tools.
            </p>
            <div className="mt-8 bg-white/5 rounded-3xl p-3 border border-white/5">
              <div className="grid grid-cols-3 gap-3">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80"
                  alt="Accessible and focused digital reading"
                  className="w-full h-20 object-cover rounded-2xl shadow-lg hover:scale-105 transition-all duration-500"
                />
                <img
                  src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80"
                  alt="Person interacting with a clean and accessible interface"
                  className="w-full h-20 object-cover rounded-2xl shadow-lg hover:scale-105 transition-all duration-500"
                />
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80"
                  alt="Productive and distraction-free workspace"
                  className="w-full h-20 object-cover rounded-2xl shadow-lg hover:scale-105 transition-all duration-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-slate-300">Resources</h4>
            <ul className="space-y-4">
              {[
                { name: 'Accessibility Guide', href: '/accessibility-guide', icon: FileText },
                { name: 'Documentation', href: '/documentation', icon: FileText },
                { name: 'Privacy Policy', href: '/privacy-policy', icon: FileText },
              ].map((link, i) => (
                <li key={i}>
                  <motion.a
                    href={link.href}
                    className="text-slate-500 hover:text-purple-400 transition-colors flex items-center gap-3 font-bold text-xs"
                    whileHover={{ x: 5 }}
                  >
                    <link.icon className="w-4 h-4" />
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-slate-300">Get in Touch</h4>
            <p className="text-slate-500 text-sm mb-6 font-medium leading-relaxed">
              Having trouble? Our team is here to help you get the most out of EasyView.
            </p>
            <motion.a
              href="mailto:easyview.support@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Email Us
            </motion.a>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="pt-10 border-t border-white/5 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-slate-500 font-bold flex items-center justify-center gap-3 flex-wrap mb-4">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-purple-500 fill-purple-500" />
            <span>for better accessibility</span>
          </p>
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} EasyView. All rights reserved.
          </p>

        </motion.div>
      </div>
    </footer>
  );
}
