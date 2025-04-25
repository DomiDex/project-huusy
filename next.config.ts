import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    // TODO: Re-enable after addressing potential TS errors post-upgrade.
    // ignoreBuildErrors: true,
  },
  eslint: {
    // TODO: Re-enable after addressing potential Lint errors post-upgrade.
    // ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lzkhitefzcwsljkltyqa.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  experimental: {
    // These are optimized by default in Next.js 15, but keeping them is fine.
    optimizePackageImports: [
      '@headlessui/react',
      '@heroicons/react',
      'framer-motion',
      'embla-carousel-react',
    ],
  },
};

export default nextConfig;
