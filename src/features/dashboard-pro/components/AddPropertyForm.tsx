'use client';

import { FormEvent, useEffect, useState, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Property, PropertyType, City, SaleType } from '@/types';
import Input from '@/components/ui/Input';
import { PhotoIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import AddPropertyFormSkeleton from '@/features/dashboard-pro/skeleton/AddPropertyFormSkeleton';

type FormData = Omit<Property, 'id' | 'created_at' | 'updated_at' | 'path'>;

export default function AddPropertyForm() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [saleTypes, setSaleTypes] = useState<SaleType[]>([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  useEffect(() => {
    setIsMounted(true);
    async function fetchReferenceData() {
      try {
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
      } catch (error) {
        console.error('Error fetching reference data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchReferenceData();
  }, [supabase]);

  if (!isMounted || isLoading) return <AddPropertyFormSkeleton />;

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedImages((prev) => [...prev, ...files]);

    // Create preview URLs
    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => {
      URL.revokeObjectURL(prev[index]); // Cleanup
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      // 1. Upload images to Supabase Storage
      const imageUrls = await Promise.all(
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

      // 2. Get form data - Fix: Use e.target instead of e.currentTarget
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const propertyData: FormData = {
        property_name: formData.get('property_name') as string,
        excerpt: formData.get('excerpt') as string,
        property_details: formData.get('property_details') as string,
        images: imageUrls,
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
        agent_id: (await supabase.auth.getUser()).data.user?.id as string,
      };

      // 3. Insert property data
      const { error: insertError } = await supabase
        .from('properties')
        .insert(propertyData);

      if (insertError) throw insertError;

      setMessage({ type: 'success', text: 'Property added successfully!' });
      form.reset();
      setSelectedImages([]);
      setPreviewUrls([]);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Error adding property',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='w-2/3 space-y-8 mt-8'>
      {/* Image Upload Section */}
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
            className=' aspect-video flex items-center justify-center border-2 border-dashed border-primary-400 rounded-lg hover:border-primary-500'
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

      {/* Property Details */}
      <h2 className='text-2xl font-medium text-primary-950'>
        Property Details
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Input
          label='Property Name'
          name='property_name'
          required
          variant='light'
        />
        <Input
          label='Price'
          name='price'
          type='number'
          required
          variant='light'
        />
        <Input
          label='Bedrooms'
          name='bedrooms'
          type='number'
          required
          variant='light'
        />
        <Input
          label='Bathrooms'
          name='bathrooms'
          type='number'
          required
          variant='light'
        />
        <Input
          label='Property Size (sq ft)'
          name='property_size'
          type='number'
          required
          variant='light'
        />
        <Input label='Address' name='address' required variant='light' />
      </div>

      {/* Property Categories */}
      <h2 className='text-2xl font-medium text-primary-950'>
        Property Categories
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <select
          name='property_type_id'
          required
          className='w-full rounded-lg border border-primary-200 bg-white px-4 py-2 text-primary-950 placeholder-primary-400 focus:border-secondary-500 focus:outline-none focus:ring-2 focus:ring-secondary-500/20'
        >
          <option value=''>Select Property Type</option>
          {propertyTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.title}
            </option>
          ))}
        </select>

        <select
          name='city_id'
          required
          className='w-full rounded-lg border border-primary-200 bg-white px-4 py-2 text-primary-950 placeholder-primary-400 focus:border-secondary-500 focus:outline-none focus:ring-2 focus:ring-secondary-500/20'
        >
          <option value=''>Select City</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.title}
            </option>
          ))}
        </select>

        <select
          name='sale_type_id'
          required
          className='w-full rounded-lg border border-primary-200 bg-white px-4 py-2 text-primary-950 placeholder-primary-400 focus:border-secondary-500 focus:outline-none focus:ring-2 focus:ring-secondary-500/20'
        >
          <option value=''>Select Sale Type</option>
          {saleTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.title}
            </option>
          ))}
        </select>
      </div>

      {/* Description Fields */}
      <h2 className='text-2xl font-medium text-primary-950'>
        Property Description
      </h2>
      <div className='space-y-4'>
        <label htmlFor='excerpt'>Brief description</label>
        <textarea
          name='excerpt'
          rows={2}
          className='w-full rounded-lg border border-primary-200 bg-white px-4 py-2 text-primary-950 placeholder-primary-400 focus:border-secondary-500 focus:outline-none focus:ring-2 focus:ring-secondary-500/20'
        />
        <label htmlFor='property_details'>Detailed description</label>
        <textarea
          name='property_details'
          rows={4}
          className='w-full rounded-lg border border-primary-200 bg-white px-4 py-2 text-primary-950 placeholder-primary-400 focus:border-secondary-500 focus:outline-none focus:ring-2 focus:ring-secondary-500/20'
        />
      </div>
      <h2 className='text-2xl font-medium text-primary-950'>SEO area</h2>
      {/* SEO Fields */}
      <div className='space-y-4'>
        <Input label='Meta Title' name='meta_title' variant='light' />
        <label htmlFor='meta_description'>Meta Description</label>
        <textarea
          name='meta_description'
          rows={2}
          className='w-full rounded-lg border border-primary-200 bg-white px-4 py-2 text-primary-950 placeholder-primary-400 focus:border-secondary-500 focus:outline-none focus:ring-2 focus:ring-secondary-500/20'
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

      <button
        type='submit'
        disabled={isLoading}
        className='w-full bg-secondary-500 text-white py-2 px-4 rounded-lg hover:bg-secondary-600 disabled:opacity-50'
      >
        {isLoading ? 'Adding Property...' : 'Add Property'}
      </button>
    </form>
  );
}
