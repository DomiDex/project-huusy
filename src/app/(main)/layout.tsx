import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';
import { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-screen flex flex-col'>
      <MainHeader />
      <div className='flex-grow'>{children}</div>
      <Footer />
    </div>
  );
}