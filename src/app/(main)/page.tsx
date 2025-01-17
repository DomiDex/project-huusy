import Section from '@/components/ui/Section';

export default function Home() {
  return (
    <main className='bg-background min-h-screen'>
      <Section className='bg-primary-50'>
        <h1 className='text-4xl font-bold'>Huusy</h1>
        <p className='text-foreground/80 mt-4 text-lg'>
          Connecting homeowners with trusted professionals
        </p>
      </Section>

      <Section className='bg-white' containerClassName='max-w-6xl'>
        <h2 className='text-foreground text-3xl font-bold'>Our Services</h2>
        <p className='text-foreground/80 mt-4'>
          Find the perfect professional for your home improvement needs
        </p>
      </Section>

      <Section className='bg-secondary-50'>
        <h2 className='text-foreground text-3xl font-bold'>Why Choose Us</h2>
        <p className='text-foreground/80 mt-4'>
          Trusted by thousands of homeowners and professionals
        </p>
      </Section>
    </main>
  );
}
