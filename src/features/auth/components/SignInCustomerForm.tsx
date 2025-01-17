'use client';

import Link from 'next/link';
import Input from '@/components/ui/Input';
import { FormEvent } from 'react';

export default function SignInCustomerForm() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className='mt-8 w-full max-w-2xl space-y-6'>
      <div className='flex flex-row gap-4'>
        <Input
          id='email'
          name='email'
          type='email'
          label='Email Address'
          placeholder='john@doe.com'
          required
        />

        <Input
          id='password'
          name='password'
          type='password'
          label='Password'
          placeholder='Enter your password'
          required
        />
      </div>

      <div className='flex items-center justify-between text-sm'>
        <Link
          href='/forgot-password'
          className='text-primary-50 hover:text-secondary-300 transition-colors duration-300'
        >
          Forgot password?
        </Link>
      </div>

      <button
        type='submit'
        className='bg-secondary-500 text-primary-50 hover:bg-secondary-600 focus:ring-secondary-500 disabled:hover:bg-secondary-600 w-full rounded-lg px-4 py-3 font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50'
      >
        Sign In
      </button>
    </form>
  );
}
