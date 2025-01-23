'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Section from '@/components/ui/Section';

export default function MainCallToAction() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.6]);

  return (
    <section className='relative h-screen overflow-hidden bg-primary-950'>
      <motion.div
        className='absolute inset-0 w-full h-full'
        style={{
          y,
          scale,
          opacity,
        }}
      >
        <Image
          src='/images/background/bg-cta@2x.webp'
          alt='Background'
          fill
          priority
          quality={100}
          sizes='100vw'
          className='object-cover'
        />
      </motion.div>
      <div className='absolute inset-0 bg-primary-950/40' />

      <div className='relative z-20 h-full flex flex-col items-center justify-center px-4 md:px-8'>
        <div className='w-full max-w-[1400px] mx-auto text-center'>
          <div className='w-11/12 md:w-8/12 lg:w-7/12 mx-auto bg-primary-950/60 backdrop-blur-md rounded-2xl px-10 py-16 border border-primary-50/10'>
            <h2 className='text-4xl md:text-5xl font-heading text-white mb-4'>
              Find Your Dream Home Today
            </h2>
            <p className='text-xl md:text-xl text-white/90 mb-8 max-w-4xl mx-auto'>
              Discover a wide range of properties that match your lifestyle and
              preferences
            </p>
            <div className='flex items-center justify-center gap-6'>
              <Link
                href='/properties'
                className='inline-block px-8 py-3 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-all duration-300 text-lg font-medium hover:scale-105'
              >
                Browse Properties
              </Link>
              <Link
                href='/agents'
                className='text-lg font-medium text-white hover:text-gray-200'
              >
                Find an Agent <span aria-hidden='true'>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
