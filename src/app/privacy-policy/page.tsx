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

const TOC_ITEMS = [
  { id: "intro", label: "Introduction" },
  { id: "not-collected", label: "What We Don't Collect" },
  { id: "local-storage", label: "Local Storage" },
  { id: "ai-usage", label: "AI API Usage" },
  { id: "permissions", label: "Permissions Explained" },
  { id: "children", label: "Children's Privacy" },
  { id: "security", label: "Data Security" },
  { id: "rights", label: "Your Rights" },
  { id: "open-source", label: "Open Source" },
  { id: "changes", label: "Policy Changes" },
  { id: "contact", label: "Contact" },
];

export default function PrivacyPolicyPage() {
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
          <div className="page-badge">🔐 Privacy</div>
          <h1 className="page-title">Privacy Policy</h1>
          <p className="page-subtitle">Your privacy is our foundation. EasyView is built from the ground up to collect zero data about you.</p>
          <div className="hero-stats">
            <div className="stat"><div className="stat-val">0</div><div className="stat-label">Data collected</div></div>
            <div className="stat-divider" />
            <div className="stat"><div className="stat-val">0</div><div className="stat-label">Servers storing your data</div></div>
            <div className="stat-divider" />
            <div className="stat"><div className="stat-val">100%</div><div className="stat-label">On-device storage</div></div>
          </div>
          <p className="hero-date">Last Updated: March 2026</p>
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

          {/* Introduction */}
          <section id="intro" className="content-section">
            <div className="section-label">Overview</div>
            <h2>Introduction</h2>
            <p>EasyView ("we", "our", or "the extension") is a Chrome browser extension designed to improve web accessibility for neurodivergent users. This Privacy Policy explains what information EasyView does and does not collect, how it works, and your rights as a user.</p>
            <div className="highlight-box">
              <div className="highlight-icon">🔒</div>
              <div>
                <strong>The short version</strong>
                <p>EasyView collects <em>nothing</em> about you. No telemetry. No analytics. No personal data. Zero data is collected from you.</p>
              </div>
            </div>
          </section>

          {/* Not collected */}
          <section id="not-collected" className="content-section">
            <div className="section-label">Data Practices</div>
            <h2>Information We Do NOT Collect</h2>
            <p>EasyView does not collect any of the following:</p>
            <div className="no-list">
              {[
                "Personal identifiable information (name, email, age, location)",
                "Browsing history or the URLs you visit",
                "The content of webpages you view",
                "The text you select or decode using the Jargon Decoder",
                "Your AI API keys",
                "Usage statistics, analytics, or telemetry",
                "Device identifiers or IP addresses",
                "Cookies or cross-site tracking data",
              ].map((item) => (
                <div className="no-item" key={item}>
                  <span className="no-icon">✕</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="note-card">We have no backend server that receives data from the extension during normal use.</div>
          </section>

          {/* Local storage */}
          <section id="local-storage" className="content-section">
            <div className="section-label">On-Device Data</div>
            <h2>Information Stored Locally on Your Device</h2>
            <p>EasyView stores the following data locally on your device using Chrome's built-in <code>chrome.storage.local</code> API. This data never leaves your device unless you explicitly choose to share it.</p>

            <h3>User Preferences</h3>
            <ul className="check-list">
              <li>Reading Mode settings (font, spacing, overlays, bionic reading)</li>
              <li>Sensory Shield on/off state</li>
              <li>Text-to-Speech settings (voice, speed, pitch)</li>
              <li>Theme and display preferences (dark mode, reduce motion)</li>
            </ul>

            <h3>AI API Keys (Optional)</h3>
            <p>If you choose to use AI-powered features, you must provide your own API key. This key is:</p>
            <ul className="check-list">
              <li>Stored only in Chrome's local storage on your device</li>
              <li>Never transmitted to EasyView or any EasyView-controlled server</li>
              <li>Used only to make direct API calls from your browser to Google or OpenRouter</li>
            </ul>
            <div className="info-card">
              <span className="info-icon">💡</span>
              <div>
                <strong>How to delete your API key</strong>
                <p>Go to EasyView Settings → AI Configuration → Remove Key. You can also uninstall the extension to remove all locally stored data.</p>
              </div>
            </div>
          </section>

          {/* AI Usage */}
          <section id="ai-usage" className="content-section">
            <div className="section-label">Third Parties</div>
            <h2>AI API Usage & Third Parties</h2>
            <p>When you use the Jargon Decoder or AI simplification features, your browser makes a direct API call to your configured AI provider. This call includes the text you selected and your API key — sent directly from your browser to the provider, not via EasyView.</p>

            <div className="flow-diagram">
              <div className="flow-node">Your Browser</div>
              <div className="flow-arrow">→ direct API call →</div>
              <div className="flow-node highlight">Google Gemini / OpenRouter</div>
              <div className="flow-cross">✕ EasyView servers</div>
            </div>

            <h3>Third-Party Privacy Policies</h3>
            <div className="third-party-grid">
              <a href="https://policies.google.com/privacy" className="third-party-card" target="_blank" rel="noopener noreferrer">
                <strong>Google Gemini API</strong>
                <p>policies.google.com/privacy ↗</p>
              </a>
              <a href="https://openrouter.ai/privacy" className="third-party-card" target="_blank" rel="noopener noreferrer">
                <strong>OpenRouter</strong>
                <p>openrouter.ai/privacy ↗</p>
              </a>
            </div>
            <div className="note-card">We recommend reviewing these policies before configuring an AI provider.</div>
          </section>

          {/* Permissions */}
          <section id="permissions" className="content-section">
            <div className="section-label">Transparency</div>
            <h2>Chrome Permissions Explained</h2>
            <p>EasyView requests only the minimum permissions needed to function. Here's exactly why each permission is required:</p>
            <div className="perm-list">
              {[
                { perm: "activeTab", color: "blue", why: "Required to inject accessibility scripts (reading mode, sensory shield, TTS) into the page you are currently viewing. EasyView only accesses the active tab when you click the extension icon." },
                { perm: "storage", color: "purple", why: "Required to save your accessibility preferences and optional AI key locally on your device so your settings persist between browser sessions." },
                { perm: "scripting", color: "green", why: "Required to inject content scripts into pages — this is how EasyView applies font changes, overlays, and sensory shield effects to webpages." },
              ].map((p) => (
                <div className="perm-item" key={p.perm}>
                  <div className="perm-header">
                    <code className={`perm-badge ${p.color}`}>{p.perm}</code>
                  </div>
                  <p>{p.why}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Children */}
          <section id="children" className="content-section">
            <div className="section-label">Safety</div>
            <h2>Children's Privacy</h2>
            <p>EasyView is suitable for users of all ages, including children. Because we do not collect any personal data from any user, there are no special concerns regarding children's data.</p>
            <div className="highlight-box">
              <div className="highlight-icon">👶</div>
              <div>
                <strong>COPPA Compliant by Design</strong>
                <p>EasyView complies with the Children's Online Privacy Protection Act (COPPA) by design — we collect nothing from any user, regardless of age.</p>
              </div>
            </div>
          </section>

          {/* Security */}
          <section id="security" className="content-section">
            <div className="section-label">Protection</div>
            <h2>Data Security</h2>
            <p>Since EasyView does not transmit or store your data on any server, the primary security consideration is your own device security. Your AI API keys are stored in Chrome's local storage, which is sandboxed to the EasyView extension and not accessible by websites or other extensions.</p>
            <h3>Our Recommendations</h3>
            <ul className="check-list">
              <li>Use a unique API key for EasyView rather than sharing one key across multiple applications</li>
              <li>Revoke and regenerate your API key if you believe it has been compromised</li>
              <li>Keep your Chrome browser updated to the latest version</li>
            </ul>
          </section>

          {/* Rights */}
          <section id="rights" className="content-section">
            <div className="section-label">Your Control</div>
            <h2>Your Rights</h2>
            <p>Because EasyView does not collect personal data, there is no data held by us about you. However, you have the following controls:</p>
            <div className="rights-grid">
              {[
                { icon: "🗑️", title: "Delete Local Settings", desc: "Go to Chrome Settings → Extensions → EasyView → Clear Data" },
                { icon: "🔑", title: "Remove API Key", desc: "EasyView Settings → AI Configuration → Remove Key" },
                { icon: "🚫", title: "Uninstall", desc: "Uninstalling the extension removes all locally stored EasyView data" },
              ].map((r) => (
                <div className="right-card" key={r.title}>
                  <div className="right-icon">{r.icon}</div>
                  <div>
                    <strong>{r.title}</strong>
                    <p>{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="legal-note">
              <strong>GDPR / UK GDPR / CCPA</strong>
              <p>If you are in the European Economic Area, United Kingdom, or California, you may have additional rights under applicable law. Since we hold no personal data, these rights are satisfied by design — there is nothing we could provide, rectify, or delete on our end.</p>
            </div>
          </section>

          {/* Open Source */}
          <section id="open-source" className="content-section">
            <div className="section-label">Transparency</div>
            <h2>Open Source Transparency</h2>
            <p>EasyView is fully open source. You can inspect the complete source code to verify exactly how the extension operates and confirm this Privacy Policy is accurate.</p>
            <div className="highlight-box">
              <div className="highlight-icon">💻</div>
              <div>
                <strong>Verify it yourself</strong>
                <p>The full source code is available on GitHub. We believe code transparency is the strongest form of privacy protection.</p>
                <a href="https://github.com/iapoorv01/EasyView" className="gh-link" target="_blank" rel="noopener noreferrer">View source on GitHub ↗</a>
              </div>
            </div>
          </section>

          {/* Changes */}
          <section id="changes" className="content-section">
            <div className="section-label">Updates</div>
            <h2>Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Any changes will be reflected with an updated "Last Updated" date at the top of this document and on the EasyView website.</p>
            <div className="note-card">
              <strong>Our commitment:</strong> We will never introduce data collection without clearly disclosing it in an updated policy. Continued use of EasyView after changes constitutes acceptance of the updated policy.
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="content-section">
            <div className="section-label">Get in Touch</div>
            <h2>Contact</h2>
            <p>If you have any questions about this Privacy Policy or EasyView's data practices, please reach out:</p>
            <div className="contact-grid">
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=mradulg306@gmail.com" className="contact-card" target="_blank" rel="noopener noreferrer">
                <div className="contact-icon">✉️</div>
                <div>
                  <strong>Email</strong>
                  <p>mradulg306@gmail.com</p>
                </div>
              </a>
              <a href="https://github.com/iapoorv01/EasyView/issues" className="contact-card" target="_blank" rel="noopener noreferrer">
                <div className="contact-icon">🐛</div>
                <div>
                  <strong>GitHub Issues</strong>
                  <p>github.com/iapoorv01/EasyView</p>
                </div>
              </a>
              <a href="https://easyview.vercel.app/" className="contact-card" target="_blank" rel="noopener noreferrer">
                <div className="contact-icon">🌐</div>
                <div>
                  <strong>Website</strong>
                  <p>easyview.vercel.app</p>
                </div>
              </a>
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
    --blue: #2563eb; --blue-light: #eff6ff;
    --purple: #7c3aed; --green: #059669;
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

  .page-hero { background: linear-gradient(135deg, #fdf4ff 0%, #f5f3ff 50%, #eff6ff 100%); padding: 72px 24px 48px; text-align: center; }
  .dark .page-hero { background: linear-gradient(135deg, #2e1065 0%, #1e1b4b 50%, #0f172a 100%); }
  .page-hero-inner { max-width: 720px; margin: 0 auto; }
  .page-badge { display: inline-block; background: #7c3aed; color: white; font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 20px; letter-spacing: 0.05em; margin-bottom: 16px; text-transform: uppercase; }
  .page-title { font-size: clamp(36px, 5vw, 56px); font-weight: 800; color: var(--text); line-height: 1.1; margin-bottom: 16px; }
  .page-subtitle { font-size: 18px; color: var(--text2); line-height: 1.6; margin-bottom: 32px; }
  .hero-stats { display: flex; align-items: center; justify-content: center; gap: 0; background: white; border: 1px solid var(--border); border-radius: 16px; padding: 20px 32px; margin-bottom: 20px; flex-wrap: wrap; gap: 0; }
  .dark .hero-stats { background: var(--bg2); }
  .stat { text-align: center; padding: 0 28px; }
  .stat-val { font-size: 32px; font-weight: 800; color: #7c3aed; }
  .stat-label { font-size: 12px; color: var(--text3); margin-top: 2px; }
  .stat-divider { width: 1px; height: 48px; background: var(--border); }
  .hero-date { font-size: 13px; color: var(--text3); }

  .content-layout { max-width: 1200px; margin: 0 auto; padding: 48px 24px; display: grid; grid-template-columns: 220px 1fr; gap: 48px; align-items: start; }
  @media (max-width: 768px) { .content-layout { grid-template-columns: 1fr; } .toc { display: none; } }

  .toc { position: sticky; top: 80px; }
  .toc-title { font-size: 11px; font-weight: 700; color: var(--text3); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px; }
  .toc ul { list-style: none; border-left: 2px solid var(--border); }
  .toc-link { display: block; padding: 6px 12px; font-size: 13px; color: var(--text3); background: none; border: none; cursor: pointer; text-align: left; width: 100%; transition: color 0.15s, background 0.15s; line-height: 1.4; }
  .toc-link:hover { color: #7c3aed; background: #fdf4ff; }
  .toc-link.active { color: #7c3aed; font-weight: 600; background: #fdf4ff; border-left: 2px solid #7c3aed; margin-left: -2px; }
  .dark .toc-link.active, .dark .toc-link:hover { background: #2e1065; color: #c4b5fd; }

  .main-content { min-width: 0; }
  .content-section { margin-bottom: 64px; padding-bottom: 64px; border-bottom: 1px solid var(--border); }
  .content-section:last-of-type { border-bottom: none; }
  .section-label { font-size: 11px; font-weight: 700; color: #7c3aed; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px; }
  .content-section h2 { font-size: 28px; font-weight: 700; margin-bottom: 16px; }
  .content-section h3 { font-size: 17px; font-weight: 600; margin: 24px 0 12px; }
  .content-section p { font-size: 15px; color: var(--text2); line-height: 1.7; margin-bottom: 12px; }
  code { font-family: monospace; font-size: 13px; background: var(--bg2); border: 1px solid var(--border); padding: 2px 6px; border-radius: 4px; color: #7c3aed; }

  .highlight-box { display: flex; gap: 16px; background: #fdf4ff; border: 1px solid #e9d5ff; border-radius: 12px; padding: 20px; margin: 20px 0; }
  .dark .highlight-box { background: #2e1065; border-color: #6d28d9; }
  .highlight-icon { font-size: 28px; flex-shrink: 0; }
  .highlight-box strong { display: block; margin-bottom: 4px; font-size: 16px; }
  .highlight-box p { margin: 0; font-size: 14px; color: var(--text2); }
  .gh-link { display: inline-block; margin-top: 10px; color: #7c3aed; font-weight: 600; font-size: 14px; text-decoration: none; }
  .gh-link:hover { text-decoration: underline; }

  .info-card { display: flex; gap: 16px; background: var(--blue-light); border: 1px solid #bfdbfe; border-radius: 12px; padding: 20px; margin: 20px 0; }
  .dark .info-card { border-color: #1e40af; }
  .info-icon { font-size: 24px; flex-shrink: 0; }
  .info-card strong { display: block; margin-bottom: 4px; }
  .info-card p { margin: 0; font-size: 14px; color: var(--text2); }
  .note-card { background: var(--bg2); border-left: 4px solid #7c3aed; border-radius: 0 8px 8px 0; padding: 12px 16px; font-size: 14px; color: var(--text2); margin-top: 16px; line-height: 1.5; }

  .no-list { display: flex; flex-direction: column; gap: 6px; margin: 16px 0; }
  .no-item { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text2); padding: 8px 12px; background: var(--bg2); border-radius: 6px; }
  .no-icon { color: #dc2626; font-weight: 700; font-size: 13px; flex-shrink: 0; }

  .check-list { list-style: none; display: flex; flex-direction: column; gap: 8px; margin: 12px 0; }
  .check-list li { display: flex; align-items: flex-start; gap: 8px; font-size: 14px; color: var(--text2); line-height: 1.5; }
  .check-list li::before { content: '✓'; color: var(--green); font-weight: 700; flex-shrink: 0; margin-top: 1px; }

  .flow-diagram { display: flex; align-items: center; justify-content: center; gap: 12px; background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 24px; margin: 20px 0; flex-wrap: wrap; gap: 8px; }
  .flow-node { background: var(--bg); border: 1px solid var(--border); border-radius: 8px; padding: 10px 18px; font-size: 14px; font-weight: 600; }
  .flow-node.highlight { border-color: #7c3aed; color: #7c3aed; }
  .flow-arrow { font-size: 13px; color: var(--text3); white-space: nowrap; }
  .flow-cross { background: #fee2e2; border: 1px solid #fecaca; color: #991b1b; border-radius: 8px; padding: 6px 14px; font-size: 13px; font-weight: 600; }
  .dark .flow-cross { background: #450a0a; border-color: #7f1d1d; color: #fca5a5; }

  .third-party-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 16px 0; }
  @media (max-width: 600px) { .third-party-grid { grid-template-columns: 1fr; } }
  .third-party-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 16px; text-decoration: none; color: var(--text); transition: border-color 0.15s; }
  .third-party-card:hover { border-color: #7c3aed; }
  .third-party-card strong { display: block; font-size: 15px; margin-bottom: 4px; }
  .third-party-card p { font-size: 13px; color: #7c3aed; margin: 0; }

  .perm-list { display: flex; flex-direction: column; gap: 12px; margin: 16px 0; }
  .perm-item { background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 16px; }
  .perm-header { margin-bottom: 8px; }
  .perm-badge { font-family: monospace; font-size: 13px; padding: 4px 12px; border-radius: 6px; }
  .perm-badge.blue { background: #dbeafe; color: #1e40af; border: 1px solid #bfdbfe; }
  .perm-badge.purple { background: #f5f3ff; color: #6d28d9; border: 1px solid #ddd6fe; }
  .perm-badge.green { background: #dcfce7; color: #065f46; border: 1px solid #bbf7d0; }
  .dark .perm-badge.blue { background: #1e3a5f; color: #93c5fd; border-color: #1e40af; }
  .dark .perm-badge.purple { background: #2e1065; color: #c4b5fd; border-color: #6d28d9; }
  .dark .perm-badge.green { background: #052e16; color: #4ade80; border-color: #166534; }
  .perm-item p { font-size: 14px; color: var(--text2); margin: 0; line-height: 1.5; }

  .rights-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; margin: 16px 0; }
  .right-card { display: flex; gap: 12px; align-items: flex-start; background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 16px; }
  .right-icon { font-size: 22px; flex-shrink: 0; }
  .right-card strong { display: block; font-size: 14px; margin-bottom: 4px; }
  .right-card p { font-size: 13px; color: var(--text3); margin: 0; }
  .legal-note { background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 16px; margin-top: 16px; }
  .legal-note strong { display: block; margin-bottom: 6px; font-size: 15px; }
  .legal-note p { font-size: 14px; color: var(--text2); margin: 0; line-height: 1.5; }

  .contact-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; margin: 16px 0; }
  .contact-card { display: flex; gap: 12px; align-items: flex-start; background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 16px; text-decoration: none; color: var(--text); transition: border-color 0.15s, background 0.15s; }
  .contact-card:hover { border-color: #7c3aed; background: #fdf4ff; }
  .dark .contact-card:hover { background: #2e1065; }
  .contact-icon { font-size: 20px; flex-shrink: 0; }
  .contact-card strong { display: block; font-size: 14px; margin-bottom: 3px; }
  .contact-card p { font-size: 13px; color: #7c3aed; margin: 0; word-break: break-all; }

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