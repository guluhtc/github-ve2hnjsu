import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Techigem - Free AI Instagram Tools/Generators/Downloaders',
  description: 'Access powerful free AI tools for Instagram including caption generators, hashtag generators, bio generators, and media downloaders. Enhance your social media presence with our suite of free Instagram tools.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='white'/%3E%3Ctext x='28' y='75' font-size='60' font-family='Arial,sans-serif' font-weight='bold' fill='%234285F4'%3ET%3C/text%3E%3Ctext x='62' y='75' font-size='60' font-family='Arial,sans-serif' font-weight='bold' fill='%23EA4335'%3EG%3C/text%3E%3C/svg%3E" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}