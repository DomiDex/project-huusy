'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import { signUpCustomer } from '@/utils/supabase/auth';
import { AuthError } from '@supabase/supabase-js';

export default function SignUpCustomerForm() {
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
    const username = formData.get('username') as string;

    // Form validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    try {
      const { error: signUpError } = await signUpCustomer({
        email,
        password,
        username,
      });

      if (signUpError) throw signUpError;

      router.push('/verify-email/customer');
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
    <form onSubmit={handleSubmit} className='mt-8 w-full space-y-6'>
      {error && (
        <div className='bg-red-500/10 text-red-500 rounded-lg p-3 text-sm'>
          {error}
        </div>
      )}

      <div className='space-y-4'>
        <div className='flex flex-row gap-4'>
          <Input
            id='username'
            name='username'
            type='text'
            label='Username'
            placeholder='Choose a username'
            required
            disabled={isLoading}
          />

          <Input
            id='email'
            name='email'
            type='email'
            label='Email Address'
            placeholder='Enter your email'
            required
            disabled={isLoading}
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
            disabled={isLoading}
          />

          <Input
            id='confirmPassword'
            name='confirmPassword'
            type='password'
            label='Confirm Password'
            placeholder='Confirm your password'
            required
            disabled={isLoading}
          />
        </div>
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
