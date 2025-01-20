'use client';

const PropertyProCardSkeleton = () => {
  return (
    <div className='bg-white rounded-2xl shadow-sm overflow-hidden'>
      <div className='flex md:flex-row flex-col-reverse p-6 gap-6'>
        <div className='relative'>
          <div className='aspect-video w-full md:w-96 bg-primary-100 animate-pulse rounded-lg' />
          <div className='absolute top-4 right-4 bg-white/90 px-3 py-1.5 rounded-lg'>
            <div className='h-6 w-24 bg-primary-100 animate-pulse rounded-lg' />
          </div>
        </div>

        <div className='flex-1 space-y-4'>
          <div className='space-y-2'>
            <div className='flex items-start justify-between'>
              <div>
                <div className='h-6 w-20 bg-primary-100 animate-pulse rounded-md' />
                <div className='mt-2 h-8 w-64 bg-primary-100 animate-pulse rounded-lg' />
              </div>
              <div className='h-5 w-24 bg-primary-100 animate-pulse rounded-lg' />
            </div>

            <div className='flex items-center gap-2'>
              <div className='h-4 w-4 bg-primary-100 animate-pulse rounded-full' />
              <div className='h-4 w-32 bg-primary-100 animate-pulse rounded-lg' />
            </div>
          </div>

          <div className='h-4 w-3/4 bg-primary-100 animate-pulse rounded-lg' />

          <div className='flex items-center gap-6 py-4 border-t border-primary-100'>
            {[1, 2, 3].map((i) => (
              <div key={i} className='flex items-center gap-2'>
                <div className='h-6 w-8 bg-primary-100 animate-pulse rounded-lg' />
                <div className='h-4 w-16 bg-primary-100 animate-pulse rounded-lg' />
              </div>
            ))}
          </div>

          <div className='flex justify-end gap-3 pt-4 border-t border-primary-100'>
            <div className='h-9 w-20 bg-primary-100 animate-pulse rounded-lg' />
            <div className='h-9 w-20 bg-red-100 animate-pulse rounded-lg' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyProCardSkeleton;
