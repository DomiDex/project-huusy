import { ReactNode } from 'react';
import { Metadata } from 'next';
import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-screen flex flex-col'>
      <MainHeader variant='dark' className='border-b border-primary-800' />
      <div className='flex-grow'>{children}</div>
      <Footer />
    </div>
  );
}
