'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/plugins/counter.css';

interface PropertyGalleryProps {
  images: string[];
  propertyName: string;
}

export default function PropertyGallery({
  images,
  propertyName,
}: PropertyGalleryProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const slides = images.map((image) => ({ src: image }));
  const displayImages = images.slice(0, 6);
  const remainingCount = images.length - 6;
  const hasMoreImages = remainingCount > 0;

  return (
    <>
      <div className='mb-8'>
        {images.length === 1 ? (
          <div
            className='relative aspect-video cursor-pointer overflow-hidden rounded-lg'
            onClick={() => {
              setCurrentImageIndex(0);
              setIsLightboxOpen(true);
            }}
          >
            <Image
              src={images[0]}
              alt={propertyName}
              fill
              className='object-cover transition-transform duration-300 hover:scale-105'
            />
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {displayImages.map((image, index) => {
              const isLastImage = index === 5 && hasMoreImages;
              
              return (
                <div
                  key={index}
                  className='relative aspect-video cursor-pointer overflow-hidden rounded-lg group'
                  onClick={() => {
                    setCurrentImageIndex(index);
                    setIsLightboxOpen(true);
                  }}
                >
                  <Image
                    src={image}
                    alt={`${propertyName} - Image ${index + 1}`}
                    fill
                    className='object-cover transition-transform duration-300 group-hover:scale-105'
                  />
                  
                  {/* Overlay for remaining images */}
                  {isLastImage && (
                    <div className='absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg'>
                      <div className='text-white text-center'>
                        <span className='text-3xl font-semibold'>+{remainingCount}</span>
                        <p className='text-sm mt-1'>more photos</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Hover overlay for all images */}
                  {!isLastImage && (
                    <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-lg' />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Lightbox
        open={isLightboxOpen}
        close={() => setIsLightboxOpen(false)}
        index={currentImageIndex}
        slides={slides}
        plugins={[Thumbnails, Zoom, Counter]}
        carousel={{
          spacing: 0,
          padding: 0,
        }}
        thumbnails={{
          position: 'bottom',
          width: 120,
          height: 80,
          border: 2,
          borderRadius: 4,
          padding: 4,
          gap: 16,
        }}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
        }}
        counter={{
          container: {
            style: {
              top: 'unset',
              bottom: '100px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              borderRadius: '20px',
              padding: '4px 12px',
            },
          },
        }}
        styles={{
          container: {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
          },
        }}
        render={{
          buttonPrev: slides.length <= 1 ? () => null : undefined,
          buttonNext: slides.length <= 1 ? () => null : undefined,
        }}
      />
    </>
  );
}
