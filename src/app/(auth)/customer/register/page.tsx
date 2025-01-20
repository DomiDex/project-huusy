import Section from '@/components/ui/Section';
import Image from 'next/image';
import TabsAuth from '@/components/ui/TabsAuth';

export default function Page() {
  return (
    <Section
      className='relative h-screen'
      containerClassName='container mx-auto flex  flex-col items-center justify-center py-8 h-full'
    >
      <div className='absolute inset-0 h-full w-full'>
        <Image
          src='/images/background/auth-bg.webp'
          alt='Sign in background'
          fill
          className='object-cover w-full h-full'
          priority
          quality={100}
        />
      </div>
      <div className='relative bg-primary-950/50 flex w-full max-w-2xl flex-col justify-center space-y-4 rounded-2xl p-8 shadow-md backdrop-blur-md'>
        <h1 className='text-primary-50 text-center text-2xl font-medium md:text-3xl'>
          Welcome to Huusy
        </h1>
        <TabsAuth />
      </div>
    </Section>
  );
}
