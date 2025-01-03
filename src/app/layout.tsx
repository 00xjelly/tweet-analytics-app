import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Shell } from '@/components/layout/shell';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tweet Analytics',
  description: 'Track and analyze tweet metrics',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}