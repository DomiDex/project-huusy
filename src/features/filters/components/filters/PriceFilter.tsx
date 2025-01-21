'use client';

import { useFilterStore } from '../../store/filterStore';
import { formatPrice } from '@/utils/formatting';

export default function PriceFilter() {
  const { priceRange, setPriceRange } = useFilterStore();

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : null;
    setPriceRange(value, priceRange.max);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : null;
    setPriceRange(priceRange.min, value);
  };

  return (
    <div className='space-y-4'>
      <div className='flex gap-4'>
        <div className='flex-1'>
          <label className='text-sm text-primary-800'>Min Price</label>
          <input
            type='number'
            value={priceRange.min || ''}
            onChange={handleMinChange}
            className='w-full px-3 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500'
            placeholder='Min'
            min={0}
            step={1000}
          />
          {priceRange.min && (
            <div className='mt-1 text-xs text-primary-600'>
              {formatPrice(priceRange.min)}
            </div>
          )}
        </div>
        <div className='flex-1'>
          <label className='text-sm text-primary-800'>Max Price</label>
          <input
            type='number'
            value={priceRange.max || ''}
            onChange={handleMaxChange}
            className='w-full px-3 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500'
            placeholder='Max'
            min={priceRange.min || 0}
            step={1000}
          />
          {priceRange.max && (
            <div className='mt-1 text-xs text-primary-600'>
              {formatPrice(priceRange.max)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
