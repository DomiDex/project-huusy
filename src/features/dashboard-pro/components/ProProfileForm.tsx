'use client';

import { FormEvent, useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { AccountPro } from '@/utils/supabase/auth';
import Input from '@/components/ui/Input';
import Section from '@/components/ui/Section';

export default function ProProfileForm() {
  const [user, setUser] = useState<AccountPro | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (authUser) {
        const { data } = await supabase
          .from('account_pro')
          .select('*')
          .eq('id', authUser.id)
          .single();

        if (data) {
          setUser(data as AccountPro);
        }
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
        full_name: formData.get('fullName'),
        agency_name: formData.get('agencyName'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        description: formData.get('description'),
      };

      const { error } = await supabase
        .from('account_pro')
        .update(updates)
        .eq('id', user?.id);

      if (error) throw error;

      setMessage({ type: 'success', text: 'Profile updated successfully!' });

      // Refresh user data
      const { data } = await supabase
        .from('account_pro')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (data) {
        setUser(data as AccountPro);
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Error updating profile. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Section className='px-8'>
      <div className='max-w-2xl mx-auto'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              label='Full Name'
              name='fullName'
              defaultValue={user.full_name}
              required
            />
            <Input
              label='Agency Name'
              name='agencyName'
              defaultValue={user.agency_name}
              required
            />
            <Input
              label='Phone'
              name='phone'
              type='tel'
              defaultValue={user.phone}
              required
            />
            <Input
              label='Email'
              name='email'
              type='email'
              defaultValue={user.email}
              required
            />
            <div className='md:col-span-2'>
              <label className='block text-sm font-medium text-primary-950 mb-2'>
                Description
              </label>
              <textarea
                name='description'
                rows={4}
                defaultValue={user.description || ''}
                className='w-full rounded-lg border border-primary-200 bg-white px-4 py-2 text-primary-950 placeholder-primary-400 focus:border-secondary-500 focus:outline-none focus:ring-2 focus:ring-secondary-500/20'
              />
            </div>
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
      </div>
    </Section>
  );
}
