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
  metadataBase: new URL('https://easyview.in'),
  title: {
    default: 'EasyView — Clarity for Every Brain 🧠',
    template: '%s | EasyView',
  },
  description: 'The AI-Powered Cognitive Bridge for Web Accessibility. EasyView makes the web accessible for neurodivergent users with AI-powered simplification, sensory shielding, and dyslexia-optimized typography.',
  keywords: [
    'web accessibility',
    'cognitive accessibility',
    'neurodivergent tools',
    'dyslexia chrome extension',
    'ADHD browser tool',
    'sensory shield',
    'AI jargon decoder',
    'inclusive design',
    'web simplification',
    'autism accessibility',
    'EasyView',
    'EasyView Chrome Extension',
    'EasyView Web Application'
  ],
  authors: [{ name: 'EasyView Team' }],
  creator: 'EasyView',
  publisher: 'EasyView',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
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
    description: 'AI-powered browser tools for neurodivergent users. Simplify jargon, shield sensory triggers, and customize typography for a calmer web.',
    url: 'https://easyview.in',
    siteName: 'EasyView',
    images: [
      {
        url: '/og-image.png', // Ensure this exists in public/
        width: 1200,
        height: 630,
        alt: 'EasyView Platform Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EasyView — Clarity for Every Brain',
    description: 'The AI-powered cognitive bridge for web accessibility.',
    images: ['/og-image.png'],
    creator: '@EasyViewAI',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: [
      '-DRxZt3O3T6BOH7qi6Nuvney9gn6WKl7vwM1soILS_8',
      'RjxOkWf_BWpA-PCjLeH2yN793q5N97xGCvIjZVmp4eg'
    ],
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
