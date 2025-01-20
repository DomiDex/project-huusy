'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Property, PropertyType, City, SaleType } from '@/types';
import { createClient } from '@/utils/supabase/client';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';

interface EditPropertyModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditPropertyModal({
  property,
  isOpen,
  onClose,
}: EditPropertyModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [saleTypes, setSaleTypes] = useState<SaleType[]>([]);
  const supabase = createClient();

  useEffect(() => {
    async function fetchReferenceData() {
      const [
        { data: propertyTypesData },
        { data: citiesData },
        { data: saleTypesData },
      ] = await Promise.all([
        supabase.from('property_types').select('*'),
        supabase.from('cities').select('*'),
        supabase.from('sale_types').select('*'),
      ]);

      if (propertyTypesData) setPropertyTypes(propertyTypesData);
      if (citiesData) setCities(citiesData);
      if (saleTypesData) setSaleTypes(saleTypesData);
    }

    fetchReferenceData();
  }, [supabase]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);

      const propertyData = {
        property_name: formData.get('property_name') as string,
        excerpt: formData.get('excerpt') as string,
        property_details: formData.get('property_details') as string,
        bathrooms: Number(formData.get('bathrooms')),
        bedrooms: Number(formData.get('bedrooms')),
        property_size: Number(formData.get('property_size')),
        price: Number(formData.get('price')),
        address: formData.get('address') as string,
        meta_title: formData.get('meta_title') as string,
        meta_description: formData.get('meta_description') as string,
        property_type_id: formData.get('property_type_id') as string,
        city_id: formData.get('city_id') as string,
        sale_type_id: formData.get('sale_type_id') as string,
      };

      const { error } = await supabase
        .from('properties')
        .update(propertyData)
        .eq('id', property.id);

      if (error) throw error;

      setMessage({ type: 'success', text: 'Property updated successfully!' });
      setTimeout(onClose, 2000);
    } catch (error) {
      setMessage({
        type: 'error',
        text:
          error instanceof Error ? error.message : 'Error updating property',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Edit Property'>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Input
            label='Property Name'
            name='property_name'
            defaultValue={property.property_name}
            required
            variant='light'
          />
          <Input
            label='Price'
            name='price'
            type='number'
            defaultValue={property.price}
            required
            variant='light'
          />
          <Input
            label='Bedrooms'
            name='bedrooms'
            type='number'
            defaultValue={property.bedrooms}
            required
            variant='light'
          />
          <Input
            label='Bathrooms'
            name='bathrooms'
            type='number'
            defaultValue={property.bathrooms}
            required
            variant='light'
          />
          <Input
            label='Property Size (sq ft)'
            name='property_size'
            type='number'
            defaultValue={property.property_size}
            required
            variant='light'
          />
          <Input
            label='Address'
            name='address'
            defaultValue={property.address}
            required
            variant='light'
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <select
            name='property_type_id'
            defaultValue={property.property_type_id}
            required
            className='w-full rounded-lg border border-primary-200 bg-white px-4 py-2'
          >
            {propertyTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.title}
              </option>
            ))}
          </select>

          <select
            name='city_id'
            defaultValue={property.city_id}
            required
            className='w-full rounded-lg border border-primary-200 bg-white px-4 py-2'
          >
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.title}
              </option>
            ))}
          </select>

          <select
            name='sale_type_id'
            defaultValue={property.sale_type_id}
            required
            className='w-full rounded-lg border border-primary-200 bg-white px-4 py-2'
          >
            {saleTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.title}
              </option>
            ))}
          </select>
        </div>

        <div className='space-y-4'>
          <label className='block text-sm font-medium text-primary-950'>
            Brief description
          </label>
          <textarea
            name='excerpt'
            rows={2}
            defaultValue={property.excerpt}
            className='w-full rounded-lg border border-primary-200 bg-white px-4 py-2'
          />

          <label className='block text-sm font-medium text-primary-950'>
            Detailed description
          </label>
          <textarea
            name='property_details'
            rows={4}
            defaultValue={property.property_details}
            className='w-full rounded-lg border border-primary-200 bg-white px-4 py-2'
          />
        </div>

        <div className='space-y-4'>
          <h3 className='text-lg font-medium text-primary-950'>SEO Details</h3>
          <Input
            label='Meta Title'
            name='meta_title'
            defaultValue={property.meta_title}
            variant='light'
          />
          <label className='block text-sm font-medium text-primary-950'>
            Meta Description
          </label>
          <textarea
            name='meta_description'
            rows={2}
            defaultValue={property.meta_description}
            className='w-full rounded-lg border border-primary-200 bg-white px-4 py-2'
          />
        </div>

        {message && (
          <div
            className={`p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className='flex justify-end gap-4'>
          <button
            type='button'
            onClick={onClose}
            className='px-4 py-2 text-sm text-primary-950 bg-primary-100 rounded-lg hover:bg-primary-200'
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={isLoading}
            className='px-4 py-2 text-sm text-white bg-secondary-500 rounded-lg hover:bg-secondary-600 disabled:opacity-50'
          >
            {isLoading ? 'Updating...' : 'Update Property'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
