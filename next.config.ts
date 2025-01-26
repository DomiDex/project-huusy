import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
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
    optimizePackageImports: [
      '@headlessui/react',
      '@heroicons/react',
      'framer-motion',
      'embla-carousel-react',
    ],
  },
};

export default nextConfig;
