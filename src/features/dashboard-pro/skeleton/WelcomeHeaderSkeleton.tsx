'use client';

import Section from '@/components/ui/Section';

export default function WelcomeHeaderSkeleton() {
  return (
    <Section
      className='px-8 py-6'
      containerClassName='container mx-auto flex flex-col sm:flex-row items-center justify-between'
    >
      <div className='h-12 w-64 bg-primary-200 animate-pulse rounded-lg' />
      <div className='h-10 w-36 bg-primary-200 animate-pulse rounded-lg' />
    </Section>
  );
}
