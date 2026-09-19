import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#050608',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Devcore — Building Digital Systems That Scale',
  description:
    'Devcore designs and engineers high-performance digital products, platforms, and intelligent systems for ambitious teams.',
  keywords: [
    'Software Engineering',
    'Digital Systems',
    'AI Solutions',
    'Cloud Architecture',
    'Next-gen Web Platforms',
    'Devcore',
  ],
  authors: [{ name: 'Devcore Engineering' }],
  openGraph: {
    title: 'Devcore — Building Digital Systems That Scale',
    description:
      'Devcore designs and engineers high-performance digital products, platforms, and intelligent systems.',
    url: 'https://devcore.io',
    siteName: 'Devcore',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devcore — Building Digital Systems That Scale',
    description:
      'Devcore designs and engineers high-performance digital products, platforms, and intelligent systems.',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} bg-void text-devcore-text-primary`}
    >
      <body className="font-sans antialiased selection:bg-accent-primary/20 selection:text-accent-primary">
        <div className="bg-grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
