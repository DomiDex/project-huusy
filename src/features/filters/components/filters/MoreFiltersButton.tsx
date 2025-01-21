'use client';

import { useFilterStore } from '../../store/filterStore';

export default function MoreFiltersButton() {
  const resetFilters = useFilterStore((state) => state.resetFilters);

  return (
    <div className='flex gap-2'>
      <button
        onClick={resetFilters}
        className='w-full px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-500'
      >
        Reset Filters
      </button>
    </div>
  );
}
