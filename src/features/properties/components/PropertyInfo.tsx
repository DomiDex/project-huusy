'use client';

import { MapPinIcon } from '@heroicons/react/24/outline';
import { formatPrice } from '@/utils/formatting';
import BedroomIcon from '@/components/icons/BedroomIcon';
import BathroomIcon from '@/components/icons/BathroomIcon';
import type { Property } from '@/types';

interface PropertyInfoProps {
  property: Property;
}

export default function PropertyInfo({ property }: PropertyInfoProps) {
  return (
    <div className='bg-white rounded-lg shadow-sm p-8 mb-8'>
      <div className='flex justify-between items-start mb-6'>
        <div>
          <span className='inline-block px-3 py-1.5 bg-secondary-500 text-sm text-white rounded-md mb-3'>
            {property.sale_type.title}
          </span>
          <h1 className='text-3xl font-heading text-primary-950 mb-2'>
            {property.property_name}
          </h1>
          <div className='flex items-center gap-2 text-primary-600'>
            <MapPinIcon className='w-5 h-5' />
            <span>{property.city.title}</span>
          </div>
        </div>
        <div className='text-2xl font-bold text-secondary-500'>
          {formatPrice(property.price)}
        </div>
      </div>

      <div className='flex gap-6 mb-8'>
        <div className='flex items-center gap-2'>
          <BedroomIcon />
          <span>{property.bedrooms} Bedrooms</span>
        </div>
        <div className='flex items-center gap-2'>
          <BathroomIcon />
          <span>{property.bathrooms} Bathrooms</span>
        </div>
        <div className='flex items-center gap-2'>
          <span className='font-medium'>{property.property_size}</span>
          <span>sq ft</span>
        </div>
      </div>

      <div className='prose max-w-none'>
        <p>{property.excerpt}</p>
      </div>
    </div>
  );
}
