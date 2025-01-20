'use client';

export default function CustomerSettingFormSkeleton() {
  return (
    <div className='space-y-8 w-1/2'>
      {/* Profile Image Skeleton */}
      <div className='flex justify-start mb-8'>
        <div className='w-32 h-32 rounded-full bg-primary-100 animate-pulse' />
      </div>

      {/* Form Fields */}
      <div className='space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {[1, 2].map((i) => (
            <div key={i} className='space-y-2'>
              <div className='h-5 w-24 bg-primary-100 animate-pulse rounded-md' />
              <div className='h-10 w-full bg-primary-100 animate-pulse rounded-lg' />
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className='h-12 w-full bg-primary-100 animate-pulse rounded-lg' />
    </div>
  );
}
