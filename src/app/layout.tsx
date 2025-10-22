import '@/styles/globals.css';

import { Inter } from 'next/font/google';

import { metadata, siteConfig } from './metadata';
import { AppProviders } from './providers';

export { metadata };

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  preload: true,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={siteConfig.locale} suppressHydrationWarning className={inter.variable}>
      <head></head>
      <body className={inter.className} suppressHydrationWarning>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
