'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import Container from '../ui/Container';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

type ProHeaderProps = {
  className?: string;
};

export default function ProHeader({ className }: ProHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-300',
        'bg-primary-50/50 text-primary-950 backdrop-blur-sm border-b border-primary-100',
        className
      )}
    >
      <Container className='flex h-16 items-center justify-between'>
        <Link href='/pro/dashboard' className='text-2xl font-bold'>
          <Image
            src='/logo/light-logo.svg'
            alt='Huusy Logo'
            width={100}
            height={100}
            className='h-8 w-auto'
            priority
          />
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className='md:hidden p-2 rounded-lg hover:bg-primary-800/50'
          aria-label='Toggle menu'
        >
          {isMenuOpen ? (
            <XMarkIcon className='h-6 w-6' />
          ) : (
            <Bars3Icon className='h-6 w-6' />
          )}
        </button>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center space-x-8'>
          <ProNavigationLinks />
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className='absolute top-16 left-0 right-0 md:hidden'>
            <nav className='flex flex-col space-y-4 p-4 bg-primary-50/95 backdrop-blur-md border-b border-primary-100'>
              <ProNavigationLinks isMobile />
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}

function ProNavigationLinks({ isMobile = false }: { isMobile?: boolean }) {
  return (
    <>
      <Link
        href='/pro/dashboard'
        className='text-base font-medium transition-colors duration-200 text-primary-950 hover:text-secondary-500'
      >
        Dashboard
      </Link>
      <Link
        href='/pro/properties'
        className='text-base font-medium transition-colors duration-200 text-primary-950 hover:text-secondary-500'
      >
        Add Property
      </Link>

      <div
        className={cn(
          'flex',
          isMobile ? 'flex-col space-y-4' : 'items-center space-x-4'
        )}
      >
        <Link
          href='/pro/profile'
          className='rounded-lg px-4 py-2 text-base font-medium transition-colors duration-200 text-primary-950 hover:bg-secondary-500'
        >
          Profile
        </Link>
        <button className='rounded-lg px-4 py-2 text-base font-medium border transition-colors duration-200 border-primary-950 text-primary-950 hover:bg-primary-950 hover:text-white'>
          Sign Out
        </button>
      </div>
    </>
  );
}
