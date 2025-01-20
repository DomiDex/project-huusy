'use client';

import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { AccountCustomer } from '@/types';

type CustomerBreadcrumbProps = {
  currentPage: string;
  user: AccountCustomer;
};

export default function CustomerBreadcrumb({
  currentPage,
  user,
}: CustomerBreadcrumbProps) {
  return (
    <nav className='flex items-center space-x-2 text-sm text-primary-600'>
      <Link
        href={`/customer/${user.id}`}
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
