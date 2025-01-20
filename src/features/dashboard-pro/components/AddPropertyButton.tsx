'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function AddPropertyButton() {
  const params = useParams();
  const id = params.id;

  if (!id) return null;

  return (
    <Link
      href={`/pro/${id}/add-property`}
      className='rounded-lg px-4 py-2 text-base font-medium border transition-colors duration-200 border-secondary-600 text-secondary-600 hover:bg-secondary-600 hover:text-white flex items-center gap-2'
    >
      <PlusIcon className='h-5 w-5' />
      Add Property
    </Link>
  );
}
