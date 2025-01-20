'use client';

import { useState } from 'react';
import { Property } from '@/types';
import PropertyImageSlider from '@/components/ui/PropertyImageSlider';
import { MapPinIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { formatPrice } from '@/utils/formatting';
import EditPropertyModal from '@/features/properties/components/EditPropertyModal';
import { createClient } from '@/utils/supabase/client';

interface PropertyProCardProps {
  property: Property;
  onDelete?: () => void;
}

export default function PropertyProCard({
  property,
  onDelete,
}: PropertyProCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const supabase = createClient();

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this property?'))
      return;

    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', property.id);

      if (error) throw error;
      onDelete?.();
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  return (
    <>
      <div className='bg-white rounded-2xl shadow-sm overflow-hidden'>
        <div className='flex md:flex-row flex-col-reverse p-6 gap-6'>
          <div className='relative'>
            <PropertyImageSlider images={property.images} />
            <div className='absolute top-4 right-4 bg-white/90 px-3 py-1.5 rounded-lg'>
              <p className='text-lg font-heading text-primary-950'>
                {formatPrice(property.price)}
              </p>
            </div>
          </div>

          <div className='flex-1 space-y-4'>
            <div className='space-y-2'>
              <div className='flex items-start justify-between'>
                <div>
                  <span className='inline-block px-2 py-1 bg-secondary-500 text-sm text-white rounded-md'>
                    {property.sale_type?.title}
                  </span>
                  <h2 className='mt-2 text-2xl font-heading text-primary-950'>
                    {property.property_name}
                  </h2>
                </div>
                <span className='text-sm text-primary-800 capitalize'>
                  {property.property_type?.title}
                </span>
              </div>

              <div className='flex items-center gap-2 text-sm text-primary-800'>
                <MapPinIcon className='w-4 h-4' />
                <span>{property.city?.title}</span>
              </div>
            </div>

            <p className='text-primary-800'>{property.excerpt}</p>

            <div className='flex items-center gap-6 py-4 border-t border-primary-100'>
              <div className='flex items-center gap-2'>
                <span className='text-primary-950 font-heading'>
                  {property.bedrooms}
                </span>
                <span className='text-sm text-primary-800'>Bedrooms</span>
              </div>
              <div className='flex items-center gap-2'>
                <span className='text-primary-950 font-heading'>
                  {property.bathrooms}
                </span>
                <span className='text-sm text-primary-800'>Bathrooms</span>
              </div>
              <div className='flex items-center gap-2'>
                <span className='text-primary-950 font-heading'>
                  {property.property_size}
                </span>
                <span className='text-sm text-primary-800'>sqm</span>
              </div>
            </div>

            <div className='flex justify-end gap-3 pt-4 border-t border-primary-100'>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className='flex items-center gap-2 px-4 py-2 text-sm bg-primary-100 text-primary-950 rounded-lg hover:bg-primary-200 transition-colors'
              >
                <PencilIcon className='w-4 h-4' />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className='flex items-center gap-2 px-4 py-2 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors'
              >
                <TrashIcon className='w-4 h-4' />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <EditPropertyModal
        property={property}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </>
  );
}
