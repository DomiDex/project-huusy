'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter, useParams } from 'next/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Section from '@/components/ui/Section';
import AddPropertyForm from '@/features/dashboard-pro/components/AddPropertyForm';
import AddPropertyFormSkeleton from '@/features/dashboard-pro/skeleton/AddPropertyFormSkeleton';
import { cn } from '@/lib/utils';

export default function AddPropertyPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const supabase = createClient();

  useEffect(() => {
    async function checkAuth() {
      try {
        // First, check if we have a session
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          router.push('/pro/sign-in');
          return;
        }

        // Try to get the user with the current session
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          // If there's an error or no user, try to refresh the session
          const { error: refreshError } = await supabase.auth.refreshSession();

          if (refreshError) {
            console.error('Session refresh failed:', refreshError);
            router.push('/pro/sign-in');
            return;
          }
        }

        // Check pro account
        const { data: proAccount, error: proError } = await supabase
          .from('account_pro')
          .select('*')
          .eq('id', user?.id)
          .single();

        if (proError || !proAccount) {
          console.error('Pro account not found:', proError);
          router.push('/pro/sign-in');
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/pro/sign-in');
      }
    }

    checkAuth();
  }, [router, supabase]);

  if (isLoading) {
    return (
      <Section
        className='flex flex-col gap-4 px-8 py-4'
        containerClassName='pt-16'
      >
        <div className='flex flex-col gap-4'>
          <div className='h-8 w-48 bg-primary-100 animate-pulse rounded-lg' />
          <div className='h-10 w-64 bg-primary-100 animate-pulse rounded-lg' />
          <AddPropertyFormSkeleton />
        </div>
      </Section>
    );
  }

  return (
    <>
      {/* <ProSidebar /> */}
      <div
        className={cn(
          'py-8 px-4 sm:px-6 lg:px-8',
          'lg:pl-72 rtl:lg:pl-0 rtl:lg:pr-72' // Adjust padding for sidebar
        )}
      >
        <div className='flex flex-col gap-4'>
          <Breadcrumb
            currentPage='Add Property'
            baseUrl={`/pro/${params.id}`}
            firstPageName='Dashboard'
          />
          <h1 className='text-4xl font-medium text-primary-950'>
            Add Property
          </h1>
          <AddPropertyForm />
        </div>
      </div>
    </>
  );
}
