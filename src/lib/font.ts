import localFont from 'next/font/local';

export const customFont = localFont({
  src: [
    {
      path: '../../public/fonts/PPNeueMontreal-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/PPNeueMontreal-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/PPNeueMontreal-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/PPNeueMontreal-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-custom',
});
