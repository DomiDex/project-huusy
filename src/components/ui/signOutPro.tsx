'use client';

import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function SignOutPro() {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <button
      onClick={handleSignOut}
      className='rounded-lg px-4 py-2 text-base font-medium border transition-colors duration-200 border-primary-950 text-primary-950 hover:bg-primary-950 hover:text-white flex items-center gap-2'
    >
      <ArrowRightOnRectangleIcon className='h-5 w-5' />
      Sign Out
    </button>
  );
}
