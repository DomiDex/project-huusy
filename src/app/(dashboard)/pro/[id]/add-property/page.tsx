'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter, useParams } from 'next/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Section from '@/components/ui/Section';
import AddPropertyForm from '@/features/dashboard-pro/components/AddPropertyForm';

export default function AddPropertyPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const supabase = createClient();

  useEffect(() => {
    async function checkAuth() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push('/pro/sign-in');
          return;
        }

        const { data: proAccount } = await supabase
          .from('account_pro')
          .select('*')
          .eq('id', user.id)
          .single();

        if (!proAccount) {
          router.push('/pro/sign-in');
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error checking auth:', error);
        router.push('/pro/sign-in');
      }
    }

    checkAuth();
  }, [router, supabase]);

  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a proper loading component
  }

  return (
    <Section
      className='flex flex-col gap-4 px-8 py-4 '
      containerClassName='pt-16'
    >
      <div className='flex flex-col gap-4'>
        <Breadcrumb currentPage='Add Property' baseUrl={`/pro/${params.id}`} />
        <h1 className='text-4xl font-medium text-primary-950'>Add Property</h1>
        <AddPropertyForm />
      </div>
    </Section>
  );
}
