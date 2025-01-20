'use client';

export default function BreadcrumbSkeleton() {
  return (
    <nav className='flex items-center space-x-2 text-sm text-primary-600'>
      <div className='flex items-center'>
        <div className='h-4 w-4 mr-1 bg-primary-100 animate-pulse rounded' />
        <div className='h-4 w-20 bg-primary-100 animate-pulse rounded' />
      </div>
      <div className='h-4 w-4 bg-primary-100 animate-pulse rounded' />
      <div className='h-4 w-24 bg-primary-100 animate-pulse rounded' />
    </nav>
  );
}
