'use client';

import Section from '@/components/ui/Section';

export default function DashboardHeroSkeleton() {
  return (
    <Section className='px-8 py-6' containerClassName='container mx-auto pt-16'>
      <div className='h-6 w-48 bg-primary-200 animate-pulse rounded-lg mb-4' />
      <div className='flex flex-col sm:flex-row items-center justify-between'>
        <div className='h-12 w-64 bg-primary-200 animate-pulse rounded-lg' />
      </div>
    </Section>
  );
}
