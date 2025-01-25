'use client';

import Image from 'next/image';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import FavoriteButton from '@/features/favorites/components/FavoriteButton';
import type { Property } from '@/types';

interface AgentSidebarProps {
  property: Property;
}

export default function AgentSidebar({ property }: AgentSidebarProps) {
  if (!property.agent) return null;

  return (
    <div className='lg:w-80'>
      <div className='bg-white rounded-lg shadow-sm p-6 sticky top-32'>
        <div className='flex items-center gap-4 mb-6'>
          <div className='relative w-16 h-16'>
            <Image
              src={
                property.agent.profile_image_url ||
                '/images/placeholder-agent.jpg'
              }
              alt={property.agent.full_name}
              fill
              className='object-cover rounded-full'
            />
          </div>
          <div>
            <h3 className='font-heading text-lg text-primary-950'>
              {property.agent.full_name}
            </h3>
            {property.agent.agency_name && (
              <p className='text-primary-600'>{property.agent.agency_name}</p>
            )}
          </div>
        </div>

        <div className='space-y-4'>
          <WhatsAppButton
            phoneNumber={property.agent.phone}
            className='w-full justify-center'
          />
          <FavoriteButton propertyId={property.id} />
        </div>
      </div>
    </div>
  );
}
