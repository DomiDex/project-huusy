'use client';

import Link from 'next/link';
import Input from '@/components/ui/Input';

export default function SignUpCustomerForm() {
  return (
    <form className='mt-8 w-full space-y-6'>
      <div className='space-y-4'>
        <div className='flex flex-row gap-4'>
          <Input
            id='fullName'
            name='fullName'
            type='text'
            label='Full Name'
            placeholder='Enter your full name'
            required
          />

          <Input
            id='email'
            name='email'
            type='email'
            label='Email Address'
            placeholder='Enter your email'
            required
          />
        </div>
        <div className='flex flex-row gap-4'>
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
      </div>

      <button
        type='submit'
        className='bg-secondary-500 text-primary-50 hover:bg-secondary-600 focus:ring-secondary-500 w-full rounded-lg px-4 py-3 font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50'
      >
        Sign Up
      </button>
    </form>
  );
}
