import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchStore } from '../store/searchStore';

interface PropertySearchProps {
  type: 'rent' | 'sale';
}

export default function PropertySearch({ type }: PropertySearchProps) {
  const [searchInput, setSearchInput] = useState('');
  const { setSearchTerm, setSaleType } = useSearchStore();
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearchTerm(searchInput);
    setSaleType(type);
    router.push(`/search?q=${encodeURIComponent(searchInput)}&type=${type}`);
  };

  return (
    <form onSubmit={handleSubmit} className='flex gap-2'>
      <input
        type='text'
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder={`Search ${
          type === 'rent' ? 'rental' : 'sale'
        } properties...`}
        className='flex-1 px-4 py-2 rounded-lg border border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-500'
      />
      <button
        type='submit'
        className='px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors'
      >
        Search
      </button>
    </form>
  );
}
