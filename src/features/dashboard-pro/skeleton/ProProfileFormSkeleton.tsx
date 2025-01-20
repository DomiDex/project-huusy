'use client';

export default function ProProfileFormSkeleton() {
  return (
    <div className='space-y-8 w-1/2'>
      {/* Personal Information Section */}
      <div className='space-y-4'>
        <div className='h-8 w-48 bg-primary-100 animate-pulse rounded-lg' />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className='space-y-2'>
              <div className='h-5 w-24 bg-primary-100 animate-pulse rounded-md' />
              <div className='h-10 w-full bg-primary-100 animate-pulse rounded-lg' />
            </div>
          ))}
        </div>
      </div>

      {/* Agency Information */}
      <div className='space-y-4'>
        <div className='h-8 w-48 bg-primary-100 animate-pulse rounded-lg' />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {[1, 2].map((i) => (
            <div key={i} className='space-y-2'>
              <div className='h-5 w-24 bg-primary-100 animate-pulse rounded-md' />
              <div className='h-10 w-full bg-primary-100 animate-pulse rounded-lg' />
            </div>
          ))}
        </div>
      </div>

      {/* Bio Section */}
      <div className='space-y-4'>
        <div className='h-8 w-48 bg-primary-100 animate-pulse rounded-lg' />
        <div className='space-y-2'>
          <div className='h-5 w-24 bg-primary-100 animate-pulse rounded-md' />
          <div className='h-32 w-full bg-primary-100 animate-pulse rounded-lg' />
        </div>
      </div>

      {/* Submit Button */}
      <div className='flex justify-end'>
        <div className='h-10 w-32 bg-primary-100 animate-pulse rounded-lg' />
      </div>
    </div>
  );
}
