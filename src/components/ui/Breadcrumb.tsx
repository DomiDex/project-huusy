'use client';

import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

type BreadcrumbProps = {
  currentPage: string;
};

export default function Breadcrumb({ currentPage }: BreadcrumbProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function getUserId() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    }
    getUserId();
  }, []);

  if (!userId) return null;

  return (
    <nav className='flex items-center space-x-2 text-sm text-primary-600'>
      <Link
        href={`/pro/${userId}`}
        className='flex items-center hover:text-secondary-500'
      >
        <HomeIcon className='h-4 w-4 mr-1' />
        Dashboard
      </Link>
      <ChevronRightIcon className='h-4 w-4' />
      <span className='text-primary-950 font-medium'>{currentPage}</span>
    </nav>
  );
}