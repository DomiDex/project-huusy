'use client';

import { createClient } from '@/utils/supabase/client';
import { AccountPro } from '@/utils/supabase/auth';
import { useEffect, useState } from 'react';
import Section from '@/components/ui/Section';
import AddPropertyButton from '@/features/dashboard-pro/components/AddPropertyButton';

export default function WelcomeHeader() {
  const [user, setUser] = useState<AccountPro | null>(null);
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

  if (!user) return null;

  return (
    <Section
      className='px-8 py-6'
      containerClassName='container mx-auto flex flex-col sm:flex-row items-center justify-between'
    >
      <h1 className='text-4xl font-medium text-primary-950'>
        Welcome, {user.full_name}
      </h1>
      <AddPropertyButton />
    </Section>
  );
}
