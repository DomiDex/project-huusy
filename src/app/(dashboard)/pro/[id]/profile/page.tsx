import Section from '@/components/ui/Section';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ProProfileForm from '@/features/dashboard-pro/components/ProProfileForm';

export default function page() {
  return (
    <>
      <Section
        className='flex flex-col gap-4 px-8 py-4 '
        containerClassName='pt-16'
      >
        <div className='flex flex-col gap-4'>
          <Breadcrumb currentPage='Profile' />
          <h1 className='text-4xl font-medium text-primary-950'>
            Profile settings
          </h1>
          <ProProfileForm />
        </div>
      </Section>
    </>
  );
}
