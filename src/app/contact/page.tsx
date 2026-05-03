'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, User, Send, GraduationCap, Sparkles } from 'lucide-react';
import Footer from '@/components/Footer';
import FloatingParticles from '@/components/FloatingParticles';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function ContactPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Feedback');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const contactDetails = [
    {
      icon: User,
      label: 'Student Founder',
      value: 'Apoorv Gupta',
      link: 'https://www.linkedin.com/in/-apoorv-/',
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10 border-indigo-500/20'
    },
    {
      icon: Mail,
      label: 'Direct Email',
      value: 'easyview.support@gmail.com',
      link: 'mailto:easyview.support@gmail.com',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      icon: Phone,
      label: 'Phone Support',
      value: '+91 96169 28911',
      link: 'tel:+919616928911',
      color: 'text-orange-400',
      bg: 'bg-orange-500/10 border-orange-500/20'
    },
    {
      icon: MapPin,
      label: 'HQ Address',
      value: 'Moh. Daulatpur, Misrikh\nSitapur, Uttar Pradesh\n261401, India',
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/20'
    }
  ];

  return (
    <main className="min-h-screen bg-[#06080f] flex flex-col relative overflow-hidden font-sans">
      <FloatingParticles />

      {/* Dynamic Background Glows */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px] pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.7, 0.5] }} transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      />

      <div className="flex-1 max-w-7xl w-full mx-auto px-6 py-28 sm:py-36 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-full mb-8 shadow-[0_0_30px_rgba(99,102,241,0.15)]">
            <GraduationCap className="w-5 h-5 text-indigo-400" />
            <span className="text-indigo-300 text-sm font-bold tracking-wide">A Student-Led Initiative</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-6">
            Let&apos;s build a more <br className="hidden sm:block" />
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">accessible web.</span>
              <motion.span className="absolute bottom-2 left-0 w-full h-3 bg-indigo-500/30 -z-10 rounded-full" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 0.8 }} />
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Have a question, feedback, or want to collaborate? I&apos;m currently a student founder building EasyView to help millions read better.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-center">
          {/* Left: Contact Info Cards */}
          <div className="lg:col-span-2 space-y-4">
            {contactDetails.map((detail, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="relative overflow-hidden group bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 transition-all hover:border-white/20 hover:shadow-2xl hover:shadow-indigo-500/10"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 flex items-start gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border shadow-inner ${detail.bg}`}>
                    <detail.icon className={`w-6 h-6 ${detail.color}`} />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1.5">{detail.label}</h3>
                    {detail.link ? (
                      <a href={detail.link} target={detail.link.startsWith('http') ? '_blank' : undefined} rel={detail.link.startsWith('http') ? 'noopener noreferrer' : undefined} className="text-lg text-white font-bold hover:text-indigo-300 transition-colors">
                        {detail.value}
                      </a>
                    ) : (
                      <p className="text-lg text-white font-bold whitespace-pre-line leading-snug">
                        {detail.value}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Glassmorphic Form with Visuals */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-3 relative"
          >
            {/* Decorative overlay graphic */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-3xl font-black text-white tracking-tight mb-2">Send a Message</h3>
                  <p className="text-slate-400 font-medium">Feedback, bug reports, or general inquiries.</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                  <Sparkles className="w-6 h-6 text-indigo-400 animate-pulse" />
                </div>
              </div>

              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">Message Sent!</h4>
                  <p className="text-slate-400">Thanks for reaching out. As a student founder, I read every single message and will get back to you soon.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-8 px-6 py-2 bg-white/5 border border-white/10 rounded-xl text-white font-semibold hover:bg-white/10 transition-all">Send another</button>
                </motion.div>
              ) : (
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  setLoading(true);

                  const { data: sessionData } = await supabase.auth.getSession();
                  const userId = sessionData?.session?.user?.id || null;

                  const fullMessage = `Name: ${firstName} ${lastName}\n\n${message}`;

                  const { error } = await supabase.from('feedback').insert({
                    email: email,
                    category: category,
                    message: fullMessage,
                    user_id: userId
                  });

                  setLoading(false);
                  if (error) {
                    alert('Error sending message: ' + error.message);
                  } else {
                    setSubmitted(true);
                    setFirstName('');
                    setLastName('');
                    setMessage('');
                  }
                }} className="space-y-6 relative z-10">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-2">First Name</label>
                      <input type="text" maxLength={50} value={firstName} onChange={e => setFirstName(e.target.value)} required placeholder="John" className="w-full px-5 py-4 bg-slate-950/50 border border-white/5 rounded-2xl text-white outline-none focus:border-indigo-500 focus:bg-slate-900 transition-all placeholder:text-slate-600 focus:ring-4 focus:ring-indigo-500/10" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-2">Last Name</label>
                      <input type="text" maxLength={50} value={lastName} onChange={e => setLastName(e.target.value)} required placeholder="Doe" className="w-full px-5 py-4 bg-slate-950/50 border border-white/5 rounded-2xl text-white outline-none focus:border-indigo-500 focus:bg-slate-900 transition-all placeholder:text-slate-600 focus:ring-4 focus:ring-indigo-500/10" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-2">Email Address</label>
                      <input type="email" maxLength={100} value={email} onChange={e => setEmail(e.target.value)} required placeholder="john@example.com" className="w-full px-5 py-4 bg-slate-950/50 border border-white/5 rounded-2xl text-white outline-none focus:border-indigo-500 focus:bg-slate-900 transition-all placeholder:text-slate-600 focus:ring-4 focus:ring-indigo-500/10" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-2">Category</label>
                      <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-5 py-4 bg-slate-950/50 border border-white/5 rounded-2xl text-white outline-none focus:border-indigo-500 focus:bg-slate-900 transition-all focus:ring-4 focus:ring-indigo-500/10 appearance-none">
                        <option value="Feedback" className="bg-slate-900 text-white">Feature Feedback</option>
                        <option value="Bug Report" className="bg-slate-900 text-white">Bug Report</option>
                        <option value="General Inquiry" className="bg-slate-900 text-white">General Inquiry</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-2">Your Message</label>
                    <textarea required maxLength={2000} value={message} onChange={e => setMessage(e.target.value)} rows={5} placeholder="How can we help you?" className="w-full px-5 py-4 bg-slate-950/50 border border-white/5 rounded-2xl text-white outline-none focus:border-indigo-500 focus:bg-slate-900 transition-all placeholder:text-slate-600 focus:ring-4 focus:ring-indigo-500/10 resize-none" />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="w-full py-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-lg font-bold rounded-2xl shadow-xl shadow-indigo-500/25 transition-all flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    {loading ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
