'use client';

import { useState } from 'react';
import SignInCustomerForm from '@/features/auth/components/SignInCustomerForm';
import SignUpCustomerForm from '@/features/auth/components/SignUpCustomerForm';

export default function TabsAuth() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  return (
    <div className='w-full'>
      <div className='bg-primary-900/30 mb-8 flex space-x-1 rounded-lg p-1'>
        <button
          onClick={() => setActiveTab('login')}
          className={`w-full rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 ${
            activeTab === 'login'
              ? 'bg-secondary-500 text-primary-950'
              : 'text-primary-50 hover:bg-primary-900/50'
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => setActiveTab('register')}
          className={`w-full rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 ${
            activeTab === 'register'
              ? 'bg-secondary-500 text-primary-950'
              : 'text-primary-50 hover:bg-primary-900/50'
          }`}
        >
          Register
        </button>
      </div>

      {/* <button
        type='button'
        className='mb-6 flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 font-medium text-gray-900 transition-colors duration-200 hover:bg-gray-50'
      >
        <Image
          src='/icons/google.svg'
          alt='Google'
          width={20}
          height={20}
          className='h-5 w-5'
        />
        Continue with Google
      </button> */}

      <div className='relative mb-6 flex items-center justify-center text-sm'>
        <span className='bg-primary-50/20 h-[1px] w-1/3'></span>
        <span className='text-primary-50 px-2'>Or continue with</span>
        <span className='bg-primary-50/20 h-[1px] w-1/3'></span>
      </div>

      {activeTab === 'login' ? <SignInCustomerForm /> : <SignUpCustomerForm />}
    </div>
  );
}
