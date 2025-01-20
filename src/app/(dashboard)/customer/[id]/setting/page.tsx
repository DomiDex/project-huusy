import Section from '@/components/ui/Section';
import CustomerSettingForm from '@/features/dashboard-customer/components/CustomerSettingForm';
import DashboardHero from '@/features/dashboard-customer/components/DashboardHero';

export default function page() {
  return (
    <div>
      <DashboardHero />
      <Section className='px-8 `' containerClassName='container mx-auto'>
        <CustomerSettingForm />
      </Section>
    </div>
  );
}
