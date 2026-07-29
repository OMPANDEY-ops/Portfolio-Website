import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://ompandey.vercel.app'),
  title: 'Om Pandey | Aspiring AI / GenAI Engineer',
  description: 'Portfolio of Om Pandey, a Computer Science Cybersecurity student and aspiring AI / GenAI Engineer.',
  keywords: ['Om Pandey', 'AI Engineer', 'GenAI', 'Cybersecurity', 'Portfolio', 'Next.js', 'Three.js'],
  openGraph: {
    title: 'Om Pandey | AI & Cybersecurity',
    description: 'Portfolio of Om Pandey, exploring the intersection of Artificial Intelligence and Cybersecurity.',
    url: 'https://ompandey.com',
    siteName: 'Om Pandey Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Om Pandey | Aspiring AI / GenAI Engineer',
    description: 'Portfolio of Om Pandey, a Computer Science Cybersecurity student and aspiring AI / GenAI Engineer.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#0A0A0B] text-[#F2F2F2] font-body antialiased min-h-screen relative overflow-x-hidden">
        <div className="noise-overlay pointer-events-none" />
        {children}
      </body>
    </html>
  );
}
