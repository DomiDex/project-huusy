'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import { signInPro } from '@/utils/supabase/auth';
import { AuthError } from '@supabase/supabase-js';

export default function SignInProForm() {
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

    try {
      const { data, error: signInError } = await signInPro({
        email,
        password,
      });

      if (signInError) throw signInError;
      if (!data?.auth.user?.id) throw new Error('No user ID returned');

      // Redirect to the pro dashboard
      router.push(`/pro/${data.auth.user.id}`);
    } catch (err: unknown) {
      if (err instanceof AuthError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred during sign in');
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

      <div className='space-y-4'>
        <Input
          id='email'
          name='email'
          type='email'
          label='Email Address'
          placeholder='Enter your email'
          required
          disabled={isLoading}
        />

        <Input
          id='password'
          name='password'
          type='password'
          label='Password'
          placeholder='Enter your password'
          required
          disabled={isLoading}
        />
      </div>

      <div className='flex items-center justify-between text-sm'>
        <Link
          href='/pro/sign-up'
          className='text-primary-50 hover:text-secondary-300 transition-colors duration-300'
        >
          Create an account
        </Link>
        <Link
          href='/forgot-password'
          className='text-primary-50 hover:text-secondary-300 transition-colors duration-300'
        >
          Forgot password?
        </Link>
      </div>

      <button
        type='submit'
        disabled={isLoading}
        className='bg-secondary-500 text-primary-50 hover:bg-secondary-600 focus:ring-secondary-500 w-full rounded-lg px-4 py-3 font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50'
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  );
}
