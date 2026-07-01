import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CoreVision™ — AI Workforce Intelligence Platform',
  description: 'Transform Hiring Into Workforce Intelligence. CoreVision analyses your hiring objectives and recommends the optimal workforce strategy.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
