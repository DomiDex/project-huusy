'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

type AuthButtonProps = {
  isLight?: boolean;
};

export default function AuthButton({ isLight }: AuthButtonProps) {
  const router = useRouter();
  const supabase = createClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'pro' | 'customer' | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setIsAuthenticated(true);
        setUserId(user.id);

        // Check user role by querying both tables
        const { data: proPro } = await supabase
          .from('account_pro')
          .select()
          .eq('id', user.id)
          .single();

        if (proPro) {
          setUserRole('pro');
          return;
        }

        const { data: customerProfile } = await supabase
          .from('account_customer')
          .select()
          .eq('id', user.id)
          .single();

        if (customerProfile) {
          setUserRole('customer');
        }
      }
    }

    checkAuth();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (!isAuthenticated) {
    return (
      <Link
        href='/customer/register'
        className={cn(
          'rounded-lg px-4 py-2 text-base font-medium transition-colors duration-200 flex items-center gap-2',
          isLight
            ? 'text-primary-950 hover:bg-secondary-500'
            : 'text-primary-50 hover:text-secondary-300'
        )}
      >
        <UserCircleIcon className='h-5 w-5' />
        <span>Sign In</span>
      </Link>
    );
  }

  return (
    <div className='flex items-center gap-4'>
      <Link
        href={`/${userRole}/${userId}`}
        className={cn(
          'rounded-lg px-4 py-2 text-base font-medium transition-colors duration-200 flex items-center gap-2',
          isLight
            ? 'text-primary-950 hover:bg-secondary-500'
            : 'text-primary-50 hover:text-secondary-300'
        )}
      >
        <UserCircleIcon className='h-5 w-5' />
        <span>Dashboard</span>
      </Link>
      <button
        onClick={handleSignOut}
        className='rounded-lg px-4 py-2 text-base font-medium transition-colors duration-200 flex items-center gap-2 hover:bg-primary-950 hover:text-white'
      >
        <ArrowRightOnRectangleIcon className='h-5 w-5' />
      </button>
    </div>
  );
}
