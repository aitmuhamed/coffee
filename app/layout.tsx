import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '../components/Providers';

export const metadata: Metadata = {
  title: '57 Coffee House - Premium Brews',
  description: 'Pure Artistry. Experience the 57th iteration of perfection.',
};

/**
 * RootLayout component for Next.js App Router.
 * children is made optional to resolve the TypeScript error where it's inferred as missing.
 */
export default function RootLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <style>{`
          body {
            font-family: 'Inter', sans-serif;
            background-color: #faf9f6;
            color: #1a1a1a;
          }
          h1, h2, h3, .font-serif {
            font-family: 'Cormorant Garamond', serif;
          }
          .bg-coffee-dark { background-color: #2c1e1a; }
          .text-coffee-light { color: #d4a373; }
          .border-coffee-light { border-color: #d4a373; }
          .bg-coffee-light { background-color: #d4a373; }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}