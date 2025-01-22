import type { Metadata } from 'next';
import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Real Estate Agents | Huusy',
  description:
    'Meet our experienced real estate professionals at Huusy. Find the right agent to help you buy, sell, or rent your property.',
  openGraph: {
    title: 'Real Estate Agents | Huusy',
    description:
      'Meet our experienced real estate professionals at Huusy. Find the right agent to help you buy, sell, or rent your property.',
    type: 'website',
  },
};

export default function AgentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-screen flex flex-col'>
      <MainHeader variant='light' className='border-b border-primary-100' />
      <div className='flex-grow'>{children}</div>
      <Footer />
    </div>
  );
}
