'use client';

import { useFilterStore } from '../../store/filterStore';
import { cn } from '@/lib/utils';

const bathroomOptions = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4+' },
];

export default function BathroomsFilter() {
  const { bathrooms, setBathrooms } = useFilterStore();

  return (
    <div className='flex flex-wrap gap-2'>
      {bathroomOptions.map((option) => (
        <button
          key={option.value}
          onClick={() =>
            setBathrooms(bathrooms === option.value ? null : option.value)
          }
          className={cn(
            'px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500',
            bathrooms === option.value
              ? 'bg-primary-600 text-white border-primary-600'
              : 'border-primary-200 hover:bg-primary-50'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
