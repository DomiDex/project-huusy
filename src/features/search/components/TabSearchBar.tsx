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

export default function TabSearchBar() {
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
    <div className='w-10/12 mx-auto'>
      <div className='flex flex-row gap-4'>
        <button
          onClick={() => setActiveTab('rent')}
          className={`backdrop-blur-md px-4 py-2 rounded-t-md ${
            activeTab === 'rent'
              ? 'bg-primary-950 text-white'
              : 'bg-primary-950/60 text-white/80'
          }`}
        >
          Rent
        </button>
        <button
          onClick={() => setActiveTab('buy')}
          className={`backdrop-blur-md px-4 py-2 rounded-t-md ${
            activeTab === 'buy'
              ? 'bg-primary-950 text-white'
              : 'bg-primary-950/60 text-white/80'
          }`}
        >
          Buy
        </button>
      </div>
      <div className='bg-primary-950/60 backdrop-blur-md rounded-tr-md rounded-br-md rounded-bl-md p-4'>
        <div className='flex flex-col md:flex-row gap-4'>
          <div className='flex-1 flex gap-4'>
            <input
              type='text'
              placeholder='Search properties...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='flex-1 px-4 py-2 rounded-md bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:border-white/40'
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className='px-6 py-2 bg-secondary-500 text-white rounded-md hover:bg-secondary-600 transition-colors'
            >
              Search
            </button>
          </div>

          <div className='relative'>
            <button
              onClick={() => setShowCityDropdown(!showCityDropdown)}
              className='w-full px-4 py-2 rounded-md bg-white/10 text-white border border-white/20 focus:outline-none focus:border-white/40 text-left flex justify-between items-center'
            >
              Browse by City
              <ChevronDownIcon
                className={`w-5 h-5 transform transition-transform ${
                  showCityDropdown ? 'rotate-180' : ''
                }`}
              />
            </button>
            {showCityDropdown && (
              <div className='absolute z-10 w-full mt-1 bg-primary-950/90 backdrop-blur-md border border-white/20 rounded-md shadow-lg max-h-60 overflow-y-auto'>
                {cities.map((city) => (
                  <Link
                    key={city.id}
                    href={`/properties/city/${city.path}`}
                    className='block px-4 py-2 text-sm text-white/80 hover:bg-white/10 transition-colors'
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
              className='w-full px-4 py-2 rounded-md bg-white/10 text-white border border-white/20 focus:outline-none focus:border-white/40 text-left flex justify-between items-center'
            >
              Browse by Type
              <ChevronDownIcon
                className={`w-5 h-5 transform transition-transform ${
                  showPropertyTypeDropdown ? 'rotate-180' : ''
                }`}
              />
            </button>
            {showPropertyTypeDropdown && (
              <div className='absolute z-10 w-full mt-1 bg-primary-950/90 backdrop-blur-md border border-white/20 rounded-md shadow-lg max-h-60 overflow-y-auto'>
                {propertyTypes.map((type) => (
                  <Link
                    key={type.id}
                    href={`/properties/property-type/${type.path}`}
                    className='block px-4 py-2 text-sm text-white/80 hover:bg-white/10 transition-colors'
                    onClick={() => setShowPropertyTypeDropdown(false)}
                  >
                    {type.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
