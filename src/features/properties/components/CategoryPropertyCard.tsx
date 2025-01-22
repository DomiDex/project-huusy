import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface CategoryPropertyCardProps {
  title: string;
  imageUrl: string;
  href: string;
  headingLevel?: 'h2' | 'h3' | 'h4';
  className?: string;
}

export default function CategoryPropertyCard({
  title,
  imageUrl,
  href,
  headingLevel = 'h2',
  className,
}: CategoryPropertyCardProps) {
  const Heading = headingLevel;

  return (
    <Link
      href={href}
      className={cn(
        ' bg-white block p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group',
        className
      )}
    >
      <div className='relative w-full aspect-[4/3] rounded-lg overflow-hidden'>
        <Image
          src={imageUrl}
          alt={title}
          fill
          className='object-cover group-hover:scale-105 transition-all duration-300'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </div>
      <Heading className='mt-4 text-lg font-medium text-primary-950 text-center'>
        {title}
      </Heading>
    </Link>
  );
}
