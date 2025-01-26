'use client';

export default function AgentCardSkeleton() {
  return (
    <div className='block bg-white rounded-lg shadow-sm'>
      <div className='p-6'>
        <div className='flex items-center gap-4'>
          <div className='relative w-16 h-16 rounded-full bg-primary-100 animate-pulse' />
          <div className='space-y-2'>
            <div className='h-6 w-48 bg-primary-100 animate-pulse rounded-lg' />
            <div className='h-5 w-32 bg-primary-100 animate-pulse rounded-lg' />
          </div>
        </div>
        <div className='mt-4 h-16 w-full bg-primary-100 animate-pulse rounded-lg' />
        <div className='mt-6'>
          <div className='h-10 w-full bg-primary-100 animate-pulse rounded-lg' />
        </div>
      </div>
    </div>
  );
}
