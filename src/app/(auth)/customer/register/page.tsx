import Section from '@/components/ui/Section';
import Image from 'next/image';
import TabsAuth from '@/components/ui/TabsAuth';

export default function Page() {
  return (
    <Section
      className='relative'
      containerClassName='container mx-auto flex flex-col items-center justify-center'
    >
      <Image
        src='/images/background/auth-bg.webp'
        alt='Sign in background'
        fill
        className='absolute left-0 top-0 object-cover'
        priority
        quality={100}
      />
      <div className='bg-primary-950/50 flex w-full max-w-2xl flex-col justify-center space-y-4 rounded-2xl p-8 shadow-md backdrop-blur-md'>
        <h1 className='text-primary-50 text-center text-2xl font-medium md:text-3xl'>
          Welcome to Huusy
        </h1>
        <TabsAuth />
      </div>
    </Section>
  );
}
