import Section from '@/components/ui/Section';
import Image from 'next/image';
import Link from 'next/link';

export default function VerifyEmailPage() {
  return (
    <Section
      className='relative'
      containerClassName='container mx-auto flex flex-col items-center justify-center'
    >
      <Image
        src='/images/background/auth-bg.webp'
        alt='Verify email background'
        fill
        className='absolute left-0 top-0 object-cover'
        priority
        quality={100}
      />
      <div className='bg-primary-950/50 flex w-full max-w-xl flex-col justify-center space-y-6 rounded-2xl p-8 text-center shadow-md backdrop-blur-md'>
        <h1 className='text-primary-50 text-2xl font-medium md:text-3xl'>
          Check your email
        </h1>
        <p className='text-primary-200'>
          We&apos;ve sent you an email with a verification link. Please check
          your inbox and click the link to verify your account.
        </p>
        <div className='flex flex-col space-y-4'>
          <Link
            href='/customer/register'
            className='bg-secondary-500 text-primary-50 hover:bg-secondary-600 focus:ring-secondary-500 w-full rounded-lg px-4 py-3 font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2'
          >
            Return to Sign In
          </Link>
          <p className='text-primary-200 text-sm'>
            Didn&apos;t receive the email?{' '}
            <button
              type='button'
              className='text-secondary-400 hover:text-secondary-300 font-medium transition-colors duration-300'
            >
              Click here to resend
            </button>
          </p>
        </div>
      </div>
    </Section>
  );
}
