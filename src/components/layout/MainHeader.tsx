'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import Container from '../ui/Container';
import Image from 'next/image';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

type MainHeaderProps = {
  variant?: 'light' | 'dark';
  className?: string;
};

export default function MainHeader({
  variant = 'dark',
  className,
}: MainHeaderProps) {
  const isLight = variant === 'light';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-300',
        isLight
          ? 'bg-primary-50/50 text-primary-950 backdrop-blur-sm border-b border-primary-100'
          : 'bg-primary-950/50 text-white backdrop-blur-sm border-b border-primary-600',
        className
      )}
    >
      <Container className='flex h-16 items-center justify-between'>
        <Link href='/' className='text-2xl font-bold'>
          <Image
            src={isLight ? '/logo/light-logo.svg' : '/logo/dark-logo.svg'}
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
          <NavigationLinks isLight={isLight} />
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className='absolute top-16 left-0 right-0 md:hidden'>
            <nav
              className={cn(
                'flex flex-col space-y-4 p-4',
                isLight
                  ? 'bg-primary-50/95 backdrop-blur-md border-b border-primary-100'
                  : 'bg-primary-950/95 backdrop-blur-md border-b border-primary-600'
              )}
            >
              <NavigationLinks isLight={isLight} isMobile />
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}

// Separate component for navigation links
function NavigationLinks({
  isLight,
  isMobile = false,
}: {
  isLight: boolean;
  isMobile?: boolean;
}) {
  return (
    <>
      <Link
        href='/rent'
        className={cn(
          'text-base font-medium transition-colors duration-200',
          isLight
            ? 'text-primary-950 hover:text-secondary-500'
            : 'text-primary-50 hover:text-secondary-300'
        )}
      >
        Rent
      </Link>
      <Link
        href='/buy'
        className={cn(
          'text-base font-medium transition-colors duration-200',
          isLight
            ? 'text-primary-950 hover:text-secondary-500'
            : 'text-primary-50 hover:text-secondary-300'
        )}
      >
        Buy
      </Link>
      <Link
        href='/properties'
        className={cn(
          'text-base font-medium transition-colors duration-200',
          isLight
            ? 'text-primary-950 hover:text-secondary-500'
            : 'text-primary-50 hover:text-secondary-300'
        )}
      >
        All Properties
      </Link>
      <Link
        href='/agents'
        className={cn(
          'text-base font-medium transition-colors duration-200',
          isLight
            ? 'text-primary-950/70 hover:text-primary-950'
            : 'text-primary-50 hover:text-secondary-300'
        )}
      >
        Agents
      </Link>
      <div
        className={cn(
          'flex',
          isMobile ? 'flex-col space-y-4' : 'items-center space-x-4'
        )}
      >
        <Link
          href='/customer/register'
          className={cn(
            'rounded-lg px-4 py-2 text-base font-medium transition-colors duration-200 flex items-center gap-2',
            isLight
              ? 'text-primary-950 hover:bg-secondary-500'
              : 'text-primary-50 hover:text-secondary-300'
          )}
        >
          <UserCircleIcon className='h-5 w-5' />
          <span>Sign In</span>
        </Link>
        <Link
          href='/pro/sign-up'
          className={cn(
            'rounded-lg px-4 py-2 text-base font-medium border transition-colors duration-200',
            isLight
              ? 'border-primary-950 text-primary-950 hover:bg-primary-950 hover:text-white'
              : 'border-secondary-400 text-secondary-400 hover:bg-secondary-400 hover:text-primary-50'
          )}
        >
          List Your Property
        </Link>
      </div>
    </>
  );
}
