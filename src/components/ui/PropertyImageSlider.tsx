'use client';

import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useCallback } from 'react';

interface PropertyImageSliderProps {
  images: string[];
  width?: number;
  height?: number;
}

export default function PropertyImageSlider({
  images,
  width = 350,
}: PropertyImageSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!images || images.length === 0) {
    return (
      <div className='w-full h-full bg-primary-100 flex items-center justify-center rounded-lg'>
        <p className='text-primary-600'>No images available</p>
      </div>
    );
  }

  return (
    <div className='relative w-full h-full'>
      <div className='overflow-hidden rounded-lg h-full' ref={emblaRef}>
        <div className='flex h-full'>
          {images.map((image, index) => (
            <div key={index} className='relative min-w-full h-full'>
              <Image
                src={image}
                alt={`Property image ${index + 1}`}
                fill
                className='object-cover'
                sizes={`(max-width: 768px) 100vw, ${width}px`}
              />
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className='absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-sm hover:bg-white transition-colors'
            aria-label='Previous image'
          >
            <ChevronLeftIcon className='w-6 h-6 text-primary-950' />
          </button>
          <button
            onClick={scrollNext}
            className='absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-sm hover:bg-white transition-colors'
            aria-label='Next image'
          >
            <ChevronRightIcon className='w-6 h-6 text-primary-950' />
          </button>
        </>
      )}
    </div>
  );
}
