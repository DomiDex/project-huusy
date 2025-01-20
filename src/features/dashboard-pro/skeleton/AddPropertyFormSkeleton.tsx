'use client';

export default function AddPropertyFormSkeleton() {
  return (
    <div className='w-2/3 space-y-8 mt-8'>
      {/* Image Upload Section */}
      <div className='space-y-4'>
        <div className='h-5 w-32 bg-primary-100 animate-pulse rounded-md' />
        <div className='w-full grid grid-cols-3 gap-4'>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className='aspect-video bg-primary-100 animate-pulse rounded-lg'
            />
          ))}
        </div>
      </div>

      {/* Property Details */}
      <div className='space-y-4'>
        <div className='h-8 w-48 bg-primary-100 animate-pulse rounded-lg' />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className='space-y-2'>
              <div className='h-5 w-24 bg-primary-100 animate-pulse rounded-md' />
              <div className='h-10 w-full bg-primary-100 animate-pulse rounded-lg' />
            </div>
          ))}
        </div>
      </div>

      {/* Description Section */}
      <div className='space-y-4'>
        <div className='h-5 w-32 bg-primary-100 animate-pulse rounded-md' />
        <div className='h-32 w-full bg-primary-100 animate-pulse rounded-lg' />
      </div>

      {/* Submit Button */}
      <div className='flex justify-end'>
        <div className='h-12 w-32 bg-primary-100 animate-pulse rounded-lg' />
      </div>
    </div>
  );
}
