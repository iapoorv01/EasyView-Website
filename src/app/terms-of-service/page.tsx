'use client';

import { motion } from 'framer-motion';
import {
  ShieldCheck,
  BookOpen,
  Settings,
  Lock,
  AlertTriangle,
  CreditCard,
  Info,
  Mail,
  GraduationCap
} from 'lucide-react';
import Footer from '@/components/Footer';

export default function TermsOfService() {
  const sections = [
    { id: 'introduction', icon: BookOpen, title: '1. Introduction', content: 'Welcome to EasyView. By using our website and browser extension, you agree to these Terms of Service. Please read them carefully. EasyView is a product developed by EasyView-Team (ThinkTech).' },
    { id: 'acceptance', icon: ShieldCheck, title: '2. Acceptance of Terms', content: 'By accessing or using EasyView, you represent that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use the Service.' },
    { id: 'description', icon: Settings, title: '3. Description of Service', content: 'EasyView provides an AI-powered browser extension designed to enhance reading accessibility for neurodivergent users by modifying webpage typography, providing AI summaries, and neutralizing motion. The specific features may change, update, or be removed over time without prior notice.' },
    { id: 'privacy', icon: Lock, title: '4. Privacy Policy', content: 'We respect your privacy. EasyView performs all core modifications locally on your device. We do not track your browsing history or sell your personal data. By using EasyView, you also agree to our Privacy Policy, which outlines our data collection and processing practices.' },
    { id: 'conduct', icon: AlertTriangle, title: '5. User Conduct', content: 'You agree not to misuse the EasyView extension or website. This includes attempting to reverse engineer the extension, interfering with our servers, or using our AI API endpoints for unauthorized third-party purposes.' },
    { id: 'subscriptions', icon: CreditCard, title: '6. Subscriptions and Payments', content: 'Certain advanced features of EasyView (e.g., unlimited AI queries, advanced sensory shields) require a premium subscription. All payments are processed securely. We reserve the right to modify our pricing structure with prior notice to active subscribers.' },
    { id: 'disclaimer', icon: Info, title: '7. Disclaimer of Warranties', content: 'EasyView is provided "as is" without any warranties of any kind. While we strive to make the web accessible, we cannot guarantee that the extension will perfectly modify every single webpage on the internet due to the dynamic nature of web development.' },
  ];

  return (
    <main className="min-h-screen bg-[#06080f] flex flex-col relative font-sans selection:bg-indigo-500/30">
      {/* Abstract Backgrounds */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-indigo-900/20 via-purple-900/10 to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="flex-1 max-w-7xl mx-auto px-6 py-24 sm:py-32 w-full relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">

        {/* Left: Sticky Header & Sidebar */}
        <div className="lg:sticky lg:top-32 lg:w-1/3 shrink-0">
          <motion.div
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-full mb-6 shadow-lg shadow-blue-500/5">
              <GraduationCap className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 text-[10px] font-black uppercase tracking-[0.2em]">Student-Led Project</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 leading-tight">
              Terms of <br className="hidden lg:block" /> Service
            </h1>

            <p className="text-slate-400 text-sm font-medium mb-12">
              Last Updated: May 2026
            </p>

            <div className="hidden lg:flex flex-col gap-3">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Contents</h4>
              {sections.map((s, i) => (
                <a key={i} href={`#${s.id}`} className="text-sm font-bold text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-3 group">
                  <span className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10 transition-all">
                    <s.icon className="w-3 h-3 text-slate-500 group-hover:text-indigo-400" />
                  </span>
                  {s.title}
                </a>
              ))}
              <a href="#contact" className="text-sm font-bold text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-3 group mt-2">
                <span className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10 transition-all">
                  <Mail className="w-3 h-3 text-slate-500 group-hover:text-indigo-400" />
                </span>
                8. Contact Info
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right: Content Feed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 max-w-3xl space-y-12"
        >
          {sections.map((section, i) => (
            <div key={i} id={section.id} className="scroll-mt-32 group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center shadow-lg group-hover:border-indigo-500/30 group-hover:bg-indigo-500/5 transition-all">
                  <section.icon className="w-5 h-5 text-indigo-400" />
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight">{section.title}</h2>
              </div>
              <p className="text-slate-400 leading-relaxed font-medium pl-16 text-lg">
                {section.content}
              </p>
            </div>
          ))}

          {/* Special Emphasized Contact Section */}
          <div id="contact" className="scroll-mt-32 mt-20 relative overflow-hidden bg-gradient-to-br from-indigo-900/40 to-slate-900/60 backdrop-blur-xl border border-indigo-500/20 rounded-[32px] p-8 md:p-10 shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500" />

            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shadow-lg">
                <Mail className="w-5 h-5 text-indigo-300" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight mb-1">8. Contact Information</h2>
                <p className="text-indigo-200 text-sm font-medium">For official inquiries and audits.</p>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed font-medium mb-6">
              If you have any questions or concerns regarding these Terms of Service, please contact us directly. We are a student-led team dedicated to transparency.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-slate-950/50 rounded-2xl p-4 border border-white/5">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Email</p>
                <a href="mailto:easyview.support@gmail.com" className="text-indigo-400 hover:text-indigo-300 font-bold">easyview.support@gmail.com</a>
              </div>
              <div className="bg-slate-950/50 rounded-2xl p-4 border border-white/5">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Phone</p>
                <p className="text-white font-bold">+91 96169 28911</p>
              </div>
              <div className="bg-slate-950/50 rounded-2xl p-4 border border-white/5">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Student Founder</p>
                <a href="https://www.linkedin.com/in/-apoorv-/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 font-bold">Apoorv Gupta</a>
              </div>
              <div className="bg-slate-950/50 rounded-2xl p-4 border border-white/5">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Company</p>
                <p className="text-white font-bold">EasyView-Team (ThinkTech)</p>
              </div>
              <div className="sm:col-span-2 bg-slate-950/50 rounded-2xl p-4 border border-white/5">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">HQ Address</p>
                <p className="text-white font-bold">Moh. Daulatpur, Misrikh, Sitapur, Uttar Pradesh - 261401, India</p>
              </div>
            </div>
          </div>

        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
