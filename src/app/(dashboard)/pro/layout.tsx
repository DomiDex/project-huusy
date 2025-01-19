import ProHeader from '@/components/layout/ProHeader';
import Footer from '@/components/layout/Footer';
import { ReactNode } from 'react';

export default function ProDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <ProHeader />
      <main className='text-primary-950'>{children}</main>
      <Footer />
    </>
  );
}
