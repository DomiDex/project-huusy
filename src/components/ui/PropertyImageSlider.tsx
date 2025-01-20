'use client';

import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useCallback } from 'react';

interface PropertyImageSliderProps {
  images: string[];
}

export default function PropertyImageSlider({
  images,
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
      <div className='w-[300px] h-[200px] bg-primary-100 flex items-center justify-center rounded-lg'>
        <p className='text-primary-600'>No images available</p>
      </div>
    );
  }

  return (
    <div className='relative w-[300px]'>
      <div className='overflow-hidden rounded-lg' ref={emblaRef}>
        <div className='flex'>
          {images.map((image, index) => (
            <div key={index} className='relative min-w-full'>
              <Image
                src={image}
                alt={`Property image ${index + 1}`}
                width={300}
                height={200}
                className='object-cover w-[300px] h-[200px]'
              />
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className='absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-1 rounded-full shadow-sm hover:bg-white transition-colors'
          >
            <ChevronLeftIcon className='w-5 h-5 text-primary-950' />
          </button>
          <button
            onClick={scrollNext}
            className='absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-1 rounded-full shadow-sm hover:bg-white transition-colors'
          >
            <ChevronRightIcon className='w-5 h-5 text-primary-950' />
          </button>
        </>
      )}
    </div>
  );
}
