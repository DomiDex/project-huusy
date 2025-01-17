'use client';

import Link from 'next/link';
import Input from '@/components/ui/Input';
import { FormEvent } from 'react';

export default function SignUpProForm() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add form submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className='mt-8 w-full max-w-2xl space-y-6'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <Input
          id='fullName'
          name='fullName'
          type='text'
          label='Full Name'
          placeholder='John Doe'
          required
        />

        <Input
          id='email'
          name='email'
          type='email'
          label='Email Address'
          placeholder='john@doe.com'
          required
        />

        <Input
          id='agencyName'
          name='agencyName'
          type='text'
          label='Agency Name'
          placeholder='Enter your agency name'
          required
        />

        <Input
          id='phone'
          name='phone'
          type='tel'
          label='Phone Number'
          placeholder='+66 812345678'
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

        <Input
          id='confirmPassword'
          name='confirmPassword'
          type='password'
          label='Confirm Password'
          placeholder='Confirm your password'
          required
        />
      </div>

      <div className='flex items-center justify-between text-sm'>
        <Link
          href='/pro/sign-in'
          className='text-primary-50 hover:text-secondary-300 transition-colors duration-300'
        >
          Already have an account?
        </Link>
      </div>

      <button
        type='submit'
        className='bg-secondary-500 text-primary-50 hover:bg-secondary-600 focus:ring-secondary-500 w-full rounded-lg px-4 py-3 font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50'
      >
        Create Account
      </button>
    </form>
  );
}
