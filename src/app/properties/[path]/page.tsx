import Section from '@/components/ui/Section';
import Breadcrumb from '@/components/ui/Breadcrumb';

export default function PropertyDetailsPage() {
  return (
    <main className='bg-background min-h-screen'>
      <Section className='bg-primary-50 mt-16'>
        <Breadcrumb
          currentPage='Property Details'
          firstPageName='Properties'
          baseUrl='/properties'
        />
        <h1 className='text-4xl font-medium text-primary-950 mt-4'>
          Property Details
        </h1>
      </Section>
    </main>
  );
}
