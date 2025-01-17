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
      <MainHeader />
      <main>{children}</main>
      <Footer />
    </>
  );
}
