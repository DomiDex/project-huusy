import Image from 'next/image';

interface TestimonialCardProps {
  testimonial: string;
  authorName: string;
  authorTitle: string;
  authorImage: string;
}

export default function TestimonialCard({
  testimonial,
  authorName,
  authorTitle,
  authorImage,
}: TestimonialCardProps) {
  return (
    <div className='flex flex-col gap-4'>
      <div className='bg-white rounded-lg p-6 shadow-sm'>
        <p className='text-primary-950 italic'>{testimonial}</p>
      </div>
      <div className='flex flex-row items-center gap-4'>
        <div className='relative w-12 h-12'>
          <Image
            src={authorImage}
            alt={authorName}
            fill
            priority
            quality={100}
            sizes='48px'
            className='rounded-full object-cover'
          />
        </div>
        <div className='flex flex-col'>
          <p className='text-primary-950 font-heading text-lg'>{authorName}</p>
          <p className='text-primary-600 text-sm'>{authorTitle}</p>
        </div>
      </div>
    </div>
  );
}
