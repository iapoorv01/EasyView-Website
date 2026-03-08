"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

// ── Shared nav + footer identical to main site ─────────────────────────────
function Navbar({
  reduceMotion,
  darkMode,
  toggleMotion,
  toggleDark,
}: {
  reduceMotion: boolean;
  darkMode: boolean;
  toggleMotion: () => void;
  toggleDark: () => void;
}) {
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          <img src="/logo.png" alt="EasyView" width={32} height={32} />
          <span>EasyView</span>
        </Link>
        <div className="nav-actions">
          <button onClick={toggleMotion} className="nav-btn">
            🎬 {reduceMotion ? "Motion On" : "Reduce Motion"}
          </button>
          <button onClick={toggleDark} className="nav-btn">
            {darkMode ? "☀️ Light Theme" : "🌙 Dark Theme"}
          </button>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src="/logo.png" alt="EasyView" width={36} height={36} />
          <h3>EasyView</h3>
          <p>Making the web accessible for neurodivergent minds through AI-powered features and thoughtful design.</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/accessibility-guide">Accessibility Guide</Link></li>
            <li><Link href="/documentation">Documentation</Link></li>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
          </ul>
        </div>
        <div className="footer-support">
          <h4>Support</h4>
          <p>Have questions or feedback? Reach out at mradulg306@gmail.com and we will be happy to help.</p>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=mradulg306@gmail.com" className="email-btn" target="_blank" rel="noopener noreferrer">Email Support</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Made with ❤️ for neurodivergent accessibility</p>
        <p>© 2026 EasyView. All rights reserved.</p>
      </div>
    </footer>
  );
}

// ── Table of Contents ──────────────────────────────────────────────────────
const TOC_ITEMS = [
  { id: "intro", label: "Introduction" },
  { id: "dyslexia", label: "Dyslexia Reading Mode" },
  { id: "sensory", label: "Sensory Shield" },
  { id: "tts", label: "Text-to-Speech" },
  { id: "jargon", label: "Jargon Decoder" },
  { id: "document-reader", label: "Document Reader" },
  { id: "shortcuts", label: "Keyboard Shortcuts" },
  { id: "standards", label: "WCAG Compliance" },
  { id: "ai-config", label: "AI Configuration" },
];

