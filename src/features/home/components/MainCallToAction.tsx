'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Section from '@/components/ui/Section';

export default function MainCallToAction() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.4]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.9]);

  return (
    <Section className='relative h-[100vh] overflow-hidden bg-primary-950 flex flex-col items-center justify-center'>
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
          className='object-cover w-full h-full'
        />
      </motion.div>
      <div className='absolute inset-0  bg-primary-950/40' />

      <div className='relative z-20 h-full flex flex-col items-center justify-center px-4 md:px-8'>
        <div className='w-full max-w-[1400px] mx-auto text-center'>
          <div className='w-11/12 md:w-8/12 lg:w-7/12 mx-auto bg-primary-950/60 backdrop-blur-md rounded-2xl px-10 py-16 border border-primary-50/10'>
            <h2 className='text-4xl md:text-5xl font-heading text-white mb-4'>
              Find Your Dream Home Today
            </h2>
            <p className=' text-white/90 mb-8 max-w-4xl mx-auto'>
              Discover a wide range of properties that match your lifestyle and
              preferences
            </p>
            <div className='flex items-center justify-center gap-6'>
              <Link
                href='/properties'
                className='inline-flex items-center px-6 py-3 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors duration-300'
              >
                Browse Properties
                <span className='ml-2' aria-hidden='true'>
                  →
                </span>
              </Link>
              <Link
                href='/agents'
                className='inline-flex items-center text-white hover:text-secondary-300 transition-colors duration-300'
              >
                Find an Agent
                <span className='ml-2' aria-hidden='true'>
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
