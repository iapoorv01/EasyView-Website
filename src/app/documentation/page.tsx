"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

function Navbar({
  reduceMotion, darkMode, toggleMotion, toggleDark,
}: { reduceMotion: boolean; darkMode: boolean; toggleMotion: () => void; toggleDark: () => void; }) {
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          <img src="/logo.png" alt="EasyView" width={32} height={32} />
          <span>EasyView</span>
        </Link>
        <div className="nav-actions">
          <button onClick={toggleMotion} className="nav-btn">🎬 {reduceMotion ? "Motion On" : "Reduce Motion"}</button>
          <button onClick={toggleDark} className="nav-btn">{darkMode ? "☀️ Light Theme" : "🌙 Dark Theme"}</button>
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
          <p>Have questions or feedback? Reach out at <strong>easyview.support@gmail.com</strong> or <strong>thinktech17@gmail.com</strong> and we will be happy to help.</p>
          <a href="mailto:easyview.support@gmail.com" className="email-btn" target="_blank" rel="noopener noreferrer">Email Support</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Made with ❤️ for neurodivergent accessibility</p>
        <p>© 2026 EasyView. All rights reserved.</p>
      </div>
    </footer>
  );
}

const TOC_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "installation", label: "Installation" },
  { id: "setup", label: "Initial Setup" },
  { id: "reading-mode", label: "Reading Mode" },
  { id: "sensory-shield", label: "Sensory Shield" },
  { id: "tts", label: "Text-to-Speech" },
  { id: "jargon", label: "Jargon Decoder" },
  { id: "permissions", label: "Permissions" },
  { id: "browsers", label: "Browser Support" },
  { id: "troubleshooting", label: "Troubleshooting" },
];

