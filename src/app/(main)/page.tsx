'use client';

import PropertyTypesSection from '@/features/home/components/PropertyTypesSection';
import CitiesSection from '@/features/home/components/CitiesSection';
import MainCallToAction from '@/features/home/components/MainCallToAction';
import FeaturedProperties from '@/features/home/components/FeaturedProperties';
import BenefitSection from '@/features/home/components/BenefitSection';
import TestimonialSection from '@/features/home/components/TestimonialSection';
import HomeHero from '@/features/home/components/HomeHero';

export default function Home() {
  return (
    <main className='bg-background min-h-screen'>
      <HomeHero />
      <BenefitSection />
      <FeaturedProperties />
      <TestimonialSection />
      <MainCallToAction />
      <CitiesSection />
      <PropertyTypesSection />
    </main>
  );
}
