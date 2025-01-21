'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Property } from '@/types';
import { formatPrice } from '@/utils/formatting';
import { MapPinIcon } from '@heroicons/react/24/outline';
import PropertyImageSlider from '@/components/ui/PropertyImageSlider';
import FavoriteButton from '@/components/ui/FavoriteButton';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import PropertyDetails from './PropertyDetails';

interface MainCardWideProps {
  property: Property;
}

export default function MainCardWide({ property }: MainCardWideProps) {
  return (
    <Link
      href={`/properties/${property.path}`}
      className='group block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300'
    >
      <div className='flex flex-col bg-white rounded-2xl shadow-sm overflow-hidden'>
        <div className='flex flex-col md:flex-row p-3'>
          {/* Image Section */}
          <div className='relative w-full md:w-[350px] h-[250px]'>
            <PropertyImageSlider images={property.images} />
            <div className='absolute top-4 left-4 z-10'>
              <span className='inline-block px-3 py-1.5 bg-secondary-500 text-sm text-white rounded-md'>
                {property.sale_type.title}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className='flex-1 p-6 flex flex-col'>
            <div className='flex items-start justify-between mb-4'>
              <div className='space-y-2'>
                <span className='text-sm text-primary-800 capitalize'>
                  {property.property_type.title}
                </span>
                <h2 className='text-2xl font-heading text-primary-950'>
                  {property.property_name}
                </h2>
                <div className='flex items-center gap-2 text-sm text-primary-800'>
                  <MapPinIcon className='w-4 h-4' />
                  <span>{property.city.title}</span>
                </div>
              </div>
              <div className='bg-white/90 px-3 py-1.5 rounded-lg'>
                <p className='text-lg font-heading text-primary-950'>
                  {formatPrice(property.price)}
                </p>
              </div>
            </div>

            <p className='text-primary-800 mb-6'>{property.excerpt}</p>
            <PropertyDetails
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              size={property.property_size}
            />
          </div>
        </div>

        {/* Agent Section */}
        {property.agent && (
          <div className='flex items-center justify-between p-4 border-t border-primary-100 bg-primary-50/50'>
            <div className='flex items-center gap-3'>
              <div className='relative w-12 h-12 rounded-full overflow-hidden'>
                <Image
                  src={
                    property.agent.profile_image_url || '/default-avatar.png'
                  }
                  alt={property.agent.full_name}
                  fill
                  className='object-cover'
                />
              </div>
              <div>
                <p className='font-medium text-primary-950'>
                  {property.agent.full_name}
                </p>
                <p className='text-sm text-primary-800'>
                  {property.agent.agency_name}
                </p>
              </div>
            </div>

            <div className='flex items-center gap-3'>
              <FavoriteButton propertyId={property.id} />
              <WhatsAppButton phoneNumber={property.agent.phone} />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
