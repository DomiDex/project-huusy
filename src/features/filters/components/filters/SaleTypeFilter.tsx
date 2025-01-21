'use client';

import { useEffect } from 'react';
import { useFilterStore } from '../../store/filterStore';
import { createClient } from '@/utils/supabase/client';
import { cn } from '@/lib/utils';

export default function SaleTypeFilter() {
  const { saleTypes, setSaleTypes, saleTypeId, setSaleTypeId } =
    useFilterStore();

  useEffect(() => {
    async function fetchSaleTypes() {
      const supabase = createClient();
      const { data } = await supabase
        .from('sale_types')
        .select('*')
        .order('title');

      if (data) {
        setSaleTypes(data);
      }
    }

    fetchSaleTypes();
  }, [setSaleTypes]);

  return (
    <div className='flex flex-wrap gap-2'>
      {saleTypes.map((type) => (
        <button
          key={type.id}
          onClick={() => setSaleTypeId(saleTypeId === type.id ? null : type.id)}
          className={cn(
            'px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500',
            saleTypeId === type.id
              ? 'bg-primary-600 text-white border-primary-600'
              : 'border-primary-200 hover:bg-primary-50'
          )}
        >
          {type.title}
        </button>
      ))}
    </div>
  );
}
