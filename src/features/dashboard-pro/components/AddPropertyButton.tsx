'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function AddPropertyButton() {
  return (
    <Link
      href='/pro/properties'
      className='rounded-lg px-4 py-2 text-base font-medium border transition-colors duration-200 border-secondary-600 text-secondary-600 hover:bg-secondary-600 hover:text-white flex items-center gap-2'
    >
      <PlusIcon className='h-5 w-5' />
      Add Property
    </Link>
  );
}
