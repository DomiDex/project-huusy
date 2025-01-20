import Breadcrumb from '@/components/ui/Breadcrumb';
import Section from '@/components/ui/Section';
import AddPropertyForm from '@/features/dashboard-pro/components/AddPropertyForm';

export default function page() {
  return (
    <Section
      className='flex flex-col gap-4 px-8 py-4 '
      containerClassName='pt-16'
    >
      <div className='flex flex-col gap-4'>
        <Breadcrumb currentPage='Add Property' />
        <h1 className='text-4xl font-medium text-primary-950'>Add Property</h1>
        <AddPropertyForm />
      </div>
    </Section>
  );
}
