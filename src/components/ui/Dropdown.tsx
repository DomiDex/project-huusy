'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface DropdownProps {
  label: string;
  items: {
    id: string;
    title: string;
    path: string;
  }[];
  baseUrl: string;
}

export default function Dropdown({ label, items, baseUrl }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='w-full px-4 py-2 rounded-md border border-primary-200 flex justify-between items-center hover:border-primary-300 transition-colors'
      >
        <span className='text-primary-950'>{label}</span>
        <ChevronDownIcon
          className={`w-5 h-5 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className='absolute z-10 w-full mt-1 bg-white border border-primary-200 rounded-md shadow-lg max-h-60 overflow-y-auto'>
          {items.map((item) => (
            <Link
              key={item.id}
              href={`${baseUrl}/${item.path}`}
              className='block px-4 py-2 text-sm text-primary-950 hover:bg-primary-50 transition-colors'
              onClick={() => setIsOpen(false)}
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
