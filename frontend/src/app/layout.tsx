import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BreakingNews } from '@/components/BreakingNews';

export const metadata: Metadata = {
  title: 'News Site - Your Source for Breaking News',
  description: 'Stay informed with the latest news, in-depth analysis, and compelling stories from around the world.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <BreakingNews />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
