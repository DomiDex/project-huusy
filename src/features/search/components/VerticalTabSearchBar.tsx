'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchStore } from '../store/searchStore';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useHasMounted } from '@/hooks/useHasMounted';

interface City {
  id: string;
  title: string;
  path: string;
}

interface PropertyType {
  id: string;
  title: string;
  path: string;
}

export default function VerticalTabSearchBar() {
  const hasMounted = useHasMounted();
  const [activeTab, setActiveTab] = useState<'rent' | 'buy'>('rent');
  const [searchTerm, setSearchTerm] = useState('');
  const [cities, setCities] = useState<City[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([]);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showPropertyTypeDropdown, setShowPropertyTypeDropdown] =
    useState(false);
  const router = useRouter();
  const { setSearchTerm: setGlobalSearchTerm, setSaleType } = useSearchStore();

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();

      const [citiesResult, typesResult] = await Promise.all([
        supabase.from('cities').select('*').order('title'),
        supabase.from('property_types').select('*').order('title'),
      ]);

      if (citiesResult.data) setCities(citiesResult.data);
      if (typesResult.data) setPropertyTypes(typesResult.data);
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    setGlobalSearchTerm(searchTerm);
    setSaleType(activeTab === 'buy' ? 'sale' : 'rent');
    router.push(
      `/search?q=${encodeURIComponent(searchTerm)}&type=${
        activeTab === 'buy' ? 'sale' : 'rent'
      }`
    );
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <div className='bg-white p-6 rounded-2xl shadow-sm'>
      <div className='space-y-4'>
        <div className='flex flex-col gap-2'>
          <button
            onClick={() => setActiveTab('rent')}
            className={`px-4 py-2 rounded-md text-center ${
              activeTab === 'rent'
                ? 'bg-primary-950 text-white'
                : 'bg-primary-100 text-primary-950'
            }`}
          >
            Rent
          </button>
          <button
            onClick={() => setActiveTab('buy')}
            className={`px-4 py-2 rounded-md text-center ${
              activeTab === 'buy'
                ? 'bg-primary-950 text-white'
                : 'bg-primary-100 text-primary-950'
            }`}
          >
            Buy
          </button>
        </div>

        <div className='space-y-4 mt-6'>
          <input
            type='text'
            placeholder='Search properties...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full px-4 py-2 rounded-md border border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-500'
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />

          <div className='relative'>
            <button
              onClick={() => setShowCityDropdown(!showCityDropdown)}
              className='w-full px-4 py-2 rounded-md border border-primary-200 text-left flex justify-between items-center'
            >
              Browse by City
              <ChevronDownIcon
                className={`w-5 h-5 transform transition-transform ${
                  showCityDropdown ? 'rotate-180' : ''
                }`}
              />
            </button>
            {showCityDropdown && (
              <div className='absolute z-10 w-full mt-1 bg-white border border-primary-200 rounded-md shadow-lg max-h-60 overflow-y-auto'>
                {cities.map((city) => (
                  <Link
                    key={city.id}
                    href={`/properties/cities/${city.path}`}
                    className='block px-4 py-2 text-sm text-primary-950 hover:bg-primary-50 transition-colors'
                    onClick={() => setShowCityDropdown(false)}
                  >
                    {city.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className='relative'>
            <button
              onClick={() =>
                setShowPropertyTypeDropdown(!showPropertyTypeDropdown)
              }
              className='w-full px-4 py-2 rounded-md border border-primary-200 text-left flex justify-between items-center'
            >
              Browse by Property Type
              <ChevronDownIcon
                className={`w-5 h-5 transform transition-transform ${
                  showPropertyTypeDropdown ? 'rotate-180' : ''
                }`}
              />
            </button>
            {showPropertyTypeDropdown && (
              <div className='absolute z-10 w-full mt-1 bg-white border border-primary-200 rounded-md shadow-lg max-h-60 overflow-y-auto'>
                {propertyTypes.map((type) => (
                  <Link
                    key={type.id}
                    href={`/properties/property-type/${type.path}`}
                    className='block px-4 py-2 text-sm text-primary-950 hover:bg-primary-50 transition-colors'
                    onClick={() => setShowPropertyTypeDropdown(false)}
                  >
                    {type.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleSearch}
            className='w-full px-6 py-2 bg-secondary-500 text-white rounded-md hover:bg-secondary-600 transition-colors'
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
