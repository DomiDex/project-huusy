import Section from '@/components/ui/Section';

export default function Home() {
  return (
    <main className='flex flex-col'>
      <Section
        className='bg-gray-50'
        containerClassName='flex flex-col items-center justify-center text-center'
      >
        <h1 className='text-4xl font-bold mb-4'>Find Your Dream Home</h1>
        <p className='text-lg text-gray-600 max-w-2xl'>
          Discover the perfect property from our extensive collection of homes,
          apartments, and luxury estates
        </p>
      </Section>

      <Section
        className='bg-white'
        containerClassName='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
      >
        <div className='p-6 bg-gray-50 rounded-lg'>
          <h2 className='text-2xl font-semibold mb-2'>Featured Properties</h2>
          <p className='text-gray-600'>
            Explore our handpicked selection of premium properties
          </p>
        </div>
        <div className='p-6 bg-gray-50 rounded-lg'>
          <h2 className='text-2xl font-semibold mb-2'>New Listings</h2>
          <p className='text-gray-600'>
            Be the first to see our newest properties on the market
          </p>
        </div>
        <div className='p-6 bg-gray-50 rounded-lg'>
          <h2 className='text-2xl font-semibold mb-2'>Popular Areas</h2>
          <p className='text-gray-600'>
            Browse properties in the most sought-after neighborhoods
          </p>
        </div>
      </Section>
    </main>
  );
}
