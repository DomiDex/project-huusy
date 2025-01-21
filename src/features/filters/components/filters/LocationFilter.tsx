'use client';

import { useEffect } from 'react';
import { useFilterStore } from '../../store/filterStore';
import { createClient } from '@/utils/supabase/client';

export default function LocationFilter() {
  const { cities, setCities, cityId, setCityId } = useFilterStore();

  useEffect(() => {
    async function fetchCities() {
      const supabase = createClient();
      const { data } = await supabase.from('cities').select('*').order('title');

      if (data) {
        setCities(data);
      }
    }

    fetchCities();
  }, [setCities]);

  return (
    <div className='space-y-2'>
      <select
        value={cityId || ''}
        onChange={(e) => setCityId(e.target.value || null)}
        className='w-full px-3 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500'
      >
        <option value=''>All locations</option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.title}
          </option>
        ))}
      </select>
    </div>
  );
}
