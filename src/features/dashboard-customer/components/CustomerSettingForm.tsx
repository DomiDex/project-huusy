'use client';

import { FormEvent, useEffect, useState, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import { AccountCustomer } from '@/types';
import Input from '@/components/ui/Input';
import Image from 'next/image';
import { CameraIcon } from '@heroicons/react/24/outline';
import CustomerSettingFormSkeleton from '../skeleton/CustomerSettingFormSkeleton';

export default function CustomerSettingForm() {
  const [user, setUser] = useState<AccountCustomer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function getUser() {
      try {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser();

        if (authUser) {
          const { data } = await supabase
            .from('account_customer')
            .select('*')
            .eq('id', authUser.id)
            .single();

          if (data) {
            setUser(data as AccountCustomer);
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    }

    getUser();
  }, [supabase]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const formData = new FormData(e.currentTarget);
      const updates = {
        username: formData.get('username'),
        email: formData.get('email'),
      };

      const { error } = await supabase
        .from('account_customer')
        .update(updates)
        .eq('id', user?.id);

      if (error) throw error;

      setMessage({ type: 'success', text: 'Profile updated successfully!' });

      // Refresh user data
      const { data } = await supabase
        .from('account_customer')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (data) {
        setUser(data as AccountCustomer);
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Error updating profile',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setIsLoading(true);
    setMessage(null);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('profile-image-customer')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage
        .from('profile-image-customer')
        .getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from('account_customer')
        .update({ profile_image_url: publicUrl })
        .eq('id', user.id);

      if (updateError) throw updateError;

      const { data: userData } = await supabase
        .from('account_customer')
        .select('*')
        .eq('id', user.id)
        .single();

      if (userData) {
        setUser(userData as AccountCustomer);
        setMessage({
          type: 'success',
          text: 'Profile image updated successfully!',
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text:
          error instanceof Error
            ? error.message
            : 'Error updating profile image',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <CustomerSettingFormSkeleton />;
  if (!user) return null;

  return (
    <form onSubmit={handleSubmit} className='space-y-6 w-full md:w-1/2 mt-8'>
      <div className='flex justify-start mb-8'>
        <div className='relative'>
          <div className='w-32 h-32 rounded-full overflow-hidden bg-primary-100'>
            {user.profile_image_url ? (
              <Image
                src={user.profile_image_url}
                alt={user.username}
                fill
                className='object-cover'
              />
            ) : (
              <div className='w-full h-full flex items-center justify-center bg-primary-100 text-primary-400'>
                <CameraIcon className='w-8 h-8' />
              </div>
            )}
          </div>
          <button
            type='button'
            onClick={() => fileInputRef.current?.click()}
            className='absolute bottom-0 right-0 bg-secondary-500 text-white p-2 hover:bg-secondary-600 transition-colors duration-200'
            disabled={isLoading}
          >
            <CameraIcon className='w-5 h-5' />
          </button>
          <input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            onChange={handleImageUpload}
            className='hidden'
          />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Input
          label='Username'
          name='username'
          defaultValue={user.username}
          required
        />
        <Input
          label='Email'
          name='email'
          type='email'
          defaultValue={user.email}
          required
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
        className='bg-secondary-500 text-primary-50 hover:bg-secondary-600 focus:ring-secondary-500 w-full rounded-lg px-4 py-3 font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50'
      >
        {isLoading ? 'Updating...' : 'Update Profile'}
      </button>
    </form>
  );
}
