import type { Metadata } from 'next';
import { DM_Sans, Space_Grotesk } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'EasyView — Clarity for every brain 🧠',
  description: 'The AI-Powered Cognitive Bridge for Web Accessibility. Make any webpage accessible for neurodivergent users with AI-powered features.',
  keywords: ['accessibility', 'neurodivergent', 'dyslexia', 'ADHD', 'autism', 'chrome extension', 'AI'],
  authors: [{ name: 'EasyView Team' }],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/logo.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'EasyView — Clarity for every brain',
    description: 'AI-powered Chrome extension making the web accessible for neurodivergent users',
    type: 'website',
  },
  verification: {
    google: '-DRxZt3O3T6BOH7qi6Nuvney9gn6WKl7vwM1soILS_8',
  },
};

import ExtensionSync from '@/components/ExtensionSync';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${spaceGrotesk.variable} dark`}>
      <body className="antialiased bg-slate-950 text-slate-50" suppressHydrationWarning>
        <ExtensionSync />
        {children}
      </body>
    </html>
  );
}
