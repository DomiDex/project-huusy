'use client';

import Section from '@/components/ui/Section';
import TestimonialCard from './TestimonialCard';

const testimonials = [
  {
    id: 1,
    testimonial:
      "I found my dream home through this platform. The process was seamless and the agent was incredibly helpful. I couldn't be happier with my new home!",
    authorName: 'Sarah Johnson',
    authorTitle: 'Homeowner',
    authorImage: '/images/testimonials/testimonial-1.webp',
  },
  {
    id: 2,
    testimonial:
      'As a real estate agent, this platform has helped me connect with serious buyers and close deals faster. The tools provided are invaluable.',
    authorName: 'Michael Chen',
    authorTitle: 'Real Estate Agent',
    authorImage: '/images/testimonials/testimonial-2.webp',
  },
  {
    id: 3,
    testimonial:
      'The property search features are fantastic! I was able to find exactly what I was looking for within my budget. Highly recommended!',
    authorName: 'Emma Rodriguez',
    authorTitle: 'First-time Buyer',
    authorImage: '/images/testimonials/testimonial-3.webp',
  },
];

export default function TestimonialSection() {
  return (
    <Section className='bg-primary-50 px-8 py-12 md:py-16 lg:py-24'>
      <div className='flex flex-col gap-12'>
        <div className='text-center'>
          <h2 className='text-3xl font-medium text-primary-950'>
            What Our Clients Say
          </h2>
          <p className='text-primary-800 mt-2'>
            Hear from our satisfied customers about their experience
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial.testimonial}
              authorName={testimonial.authorName}
              authorTitle={testimonial.authorTitle}
              authorImage={testimonial.authorImage}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
