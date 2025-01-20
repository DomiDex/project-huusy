'use client';

import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type BreadcrumbProps = {
  currentPage: string;
  firstPageName?: string;
  baseUrl: string;
};

export default function Breadcrumb({
  currentPage,
  firstPageName = 'Dashboard',
  baseUrl,
}: BreadcrumbProps) {
  return (
    <nav className='flex items-center space-x-2 text-sm text-primary-600'>
      <Link
        href={baseUrl}
        className='flex items-center hover:text-secondary-500'
      >
        <HomeIcon className='h-4 w-4 mr-1' />
        {firstPageName}
      </Link>
      <ChevronRightIcon className='h-4 w-4' />
      <span className='text-primary-950 font-medium'>{currentPage}</span>
    </nav>
  );
}
