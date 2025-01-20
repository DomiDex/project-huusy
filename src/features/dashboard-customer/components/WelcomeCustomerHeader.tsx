'use client';

import { createClient } from '@/utils/supabase/client';
import { AccountCustomer } from '@/types';
import { useEffect, useState } from 'react';
import Section from '@/components/ui/Section';
import Link from 'next/link';
import WelcomeCustomerHeaderSkeleton from '../skeleton/WelcomeCustomerHeaderSkeleton';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

export default function WelcomeCustomerHeader() {
  const [user, setUser] = useState<AccountCustomer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

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

  if (isLoading) return <WelcomeCustomerHeaderSkeleton />;
  if (!user) return null;

  return (
    <Section
      className='px-8 py-6'
      containerClassName='container mx-auto flex flex-col sm:flex-row items-center justify-between pt-16'
    >
      <h1 className='text-4xl font-medium text-primary-950'>
        Welcome, {user.username}
      </h1>
      <div className='flex gap-4'>
        <Link
          href={`/customer/${user.id}/setting`}
          className='rounded-lg px-4 py-2 text-base font-medium border transition-colors duration-200 border-secondary-600 text-secondary-600 hover:bg-secondary-600 hover:text-white flex items-center gap-2'
        >
          <Cog6ToothIcon className='h-5 w-5' />
          Profile Settings
        </Link>
      </div>
    </Section>
  );
}
