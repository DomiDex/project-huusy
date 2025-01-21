'use client';

import { useEffect } from 'react';
import { useFilterStore } from '../../store/filterStore';
import { createClient } from '@/utils/supabase/client';

export default function PropertyTypeFilter() {
  const {
    propertyTypes,
    setPropertyTypes,
    propertyTypeIds,
    setPropertyTypeIds,
  } = useFilterStore();

  useEffect(() => {
    async function fetchPropertyTypes() {
      const supabase = createClient();
      const { data } = await supabase
        .from('property_types')
        .select('*')
        .order('title');

      if (data) {
        setPropertyTypes(data);
      }
    }

    fetchPropertyTypes();
  }, [setPropertyTypes]);

  const handleTypeChange = (typeId: string) => {
    if (propertyTypeIds.includes(typeId)) {
      setPropertyTypeIds(propertyTypeIds.filter((id) => id !== typeId));
    } else {
      setPropertyTypeIds([...propertyTypeIds, typeId]);
    }
  };

  return (
    <div className='space-y-2'>
      {propertyTypes.map((type) => (
        <label key={type.id} className='flex items-center gap-2'>
          <input
            type='checkbox'
            checked={propertyTypeIds.includes(type.id)}
            onChange={() => handleTypeChange(type.id)}
            className='w-4 h-4 text-primary-600 border-primary-300 rounded focus:ring-primary-500'
          />
          <span className='text-sm text-primary-800'>{type.title}</span>
        </label>
      ))}
    </div>
  );
}