export default function DocumentationPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const [copied, setCopied] = useState<string | null>(null);

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

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 1800);
    });
  };

  const CodeBlock = ({ code, lang = "bash", id }: { code: string; lang?: string; id: string }) => (
    <div className="code-block">
      <div className="code-header">
        <span className="code-lang">{lang}</span>
        <button className="copy-btn" onClick={() => copyCode(code, id)}>
          {copied === id ? "✓ Copied" : "Copy"}
        </button>
      </div>
      <pre><code>{code}</code></pre>
    </div>
  );

  return (
    <div className={`root ${darkMode ? "dark" : ""} ${reduceMotion ? "reduce-motion" : ""}`}>
      <style>{CSS}</style>
      <Navbar darkMode={darkMode} reduceMotion={reduceMotion} toggleDark={() => setDarkMode(!darkMode)} toggleMotion={() => setReduceMotion(!reduceMotion)} />

      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="page-badge">📘 Docs</div>
          <h1 className="page-title">Documentation</h1>
          <p className="page-subtitle">Technical and user guide for the EasyView Chrome Extension. Everything from installation to API internals.</p>
          <div className="hero-meta">
            <span>Version: Manifest V3</span>
            <span>·</span>
            <span>Last updated: March 2026</span>
            <span>·</span>
            <a href="https://github.com/iapoorv01/EasyView" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          </div>
        </div>
      </section>

      <div className="content-layout">
        <aside className="toc">
          <p className="toc-title">Contents</p>
          <ul>
            {TOC_ITEMS.map((item) => (
              <li key={item.id}>
                <button className={`toc-link ${activeSection === item.id ? "active" : ""}`} onClick={() => scrollTo(item.id)}>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main className="main-content">

          {/* Overview */}
          <section id="overview" className="content-section">
            <div className="section-label">Overview</div>
            <h2>What is EasyView?</h2>
            <p>EasyView is a privacy-first Chrome extension that improves web accessibility by reducing cognitive load and improving readability. It is built for neurodivergent users (ADHD, Dyslexia, ASD) and anyone seeking a clearer reading experience.</p>
            <div className="arch-card">
              <div className="arch-row">
                <div className="arch-item"><div className="arch-icon">🧩</div><div><strong>Manifest V3</strong><p>Modern Chrome extension API</p></div></div>
                <div className="arch-arrow">→</div>
                <div className="arch-item"><div className="arch-icon">📄</div><div><strong>Content Scripts</strong><p>Injected into webpages</p></div></div>
                <div className="arch-arrow">→</div>
                <div className="arch-item"><div className="arch-icon">💾</div><div><strong>Local Storage</strong><p>All data stays on device</p></div></div>
              </div>
            </div>
            <div className="info-card">
              <span className="info-icon">🔐</span>
              <div>
                <strong>Privacy by design</strong>
                <p>All processing happens locally in your browser. AI-powered features use your own API key stored on-device. No user data is collected or sent to EasyView servers.</p>
              </div>
            </div>
          </section>

          {/* Installation */}
          <section id="installation" className="content-section">
            <div className="section-label">Getting Started</div>
            <h2>Installation</h2>

            <h3>Chrome Web Store (Recommended)</h3>
            <ol className="steps-list">
              <li><span className="step-num">1</span>Open the Chrome Web Store</li>
              <li><span className="step-num">2</span>Search for <strong>EasyView</strong></li>
              <li><span className="step-num">3</span>Click <strong>Add to Chrome</strong></li>
              <li><span className="step-num">4</span>Confirm the installation when prompted</li>
              <li><span className="step-num">5</span>The EasyView icon will appear in your Chrome toolbar</li>
            </ol>

            <h3>From Source (Developers)</h3>
            <CodeBlock id="clone" lang="bash" code={`git clone https://github.com/iapoorv01/EasyView
cd EasyView`} />
            <ol className="steps-list" style={{ marginTop: 12 }}>
              <li><span className="step-num">1</span>Open Chrome and navigate to <code>chrome://extensions/</code></li>
              <li><span className="step-num">2</span>Enable <strong>Developer Mode</strong> (top right toggle)</li>
              <li><span className="step-num">3</span>Click <strong>Load Unpacked</strong> and select the cloned folder</li>
            </ol>
          </section>

          {/* Setup */}
          <section id="setup" className="content-section">
            <div className="section-label">Configuration</div>
            <h2>Initial Setup</h2>
            <div className="setup-steps">
              {[
                { n: "01", title: "Install the Extension", desc: "Install EasyView from the Chrome Web Store. Setup takes under two minutes." },
                { n: "02", title: "Configure Preferences", desc: "On first launch, EasyView prompts you to configure accessibility preferences and optional AI settings. You can skip this and configure later." },
                { n: "03", title: "Browse with Clarity", desc: "Navigate to any webpage and click the EasyView icon to activate features. All settings are applied in real-time via content scripts." },
              ].map((s) => (
                <div className="setup-step" key={s.n}>
                  <div className="setup-num">STEP {s.n}</div>
                  <div>
                    <strong>{s.title}</strong>
                    <p>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Reading Mode */}
          <section id="reading-mode" className="content-section">
            <div className="section-label">Feature Reference</div>
            <h2>Reading Mode Settings</h2>
            <p>All Reading Mode settings are stored in <code>chrome.storage.local</code> and applied via content script injection.</p>
            <div className="props-table">
              <div className="props-header">
                <span>Property</span><span>Type</span><span>Description</span>
              </div>
              {[
                ["font", "string", "Font family — 'OpenDyslexic', 'Arial', 'Verdana', or system default"],
                ["fontSize", "number", "Font size multiplier (0.8 – 2.0)"],
                ["letterSpacing", "number", "Letter spacing in px (0 – 10)"],
                ["lineHeight", "number", "Line height multiplier (1.0 – 3.0)"],
                ["wordSpacing", "number", "Word spacing in px (0 – 20)"],
                ["bionicReading", "boolean", "Enable/disable bionic reading mode"],
                ["colorOverlay", "string", "Hex color code for overlay, e.g. '#FFF3B0'"],
                ["overlayOpacity", "number", "Overlay opacity (0.0 – 0.5)"],
              ].map(([prop, type, desc]) => (
                <div className="props-row" key={prop}>
                  <code>{prop}</code><span className="type-badge">{type}</span><span>{desc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Sensory Shield */}
          <section id="sensory-shield" className="content-section">
            <div className="section-label">Feature Reference</div>
            <h2>Sensory Shield — Technical Implementation</h2>
            <p>Sensory Shield injects CSS rules and JavaScript overrides to suppress animations, autoplay media, and flashing elements.</p>
            <CodeBlock id="sensory-css" lang="css" code={`/* CSS injected by Sensory Shield */
*, *::before, *::after {
  animation: none !important;
  transition: none !important;
}`} />
            <h3>JavaScript Overrides</h3>
            <ul className="check-list">
              <li>Uses <code>MutationObserver</code> to catch dynamically added elements</li>
              <li>Calls <code>pause()</code> on all <code>HTMLVideoElement</code> and <code>HTMLAudioElement</code> instances</li>
              <li>Overrides <code>setInterval</code> and <code>requestAnimationFrame</code> to prevent re-enabling</li>
            </ul>
          </section>

          {/* TTS */}
          <section id="tts" className="content-section">
            <div className="section-label">Feature Reference</div>
            <h2>Text-to-Speech API</h2>
            <p>Text-to-Speech uses the <code>window.speechSynthesis</code> Web Speech API built into modern browsers.</p>
            <h3>Settings Object</h3>
            <div className="props-table">
              <div className="props-header"><span>Property</span><span>Type</span><span>Description</span></div>
              {[
                ["voice", "SpeechSynthesisVoice", "Selected voice from available system voices"],
                ["rate", "number", "Reading speed (0.5 – 2.0, default: 1.0)"],
                ["pitch", "number", "Pitch adjustment (0.5 – 2.0)"],
                ["highlightWords", "boolean", "Enable/disable word-by-word highlighting"],
              ].map(([p, t, d]) => (
                <div className="props-row" key={p}><code>{p}</code><span className="type-badge">{t}</span><span>{d}</span></div>
              ))}
            </div>
            <h3>Events</h3>
            <ul className="check-list">
              <li><code>onword</code> — Fires on each word boundary, used for highlighting</li>
              <li><code>onend</code> — Fires when reading finishes</li>
              <li><code>onerror</code> — Fires on speech synthesis error</li>
            </ul>
          </section>

          {/* Jargon Decoder */}
          <section id="jargon" className="content-section">
            <div className="section-label">Feature Reference</div>
            <h2>Jargon Decoder</h2>
            <p>The Jargon Decoder sends selected text to an AI model with a prompt instructing it to produce a plain-English explanation.</p>
            <h3>AI Providers</h3>
            <div className="provider-grid">
              <div className="provider-card">
                <div className="provider-name">Google Gemini</div>
                <CodeBlock id="gemini-endpoint" lang="url" code="https://generativelanguage.googleapis.com/v1beta/" />
              </div>
              <div className="provider-card">
                <div className="provider-name">OpenRouter (Gemma 3)</div>
                <CodeBlock id="openrouter-endpoint" lang="url" code="https://openrouter.ai/api/v1/chat/completions" />
              </div>
            </div>
            <h3>Fallback Behaviour</h3>
            <p>If the primary AI provider fails (network error or quota exceeded), EasyView automatically retries with the secondary provider if configured.</p>
            <h3>API Key Storage</h3>
            <CodeBlock id="storage-code" lang="javascript" code={`// Keys stored with Chrome's local storage API
chrome.storage.local.set({ geminiKey: userKey });
// Never transmitted to EasyView servers`} />
          </section>

          {/* Permissions */}
          <section id="permissions" className="content-section">
            <div className="section-label">Security</div>
            <h2>Chrome Permissions</h2>
            <p>EasyView requests the following permissions. Here's exactly why each is needed:</p>
            <div className="permissions-list">
              {[
                { perm: "activeTab", why: "Access to the currently active tab to inject content scripts. Only triggers when you click the extension icon." },
                { perm: "storage", why: "Local storage for persisting user settings and API keys on your device." },
                { perm: "scripting", why: "Ability to inject content scripts into pages to apply font changes, overlays, and sensory effects." },
                { perm: "tts", why: "Optional — used by Text-to-Speech as a fallback on some systems." },
              ].map((p) => (
                <div className="permission-row" key={p.perm}>
                  <code className="perm-badge">{p.perm}</code>
                  <p>{p.why}</p>
                </div>
              ))}
            </div>
            <div className="note-card">EasyView does <strong>not</strong> request permissions to read browsing history, access cookies, or communicate with external servers beyond user-configured AI API endpoints.</div>
          </section>

          {/* Browsers */}
          <section id="browsers" className="content-section">
            <div className="section-label">Compatibility</div>
            <h2>Supported Browsers</h2>
            <div className="browser-grid">
              {[
                { browser: "Google Chrome", version: "v100+", status: "full" },
                { browser: "Microsoft Edge", version: "Chromium-based", status: "compat" },
                { browser: "Brave Browser", version: "Any", status: "compat" },
                { browser: "Other Chromium", version: "Any", status: "partial" },
                { browser: "Firefox", version: "—", status: "none" },
                { browser: "Safari", version: "—", status: "none" },
              ].map((b) => (
                <div className="browser-card" key={b.browser}>
                  <div>
                    <strong>{b.browser}</strong>
                    <span className="browser-ver">{b.version}</span>
                  </div>
                  <span className={`browser-badge ${b.status}`}>
                    {b.status === "full" ? "✓ Fully Supported" : b.status === "compat" ? "✓ Compatible" : b.status === "partial" ? "~ Partial" : "✕ Not Supported"}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Troubleshooting */}
          <section id="troubleshooting" className="content-section">
            <div className="section-label">Help</div>
            <h2>Troubleshooting</h2>
            {[
              {
                q: "Jargon Decoder not working",
                items: ["Ensure you have entered a valid API key in Settings → AI Configuration", "Check that your API key has not exceeded its quota", "Verify your internet connection is active"],
              },
              {
                q: "Text-to-Speech not speaking",
                items: ["Ensure your device volume is not muted", "Try selecting a different voice in TTS settings", "Reload the page and try again"],
              },
              {
                q: "Reading Mode not applying",
                items: ["Some websites use aggressive CSS that may override EasyView styles", "Try using the 'Force Apply' option in Reading Mode settings", "Report the site URL to easyview.support@gmail.com"],
              },
            ].map((faq) => (
              <div className="faq-item" key={faq.q}>
                <h3>{faq.q}</h3>
                <ul className="check-list">
                  {faq.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </section>

          {/* CTA */}
          <section className="cta-section">
            <h2>Open Source & Free</h2>
            <p>EasyView is 100% open source. Contributions, bug reports, and feature requests are welcome.</p>
            <div className="cta-buttons">
              <a href="https://github.com/iapoorv01/EasyView" className="btn-primary" target="_blank" rel="noopener noreferrer">View on GitHub</a>
              <a href="https://chromewebstore.google.com/detail/easyview/fkmaolnondclckcdeeanjophpnhndgkk" className="btn-secondary" target="_blank" rel="noopener noreferrer">Install Extension</a>
            </div>
          </section>

        </main>
      </div>

      <Footer />
    </div>
  );
}

const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .root {
    --bg: #ffffff; --bg2: #f8fafc; --bg3: #f1f5f9; --border: #e2e8f0;
    --text: #1e293b; --text2: #475569; --text3: #64748b;
    --blue: #7c3aed; --blue-light: #f5f3ff; --blue-dark: #6d28d9;
    --green: #7c3aed; --code-bg: #0f172a; --code-text: #e2e8f0;
    font-family: var(--font-body), system-ui, sans-serif;
    background: var(--bg); color: var(--text); min-height: 100vh;
  }
  .root.dark { --bg: #0f172a; --bg2: #1e293b; --bg3: #334155; --border: #334155; --text: #f1f5f9; --text2: #cbd5e1; --text3: #94a3b8; --blue-light: #1e3a5f; }
  .reduce-motion * { animation: none !important; transition: none !important; }

  .navbar { background: var(--bg); border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 100; }
  .nav-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; height: 64px; display: flex; align-items: center; justify-content: space-between; }
  .nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; color: var(--text); font-weight: 700; font-size: 18px; }
  .nav-logo img { border-radius: 8px; }
  .nav-actions { display: flex; gap: 8px; }
  .nav-btn { background: var(--bg2); border: 1px solid var(--border); color: var(--text2); padding: 6px 14px; border-radius: 8px; cursor: pointer; font-size: 13px; }
  .nav-btn:hover { background: var(--bg3); }

  .page-hero { background: linear-gradient(135deg, #fdf4ff 0%, #f5f3ff 50%, #eff6ff 100%); padding: 72px 24px; text-align: center; }
  .dark .page-hero { background: linear-gradient(135deg, #2e1065 0%, #1e1b4b 50%, #0f172a 100%); }
  .page-hero-inner { max-width: 720px; margin: 0 auto; }
  .page-badge { display: inline-block; background: #7c3aed; color: white; font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 20px; letter-spacing: 0.05em; margin-bottom: 16px; text-transform: uppercase; }
  .page-title { font-size: clamp(36px, 5vw, 56px); font-weight: 800; color: var(--text); line-height: 1.1; margin-bottom: 16px; }
  .page-subtitle { font-size: 18px; color: var(--text2); line-height: 1.6; margin-bottom: 20px; }
  .hero-meta { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; font-size: 13px; color: var(--text3); }
  .hero-meta a { color: #7c3aed; text-decoration: none; }

  .content-layout { max-width: 1200px; margin: 0 auto; padding: 48px 24px; display: grid; grid-template-columns: 220px 1fr; gap: 48px; align-items: start; }
  @media (max-width: 768px) { .content-layout { grid-template-columns: 1fr; } .toc { display: none; } }

  .toc { position: sticky; top: 80px; }
  .toc-title { font-size: 11px; font-weight: 700; color: var(--text3); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px; }
  .toc ul { list-style: none; border-left: 2px solid var(--border); }
  .toc-link { display: block; padding: 6px 12px; font-size: 13px; color: var(--text3); background: none; border: none; cursor: pointer; text-align: left; width: 100%; transition: color 0.15s, background 0.15s; line-height: 1.4; }
  .toc-link:hover { color: #7c3aed; background: #f5f3ff; }
  .toc-link.active { color: #7c3aed; font-weight: 600; background: #f5f3ff; border-left: 2px solid #7c3aed; margin-left: -2px; }
  .dark .toc-link.active, .dark .toc-link:hover { background: #2e1065; color: #c4b5fd; }

  .main-content { min-width: 0; }
  .content-section { margin-bottom: 64px; padding-bottom: 64px; border-bottom: 1px solid var(--border); }
  .content-section:last-of-type { border-bottom: none; }
  .section-label { font-size: 11px; font-weight: 700; color: #7c3aed; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px; }
  .content-section h2 { font-size: 28px; font-weight: 700; margin-bottom: 16px; }
  .content-section h3 { font-size: 17px; font-weight: 600; margin: 24px 0 12px; }
  .content-section p { font-size: 15px; color: var(--text2); line-height: 1.7; margin-bottom: 12px; }
  code { font-family: 'Fira Code', 'Cascadia Code', monospace; font-size: 13px; background: var(--bg2); border: 1px solid var(--border); padding: 2px 6px; border-radius: 4px; color: #7c3aed; }

  .info-card { display: flex; gap: 16px; background: var(--blue-light); border: 1px solid #bfdbfe; border-radius: 12px; padding: 20px; margin: 20px 0; }
  .dark .info-card { border-color: #1e40af; }
  .info-icon { font-size: 24px; flex-shrink: 0; }
  .info-card strong { display: block; margin-bottom: 4px; }
  .info-card p { margin: 0; font-size: 14px; }
  .note-card { background: var(--bg2); border-left: 4px solid #7c3aed; border-radius: 0 8px 8px 0; padding: 12px 16px; font-size: 14px; color: var(--text2); margin-top: 16px; line-height: 1.5; }

  .arch-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 24px; margin: 20px 0; }
  .arch-row { display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap; }
  .arch-item { display: flex; align-items: center; gap: 10px; background: var(--bg); border: 1px solid var(--border); border-radius: 10px; padding: 12px 16px; }
  .arch-icon { font-size: 22px; }
  .arch-item strong { display: block; font-size: 14px; }
  .arch-item p { font-size: 12px; color: var(--text3); margin: 0; }
  .arch-arrow { font-size: 20px; color: var(--text3); }

  .code-block { background: var(--code-bg); border-radius: 10px; overflow: hidden; margin: 12px 0; }
  .code-header { display: flex; justify-content: space-between; align-items: center; padding: 8px 14px; background: rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.08); }
  .code-lang { font-size: 11px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; }
  .copy-btn { font-size: 12px; color: #94a3b8; background: none; border: 1px solid rgba(255,255,255,0.15); padding: 3px 10px; border-radius: 5px; cursor: pointer; }
  .copy-btn:hover { color: white; }
  .code-block pre { padding: 16px; overflow-x: auto; }
  .code-block code { background: none; border: none; padding: 0; color: #a5f3fc; font-size: 13px; line-height: 1.6; }

  .props-table { border: 1px solid var(--border); border-radius: 10px; overflow: hidden; margin: 16px 0; }
  .props-header { display: grid; grid-template-columns: 160px 140px 1fr; gap: 0; padding: 10px 16px; background: var(--bg2); font-size: 11px; font-weight: 700; color: var(--text3); text-transform: uppercase; letter-spacing: 0.05em; }
  .props-row { display: grid; grid-template-columns: 160px 140px 1fr; gap: 0; padding: 11px 16px; border-top: 1px solid var(--border); align-items: start; font-size: 14px; }
  .props-row:nth-child(even) { background: var(--bg2); }
  .props-row code { background: none; border: none; padding: 0; font-size: 13px; }
  .type-badge { color: #7c3aed; font-family: monospace; font-size: 12px; }
  .props-row span:last-child { color: var(--text2); }
  @media (max-width: 640px) { .props-header, .props-row { grid-template-columns: 1fr; } }

  .steps-list { list-style: none; display: flex; flex-direction: column; gap: 10px; margin: 12px 0; }
  .steps-list li { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text2); }
  .step-num { background: #7c3aed; color: white; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0; }

  .check-list { list-style: none; display: flex; flex-direction: column; gap: 8px; margin: 12px 0; }
  .check-list li { display: flex; align-items: flex-start; gap: 8px; font-size: 14px; color: var(--text2); line-height: 1.5; }
  .check-list li::before { content: '✓'; color: #059669; font-weight: 700; flex-shrink: 0; margin-top: 1px; }

  .setup-steps { display: flex; flex-direction: column; gap: 16px; margin: 16px 0; }
  .setup-step { display: flex; gap: 16px; background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 20px; }
  .setup-num { font-size: 10px; font-weight: 800; color: #059669; text-transform: uppercase; letter-spacing: 0.1em; flex-shrink: 0; padding-top: 2px; }
  .setup-step strong { display: block; font-size: 15px; margin-bottom: 4px; }
  .setup-step p { font-size: 14px; color: var(--text3); margin: 0; }

  .provider-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 16px 0; }
  @media (max-width: 600px) { .provider-grid { grid-template-columns: 1fr; } }
  .provider-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 16px; }
  .provider-name { font-size: 14px; font-weight: 700; color: #7c3aed; margin-bottom: 10px; }

  .permissions-list { display: flex; flex-direction: column; gap: 10px; margin: 16px 0; }
  .permission-row { display: flex; gap: 14px; align-items: flex-start; background: var(--bg2); border: 1px solid var(--border); border-radius: 8px; padding: 14px; }
  .perm-badge { background: #f5f3ff; border: 1px solid #ddd6fe; color: #6d28d9; padding: 3px 10px; border-radius: 5px; font-size: 13px; flex-shrink: 0; white-space: nowrap; }
  .dark .perm-badge { background: #2e1065; border-color: #6d28d9; color: #c4b5fd; }
  .permission-row p { font-size: 14px; color: var(--text2); margin: 0; line-height: 1.5; }

  .browser-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 10px; margin: 16px 0; }
  .browser-card { display: flex; justify-content: space-between; align-items: center; background: var(--bg2); border: 1px solid var(--border); border-radius: 8px; padding: 12px 14px; }
  .browser-card strong { display: block; font-size: 14px; }
  .browser-ver { font-size: 12px; color: var(--text3); }
  .browser-badge { font-size: 12px; font-weight: 600; padding: 3px 9px; border-radius: 5px; white-space: nowrap; }
  .browser-badge.full { background: #dcfce7; color: #065f46; }
  .browser-badge.compat { background: #dbeafe; color: #1e40af; }
  .browser-badge.partial { background: #fef9c3; color: #92400e; }
  .browser-badge.none { background: #fee2e2; color: #991b1b; }
  .dark .browser-badge.full { background: #052e16; color: #4ade80; }
  .dark .browser-badge.compat { background: #1e3a5f; color: #93c5fd; }
  .dark .browser-badge.partial { background: #422006; color: #fde68a; }
  .dark .browser-badge.none { background: #450a0a; color: #fca5a5; }

  .faq-item { margin-bottom: 24px; }
  .faq-item h3 { font-size: 16px; font-weight: 600; margin-bottom: 10px; }

  .cta-section { background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%); border-radius: 16px; padding: 48px; text-align: center; color: white; margin-top: 32px; }
  .cta-section h2 { font-size: 28px; font-weight: 700; margin-bottom: 12px; }
  .cta-section p { font-size: 16px; opacity: 0.85; margin-bottom: 28px; }
  .cta-buttons { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  .btn-primary { background: white; color: #7c3aed; font-weight: 600; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 15px; }
  .btn-secondary { background: rgba(255,255,255,0.15); color: white; border: 1px solid rgba(255,255,255,0.4); font-weight: 600; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 15px; }

  .footer { background: var(--bg2); border-top: 1px solid var(--border); padding: 48px 24px 24px; }
  .footer-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 2fr; gap: 48px; margin-bottom: 40px; }
  @media (max-width: 768px) { .footer-inner { grid-template-columns: 1fr; gap: 24px; } }
  .footer-brand { display: flex; flex-direction: column; gap: 12px; }
  .footer-brand h3 { font-size: 18px; font-weight: 700; }
  .footer-brand p { font-size: 14px; color: var(--text3); line-height: 1.6; }
  .footer-links h4, .footer-support h4 { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text3); margin-bottom: 12px; }
  .footer-links ul { list-style: none; display: flex; flex-direction: column; gap: 8px; }
  .footer-links a { font-size: 14px; color: var(--text2); text-decoration: none; }
  .footer-links a:hover { color: #7c3aed; }
  .footer-support p { font-size: 14px; color: var(--text3); line-height: 1.5; margin-bottom: 12px; }
  .email-btn { display: inline-block; background: #7c3aed; color: white; font-size: 13px; font-weight: 600; padding: 8px 16px; border-radius: 8px; text-decoration: none; }
  .footer-bottom { max-width: 1200px; margin: 0 auto; border-top: 1px solid var(--border); padding-top: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; }
  .footer-bottom p { font-size: 13px; color: var(--text3); }
`;