import { ReactNode } from 'react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import LenisProvider from '@/components/ui/LenisProvider';
import { SpeedInsightsProvider } from '@/providers/SpeedInsightsProvider';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Huusy - Real Estate Marketplace',
  description:
    'Find your dream home with Huusy. Browse through our extensive collection of properties for sale and rent.',
  keywords:
    'real estate, properties, homes for sale, homes for rent, real estate marketplace',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className={inter.className}>
      <body>
        <LenisProvider>{children}</LenisProvider>
        <SpeedInsightsProvider />
      </body>
    </html>
  );
}
