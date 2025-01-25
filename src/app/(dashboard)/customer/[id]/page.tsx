'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Section from '@/components/ui/Section';
import WelcomeCustomerHeader from '@/features/dashboard-customer/components/WelcomeCustomerHeader';
import FavoritesList from '@/features/favorites/components/FavoritesList';
import { createClient } from '@/utils/supabase/client';

export default function CustomerDashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function checkAuth() {
      try {
        // Check if we have a session
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          router.push('/customer/register');
          return;
        }

        // Get the user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          const { error: refreshError } = await supabase.auth.refreshSession();
          if (refreshError) {
            console.error('Session refresh failed:', refreshError);
            router.push('/customer/register');
            return;
          }
        }

        // Check customer account
        const { data: customerAccount, error: customerError } = await supabase
          .from('account_customer')
          .select('*')
          .eq('id', user?.id)
          .single();

        if (customerError || !customerAccount) {
          console.error('Customer account not found:', customerError);
          router.push('/customer/register');
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/customer/register');
      }
    }

    checkAuth();
  }, [router, supabase]);

  if (isLoading) {
    return (
      <div className='pt-16'>
        <Section className='px-8'>
          <div className='h-8 w-48 bg-primary-100 animate-pulse rounded-lg mb-6' />
          <div className='space-y-6'>
            <div className='h-8 w-64 bg-primary-100 animate-pulse rounded-lg' />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className='h-[400px] bg-primary-100 animate-pulse rounded-2xl'
                />
              ))}
            </div>
          </div>
        </Section>
      </div>
    );
  }

  return (
    <div className='pt-16 bg-primary-50'>
      <WelcomeCustomerHeader />
      <Section className='px-8'>
        <div className='space-y-6'>
          <h2 className='text-2xl font-medium text-primary-950'>
            Favorite Properties
          </h2>
          <FavoritesList />
        </div>
      </Section>
    </div>
  );
}
