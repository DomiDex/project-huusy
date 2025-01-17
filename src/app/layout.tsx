import type { Metadata } from 'next';
import { customFont } from '@/lib/font';
import './globals.css';

export const metadata: Metadata = {
  title: 'Huusy - Real Estate Marketplace',
  description: 'Find your dream home with Huusy',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${customFont.variable} font-custom antialiased`}>
        {children}
      </body>
    </html>
  );
}
