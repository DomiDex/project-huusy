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

  return (
    <>
      <div className='grid grid-cols-1 gap-4 mb-8'>
        {images.length === 1 ? (
          <div
            className='relative aspect-video cursor-pointer'
            onClick={() => {
              setCurrentImageIndex(0);
              setIsLightboxOpen(true);
            }}
          >
            <Image
              src={images[0]}
              alt={propertyName}
              fill
              className='object-cover rounded-lg'
            />
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {images.map((image, index) => (
              <div
                key={index}
                className='relative aspect-video cursor-pointer'
                onClick={() => {
                  setCurrentImageIndex(index);
                  setIsLightboxOpen(true);
                }}
              >
                <Image
                  src={image}
                  alt={`${propertyName} - Image ${index + 1}`}
                  fill
                  className='object-cover rounded-lg'
                />
              </div>
            ))}
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
