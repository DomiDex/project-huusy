import Footer from '@/components/layout/Footer';
import MainHeader from '@/components/layout/MainHeader';
import { ReactNode } from 'react';

export default function CustomerDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <MainHeader variant='light' />
      <main>{children}</main>
      <Footer />
    </>
  );
}
