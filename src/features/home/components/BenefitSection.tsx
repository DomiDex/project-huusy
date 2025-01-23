'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function BenefitSection() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '700%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-600%']);

  return (
    <section className='py-32 px-4 md:px-16 relative z-10 bg-primary-50 mt-[700px]'>
      <div className='container mx-auto flex md:flex-row flex-col justify-between items-center gap-16'>
        {/* Left Content */}
        <div className='flex flex-col items-start space-y-12 md:w-5/12'>
          <div className='space-y-6'>
            <h2 className='text-3xl font-heading text-primary-950'>
              Benefits of Using Our Platform
            </h2>
            <p className='text-primary-950'>
              Discover the advantages of finding your dream home through our
              innovative real estate platform. We combine cutting-edge
              technology with personalized service to make your property journey
              seamless and successful.
            </p>
          </div>

          {/* Benefits List */}
          <div className='space-y-4'>
            <div className='flex items-start gap-3'>
              <div className='w-8 h-8 rounded-lg bg-secondary-500 flex items-center justify-center text-white'>
                1
              </div>
              <div>
                <h3 className='text-xl font-medium text-primary-950'>
                  Wide Selection
                </h3>
                <p className='text-primary-950'>
                  Access thousands of verified properties across different
                  locations and price ranges.
                </p>
              </div>
            </div>
            <div className='flex items-start gap-3'>
              <div className='w-8 h-8 rounded-lg bg-secondary-500 flex items-center justify-center text-white'>
                2
              </div>
              <div>
                <h3 className='text-xl font-medium text-primary-950'>
                  Expert Agents
                </h3>
                <p className='text-primary-950'>
                  Connect with professional real estate agents who understand
                  your needs.
                </p>
              </div>
            </div>
            <div className='flex items-start gap-3'>
              <div className='w-8 h-8 rounded-lg bg-secondary-500 flex items-center justify-center text-white'>
                3
              </div>
              <div>
                <h3 className=' text-xl font-medium text-primary-950'>
                  Smart Search
                </h3>
                <p className='text-primary-950'>
                  Find properties that match your criteria with our advanced
                  filtering system.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Images */}
        <div className='relative md:w-7/12 h-[300px] bg-primary-50/50'>
          <motion.div
            className='absolute left-24 md:left-0 top-0 md:w-[220px] md:h-[140px] w-[140px] h-[80px] z-10 shadow-lg'
            style={{ y: y1 }}
          >
            <Image
              src='/images/parallax/parallaxleft@2x.webp'
              alt='Modern apartment interior'
              fill
              priority
              quality={100}
              className='object-cover rounded-2xl'
            />
          </motion.div>

          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[350px] z-0'>
            <Image
              src='/images/parallax/parallax-middle@2x.webp'
              alt='Luxury home exterior'
              fill
              priority
              sizes='(max-width: 768px) 100vw, 300px'
              quality={100}
              className='object-cover rounded-2xl'
            />
          </div>

          <motion.div
            className='absolute md:right-0 right-12 bottom-0 md:w-[190px] md:h-[250px] w-[140px] h-[160px] z-10 shadow-lg'
            style={{ y: y2 }}
          >
            <Image
              src='/images/parallax/parallax-right@2x.webp'
              alt='Contemporary kitchen design'
              fill
              priority
              sizes='(max-width: 768px) 100vw, 160px'
              quality={100}
              className='object-cover rounded-2xl'
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
