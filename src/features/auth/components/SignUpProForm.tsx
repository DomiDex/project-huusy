'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import { signUpPro } from '@/utils/supabase/auth';
import { AuthError } from '@supabase/supabase-js';

export default function SignUpProForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    const fullName = formData.get('fullName') as string;
    const agencyName = formData.get('agencyName') as string;
    const phone = formData.get('phone') as string;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const { error: signUpError } = await signUpPro({
        email,
        password,
        fullName,
        agencyName,
        phone,
      });

      if (signUpError) throw signUpError;

      router.push('/verify-email');
    } catch (err: unknown) {
      if (err instanceof AuthError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred during sign up');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='mt-8 w-full max-w-2xl space-y-6'>
      {error && (
        <div className='bg-red-500/10 text-red-500 rounded-lg p-3 text-sm'>
          {error}
        </div>
      )}

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <Input
          id='fullName'
          name='fullName'
          type='text'
          label='Full Name'
          placeholder='John Doe'
          required
          disabled={isLoading}
          variant='dark'
        />

        <Input
          id='email'
          name='email'
          type='email'
          label='Email Address'
          placeholder='john@doe.com'
          required
          disabled={isLoading}
          variant='dark'
        />

        <Input
          id='agencyName'
          name='agencyName'
          type='text'
          label='Agency Name'
          placeholder='Enter your agency name'
          required
          disabled={isLoading}
          variant='dark'
        />

        <Input
          id='phone'
          name='phone'
          type='tel'
          label='Phone Number'
          placeholder='+66 812345678'
          required
          disabled={isLoading}
          variant='dark'
        />

        <Input
          id='password'
          name='password'
          type='password'
          label='Password'
          placeholder='Enter your password'
          required
          disabled={isLoading}
          variant='dark'
        />

        <Input
          id='confirmPassword'
          name='confirmPassword'
          type='password'
          label='Confirm Password'
          placeholder='Confirm your password'
          required
          disabled={isLoading}
          variant='dark'
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
        disabled={isLoading}
        className='bg-secondary-500 text-primary-50 hover:bg-secondary-600 focus:ring-secondary-500 w-full rounded-lg px-4 py-3 font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50'
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  );
}
