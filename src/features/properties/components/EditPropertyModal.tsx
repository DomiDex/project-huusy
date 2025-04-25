'use client';

import { FormEvent, useEffect, useState, useRef } from 'react';
import { Property, PropertyType, City, SaleType } from '@/types';
import { createClient } from '@/utils/supabase/client';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import Image from 'next/image';
import { PhotoIcon } from '@heroicons/react/24/outline';

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
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>(
    property.images || []
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedImages((prev) => [...prev, ...files]);

    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => {
      // Only revoke URL if it's a local preview
      if (!prev[index].startsWith('http')) {
        URL.revokeObjectURL(prev[index]);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      // Upload new images if any
      const newImageUrls = await Promise.all(
        selectedImages.map(async (file) => {
          const fileName = `${Date.now()}-${file.name}`;
          const { error: uploadError } = await supabase.storage
            .from('property-images')
            .upload(fileName, file);

          if (uploadError) throw uploadError;

          const {
            data: { publicUrl },
          } = supabase.storage.from('property-images').getPublicUrl(fileName);

          return publicUrl;
        })
      );

      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);

      const propertyData = {
        property_name: formData.get('property_name') as string,
        excerpt: formData.get('excerpt') as string,
        bathrooms: Number(formData.get('bathrooms')),
        bedrooms: Number(formData.get('bedrooms')),
        property_size: Number(formData.get('property_size')),
        price: Number(formData.get('price')),
        address: formData.get('address') as string,
        property_type_id: formData.get('property_type_id') as string,
        city_id: formData.get('city_id') as string,
        sale_type_id: formData.get('sale_type_id') as string,
        images: [
          ...previewUrls.filter((url) => url.startsWith('http')),
          ...newImageUrls,
        ],
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
        <div className='space-y-4'>
          <label className='block text-sm font-medium text-primary-950'>
            Property Images
          </label>
          <div className='w-full grid grid-cols-3 gap-4'>
            {previewUrls.map((url, index) => (
              <div key={url} className='relative aspect-video'>
                <Image
                  src={url}
                  alt={`Preview ${index + 1}`}
                  fill
                  className='object-cover rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => removeImage(index)}
                  className='absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full'
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type='button'
              onClick={() => fileInputRef.current?.click()}
              className='aspect-video flex items-center justify-center border-2 border-dashed border-primary-400 rounded-lg hover:border-primary-500'
            >
              <PhotoIcon className='w-8 h-8 text-primary-400' />
            </button>
          </div>
          <input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            multiple
            onChange={handleImageSelect}
            className='hidden'
          />
        </div>

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
            defaultValue={property.property_type.id}
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
            defaultValue={property.city.id}
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
            defaultValue={property.sale_type.id}
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