// ── Main Page ──────────────────────────────────────────────────────────────
export default function AccessibilityGuidePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [activeSection, setActiveSection] = useState("intro");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem("easyview-theme");
    if (storedTheme === "dark") {
      setDarkMode(true);
      return;
    }
    if (storedTheme === "light") {
      setDarkMode(false);
      return;
    }
    setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("easyview-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const onScroll = () => {
      for (const item of [...TOC_ITEMS].reverse()) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top < 120) {
          setActiveSection(item.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <div className={`root ${darkMode ? "dark" : ""} ${reduceMotion ? "reduce-motion" : ""}`}>
      <style>{CSS}</style>
      <Navbar darkMode={darkMode} reduceMotion={reduceMotion} toggleDark={() => setDarkMode(!darkMode)} toggleMotion={() => setReduceMotion(!reduceMotion)} />

      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="page-badge">♿ Accessibility</div>
          <h1 className="page-title">Accessibility Guide</h1>
          <p className="page-subtitle">Everything you need to know to make the web work for your brain — step by step.</p>
          <div className="hero-tags">
            <span className="tag">ADHD Friendly</span>
            <span className="tag">Dyslexia Support</span>
            <span className="tag">ASD Friendly</span>
            <span className="tag">WCAG 2.1 AA</span>
          </div>
        </div>
      </section>

      <div className="content-layout">
        {/* Sticky TOC */}
        <aside className="toc">
          <p className="toc-title">On this page</p>
          <ul>
            {TOC_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  className={`toc-link ${activeSection === item.id ? "active" : ""}`}
                  onClick={() => scrollTo(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main content */}
        <main className="main-content">

          {/* Introduction */}
          <section id="intro" className="content-section">
            <div className="section-label">Overview</div>
            <h2>Introduction</h2>
            <p>EasyView is a privacy-first Chrome extension built specifically to reduce cognitive load and improve readability for neurodivergent users — including those with ADHD, Dyslexia, and ASD. This guide explains all accessibility features, how to use them, and best practices for getting the most out of EasyView.</p>
            <div className="info-card">
              <span className="info-icon">🧠</span>
              <div>
                <strong>Did you know?</strong>
                <p>Over 20% of the global population is neurodivergent. EasyView is designed to ensure every one of these users can browse the web with confidence, comfort, and clarity.</p>
              </div>
            </div>
          </section>

          {/* Dyslexia Reading Mode */}
          <section id="dyslexia" className="content-section">
            <div className="section-label">Feature 1</div>
            <h2>📚 Dyslexia Reading Mode</h2>
            <p>Dyslexia Reading Mode transforms how text appears on any webpage, using fonts, spacing, and overlays specifically designed to make reading easier for dyslexic brains.</p>

            <h3>How to Enable</h3>
            <ol className="steps-list">
              <li><span className="step-num">1</span>Click the EasyView icon in your Chrome toolbar</li>
              <li><span className="step-num">2</span>Select the <strong>Reading Mode</strong> tab</li>
              <li><span className="step-num">3</span>Toggle <strong>Dyslexia Mode</strong> to ON</li>
            </ol>

            <h3>Available Customisations</h3>
            <div className="feature-grid">
              {[
                { icon: "🔤", title: "OpenDyslexic Font", desc: "A typeface designed to reduce letter reversal and confusion" },
                { icon: "↔️", title: "Letter Spacing", desc: "Increase space between characters for better letter separation" },
                { icon: "↕️", title: "Line Height", desc: "Add vertical breathing room between lines of text" },
                { icon: "⬜", title: "Word Spacing", desc: "Control gaps between words for improved word recognition" },
                { icon: "⚡", title: "Bionic Reading", desc: "Bold the start of each word to guide eye movement naturally" },
                { icon: "🎨", title: "Color Overlays", desc: "Soft tinted overlay to reduce glare and visual stress" },
              ].map((f) => (
                <div className="feature-card" key={f.title}>
                  <div className="feature-icon">{f.icon}</div>
                  <div>
                    <strong>{f.title}</strong>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="note-card">💾 All customisations are saved locally on your device and persist across browsing sessions.</div>
          </section>

          {/* Sensory Shield */}
          <section id="sensory" className="content-section">
            <div className="section-label">Feature 2</div>
            <h2>🛡️ Sensory Shield</h2>
            <p>Many websites contain animations, auto-playing videos, and flashing elements that can cause sensory overload — particularly for users with ADHD and ASD. Sensory Shield eliminates these distractions instantly.</p>

            <h3>What Sensory Shield Does</h3>
            <ul className="check-list">
              <li>Stops all CSS animations on the page immediately</li>
              <li>Pauses auto-playing videos and media</li>
              <li>Prevents flashing or rapidly changing visual elements</li>
              <li>Creates a calmer, more controlled browsing environment</li>
            </ul>

            <h3>How to Enable</h3>
            <ol className="steps-list">
              <li><span className="step-num">1</span>Open the EasyView extension panel</li>
              <li><span className="step-num">2</span>Click <strong>Sensory Shield</strong></li>
              <li><span className="step-num">3</span>The shield activates instantly — no page reload required</li>
            </ol>
            <div className="note-card">⚡ Sensory Shield works via content scripts and applies changes directly to the page's CSS, ensuring near-instant results.</div>
          </section>

          {/* TTS */}
          <section id="tts" className="content-section">
            <div className="section-label">Feature 3</div>
            <h2>🔊 Text-to-Speech</h2>
            <p>EasyView's Text-to-Speech feature uses the Web Speech API to read webpage content aloud, supporting users who benefit from auditory processing or who experience reading fatigue.</p>

            <div className="two-col">
              <div>
                <h3>Features</h3>
                <ul className="check-list">
                  <li><strong>Multiple Voices:</strong> Choose from system voices available in your browser</li>
                  <li><strong>Adjustable Speed:</strong> Slow down or speed up reading rate</li>
                  <li><strong>Word Highlighting:</strong> Follow along as each word is spoken</li>
                  <li><strong>Smart Pauses:</strong> Natural pauses at commas and periods</li>
                </ul>
              </div>
              <div>
                <h3>How to Use</h3>
                <ol className="steps-list">
                  <li><span className="step-num">1</span>Select text on any webpage</li>
                  <li><span className="step-num">2</span>Click the TTS button in the EasyView panel</li>
                  <li><span className="step-num">3</span>Adjust speed and voice from settings</li>
                  <li><span className="step-num">4</span>Use pause/resume to control playback</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Jargon Decoder */}
          <section id="jargon" className="content-section">
            <div className="section-label">Feature 4</div>
            <h2>📖 Jargon Decoder</h2>
            <p>Legal documents, medical instructions, financial forms, and technical manuals are notoriously difficult. The Jargon Decoder uses AI to translate complex language into plain English instantly.</p>

            <h3>Supported Content Types</h3>
            <div className="pill-group">
              {["Legal", "Medical", "Financial", "Technical", "Academic"].map((t) => (
                <span className="pill" key={t}>{t}</span>
              ))}
            </div>

            <h3>How to Use</h3>
            <ol className="steps-list">
              <li><span className="step-num">1</span>Select text on a webpage you want simplified</li>
              <li><span className="step-num">2</span>Right-click and choose <strong>Decode with EasyView</strong>, or use the extension panel</li>
              <li><span className="step-num">3</span>A simplified explanation appears in a tooltip or sidebar</li>
              <li><span className="step-num">4</span>Use <strong>Full Page Decode</strong> to simplify an entire page at once</li>
            </ol>

            <div className="info-card">
              <span className="info-icon">🔐</span>
              <div>
                <strong>Privacy First</strong>
                <p>The Jargon Decoder uses Google Gemini or OpenRouter AI. Your API key is stored only on your device — no data is sent to EasyView servers.</p>
              </div>
            </div>
          </section>

          {/* Document Reader */}
          <section id="document-reader" className="content-section">
            <div className="section-label">Feature 5</div>
            <h2>📄 Document Reader</h2>
            <p>EasyView includes a built-in document reader with full accessibility customisation, allowing you to read uploaded documents in a calmer, more accessible environment.</p>
            <ul className="check-list">
              <li>Upload and read documents (PDF, TXT, and more)</li>
              <li>Apply all reading customisations — font, spacing, overlays — to your document</li>
              <li>Export or download the customised document</li>
            </ul>
          </section>

          {/* Keyboard Shortcuts */}
          <section id="shortcuts" className="content-section">
            <div className="section-label">Productivity</div>
            <h2>⌨️ Keyboard Shortcuts</h2>
            <p>EasyView supports keyboard shortcuts to help users who rely on keyboard navigation.</p>
            <div className="shortcuts-table">
              {[
                ["Alt + E", "Open/close the EasyView extension panel"],
                ["Alt + D", "Toggle Dyslexia Reading Mode"],
                ["Alt + S", "Toggle Sensory Shield"],
                ["Alt + T", "Start/Stop Text-to-Speech"],
                ["Alt + J", "Decode selected text with Jargon Decoder"],
              ].map(([key, desc]) => (
                <div className="shortcut-row" key={key}>
                  <kbd>{key}</kbd>
                  <span>{desc}</span>
                </div>
              ))}
            </div>
            <div className="note-card">All shortcuts are customisable in the EasyView settings panel.</div>
          </section>

          {/* Standards */}
          <section id="standards" className="content-section">
            <div className="section-label">Compliance</div>
            <h2>✅ Accessibility Standards</h2>
            <p>EasyView is designed and developed with reference to the following standards:</p>
            <div className="standards-grid">
              {[
                { title: "WCAG 2.1 AA", desc: "Web Content Accessibility Guidelines — Level AA compliance" },
                { title: "WAI-ARIA", desc: "Accessible Rich Internet Applications specifications" },
                { title: "Chrome Extension APIs", desc: "Chrome extension accessibility best practices" },
              ].map((s) => (
                <div className="standard-card" key={s.title}>
                  <div className="standard-check">✓</div>
                  <div>
                    <strong>{s.title}</strong>
                    <p>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p>EasyView's own interface is designed to be usable with screen readers and keyboard-only navigation.</p>
          </section>

          {/* AI Config */}
          <section id="ai-config" className="content-section">
            <div className="section-label">Setup</div>
            <h2>🤖 AI Configuration</h2>
            <p>The Jargon Decoder and AI text simplification features require an AI API key. EasyView supports two providers:</p>
            <div className="two-col">
              <div className="provider-card">
                <div className="provider-name">Google Gemini</div>
                <ol className="steps-list">
                  <li><span className="step-num">1</span>Visit <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer">aistudio.google.com</a></li>
                  <li><span className="step-num">2</span>Generate a free API key</li>
                  <li><span className="step-num">3</span>Enter key in EasyView Settings → AI Configuration</li>
                </ol>
              </div>
              <div className="provider-card">
                <div className="provider-name">OpenRouter (Gemma 3)</div>
                <ol className="steps-list">
                  <li><span className="step-num">1</span>Visit <a href="https://openrouter.ai/" target="_blank" rel="noopener noreferrer">openrouter.ai</a></li>
                  <li><span className="step-num">2</span>Create an account and generate a key</li>
                  <li><span className="step-num">3</span>Enter key in EasyView Settings → AI Configuration</li>
                </ol>
              </div>
            </div>
            <div className="info-card">
              <span className="info-icon">🔒</span>
              <div>
                <strong>Your key stays on your device</strong>
                <p>Your API key is stored exclusively in Chrome's local storage. It is never transmitted to EasyView or any third party.</p>
              </div>
            </div>
          </section>

          {/* Help CTA */}
          <section className="cta-section">
            <h2>Need Help?</h2>
            <p>If a feature isn't working or you have feedback, the team is here to help.</p>
            <div className="cta-buttons">
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=mradulg306@gmail.com" className="btn-primary" target="_blank" rel="noopener noreferrer">Email Support</a>
              <a href="https://github.com/iapoorv01/EasyView" className="btn-secondary" target="_blank" rel="noopener noreferrer">GitHub Issues</a>
            </div>
          </section>

        </main>
      </div>

      <Footer />
    </div>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────
const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .root {
    --bg: #ffffff;
    --bg2: #f8fafc;
    --bg3: #f1f5f9;
    --border: #e2e8f0;
    --text: #1e293b;
    --text2: #475569;
    --text3: #64748b;
    --blue: #7c3aed;
    --blue-light: #f5f3ff;
    --blue-dark: #6d28d9;
    --green: #059669;
    --font: var(--font-body), system-ui, sans-serif;
    font-family: var(--font);
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
  }
  .root.dark {
    --bg: #0f172a;
    --bg2: #1e293b;
    --bg3: #334155;
    --border: #334155;
    --text: #f1f5f9;
    --text2: #cbd5e1;
    --text3: #94a3b8;
    --blue-light: #1e3a5f;
  }
  .reduce-motion * { animation: none !important; transition: none !important; }

  /* Navbar */
  .navbar { background: var(--bg); border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 100; }
  .nav-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; height: 64px; display: flex; align-items: center; justify-content: space-between; }
  .nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; color: var(--text); font-weight: 700; font-size: 18px; }
  .nav-logo img { border-radius: 8px; }
  .nav-actions { display: flex; gap: 8px; }
  .nav-btn { background: var(--bg2); border: 1px solid var(--border); color: var(--text2); padding: 6px 14px; border-radius: 8px; cursor: pointer; font-size: 13px; transition: background 0.15s; }
  .nav-btn:hover { background: var(--bg3); }

  /* Hero */
  .page-hero { background: linear-gradient(135deg, #fdf4ff 0%, #f5f3ff 50%, #eff6ff 100%); padding: 72px 24px; text-align: center; }
  .dark .page-hero { background: linear-gradient(135deg, #2e1065 0%, #1e1b4b 50%, #0f172a 100%); }
  .page-hero-inner { max-width: 720px; margin: 0 auto; }
  .page-badge { display: inline-block; background: var(--blue); color: white; font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 20px; letter-spacing: 0.05em; margin-bottom: 16px; text-transform: uppercase; }
  .page-title { font-size: clamp(36px, 5vw, 56px); font-weight: 800; color: var(--text); line-height: 1.1; margin-bottom: 16px; }
  .page-subtitle { font-size: 18px; color: var(--text2); line-height: 1.6; margin-bottom: 24px; }
  .hero-tags { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }
  .tag { background: white; border: 1px solid var(--border); color: var(--text2); font-size: 13px; padding: 4px 12px; border-radius: 20px; }
  .dark .tag { background: var(--bg2); }

  /* Layout */
  .content-layout { max-width: 1200px; margin: 0 auto; padding: 48px 24px; display: grid; grid-template-columns: 220px 1fr; gap: 48px; align-items: start; }
  @media (max-width: 768px) { .content-layout { grid-template-columns: 1fr; } .toc { display: none; } }

  /* TOC */
  .toc { position: sticky; top: 80px; }
  .toc-title { font-size: 11px; font-weight: 700; color: var(--text3); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px; }
  .toc ul { list-style: none; border-left: 2px solid var(--border); }
  .toc-link { display: block; padding: 6px 12px; font-size: 13px; color: var(--text3); background: none; border: none; cursor: pointer; text-align: left; width: 100%; border-radius: 0 6px 6px 0; transition: color 0.15s, background 0.15s; line-height: 1.4; }
  .toc-link:hover { color: var(--blue); background: var(--blue-light); }
  .toc-link.active { color: var(--blue); font-weight: 600; background: var(--blue-light); border-left: 2px solid var(--blue); margin-left: -2px; }

  /* Content */
  .main-content { min-width: 0; }
  .content-section { margin-bottom: 64px; padding-bottom: 64px; border-bottom: 1px solid var(--border); }
  .content-section:last-of-type { border-bottom: none; }
  .section-label { font-size: 11px; font-weight: 700; color: var(--blue); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px; }
  .content-section h2 { font-size: 28px; font-weight: 700; color: var(--text); margin-bottom: 16px; }
  .content-section h3 { font-size: 17px; font-weight: 600; color: var(--text); margin: 24px 0 12px; }
  .content-section p { font-size: 15px; color: var(--text2); line-height: 1.7; margin-bottom: 12px; }

  /* Cards */
  .info-card { display: flex; gap: 16px; background: var(--blue-light); border: 1px solid #bfdbfe; border-radius: 12px; padding: 20px; margin: 20px 0; }
  .dark .info-card { border-color: #1e40af; }
  .info-icon { font-size: 24px; flex-shrink: 0; }
  .info-card strong { display: block; margin-bottom: 4px; color: var(--text); }
  .info-card p { margin: 0; font-size: 14px; }
  .note-card { background: var(--bg2); border-left: 4px solid var(--blue); border-radius: 0 8px 8px 0; padding: 12px 16px; font-size: 14px; color: var(--text2); margin-top: 16px; }

  /* Feature grid */
  .feature-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px; margin: 16px 0; }
  .feature-card { display: flex; gap: 12px; align-items: flex-start; background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 14px; }
  .feature-icon { font-size: 20px; flex-shrink: 0; }
  .feature-card strong { display: block; font-size: 14px; margin-bottom: 2px; color: var(--text); }
  .feature-card p { font-size: 13px; color: var(--text3); margin: 0; }

  /* Steps list */
  .steps-list { list-style: none; display: flex; flex-direction: column; gap: 10px; margin: 12px 0; }
  .steps-list li { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text2); }
  .step-num { background: var(--blue); color: white; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0; }

  /* Check list */
  .check-list { list-style: none; display: flex; flex-direction: column; gap: 8px; margin: 12px 0; }
  .check-list li { display: flex; align-items: flex-start; gap: 8px; font-size: 14px; color: var(--text2); line-height: 1.5; }
  .check-list li::before { content: '✓'; color: var(--green); font-weight: 700; flex-shrink: 0; margin-top: 1px; }

  /* Shortcuts */
  .shortcuts-table { display: flex; flex-direction: column; gap: 2px; margin: 16px 0; border: 1px solid var(--border); border-radius: 10px; overflow: hidden; }
  .shortcut-row { display: flex; align-items: center; gap: 16px; padding: 12px 16px; background: var(--bg); border-bottom: 1px solid var(--border); }
  .shortcut-row:last-child { border-bottom: none; }
  .shortcut-row:nth-child(even) { background: var(--bg2); }
  kbd { background: var(--bg3); border: 1px solid var(--border); border-radius: 6px; padding: 3px 10px; font-family: monospace; font-size: 13px; color: var(--text); white-space: nowrap; box-shadow: 0 1px 0 var(--border); }
  .shortcut-row span { font-size: 14px; color: var(--text2); }

  /* Standards */
  .standards-grid { display: flex; flex-direction: column; gap: 10px; margin: 16px 0; }
  .standard-card { display: flex; gap: 14px; align-items: flex-start; background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 16px; }
  .standard-check { background: #dcfce7; color: #16a34a; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0; font-size: 14px; }
  .dark .standard-check { background: #14532d; color: #4ade80; }
  .standard-card strong { display: block; font-size: 15px; margin-bottom: 2px; }
  .standard-card p { font-size: 13px; color: var(--text3); margin: 0; }

  /* Two col */
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 16px 0; }
  @media (max-width: 600px) { .two-col { grid-template-columns: 1fr; } }

  /* Provider card */
  .provider-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 20px; }
  .provider-name { font-size: 15px; font-weight: 700; color: var(--blue); margin-bottom: 14px; }

  /* Pills */
  .pill-group { display: flex; gap: 8px; flex-wrap: wrap; margin: 12px 0; }
  .pill { background: var(--blue-light); color: var(--blue); border: 1px solid #bfdbfe; font-size: 13px; font-weight: 600; padding: 4px 14px; border-radius: 20px; }
  .dark .pill { border-color: #1e40af; }

  /* CTA */
  .cta-section { background: linear-gradient(135deg, var(--blue) 0%, #ec4899 100%); border-radius: 16px; padding: 48px; text-align: center; color: white; margin-top: 32px; }
  .cta-section h2 { font-size: 28px; font-weight: 700; margin-bottom: 12px; }
  .cta-section p { font-size: 16px; opacity: 0.85; margin-bottom: 28px; }
  .cta-buttons { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  .btn-primary { background: white; color: var(--blue); font-weight: 600; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 15px; transition: opacity 0.15s; }
  .btn-primary:hover { opacity: 0.9; }
  .btn-secondary { background: rgba(255,255,255,0.15); color: white; border: 1px solid rgba(255,255,255,0.4); font-weight: 600; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 15px; transition: background 0.15s; }
  .btn-secondary:hover { background: rgba(255,255,255,0.25); }

  /* Links */
  a { color: var(--blue); }
  a:hover { text-decoration: underline; }

  /* Footer */
  .footer { background: var(--bg2); border-top: 1px solid var(--border); padding: 48px 24px 24px; }
  .footer-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 2fr; gap: 48px; margin-bottom: 40px; }
  @media (max-width: 768px) { .footer-inner { grid-template-columns: 1fr; gap: 24px; } }
  .footer-brand { display: flex; flex-direction: column; gap: 12px; }
  .footer-brand h3 { font-size: 18px; font-weight: 700; }
  .footer-brand p { font-size: 14px; color: var(--text3); line-height: 1.6; }
  .footer-links h4, .footer-support h4 { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text3); margin-bottom: 12px; }
  .footer-links ul { list-style: none; display: flex; flex-direction: column; gap: 8px; }
  .footer-links a { font-size: 14px; color: var(--text2); text-decoration: none; }
  .footer-links a:hover { color: var(--blue); }
  .footer-support p { font-size: 14px; color: var(--text3); line-height: 1.5; margin-bottom: 12px; }
  .email-btn { display: inline-block; background: var(--blue); color: white; font-size: 13px; font-weight: 600; padding: 8px 16px; border-radius: 8px; text-decoration: none; }
  .footer-bottom { max-width: 1200px; margin: 0 auto; border-top: 1px solid var(--border); padding-top: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; }
  .footer-bottom p { font-size: 13px; color: var(--text3); }
`;