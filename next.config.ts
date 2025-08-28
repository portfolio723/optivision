import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/optivision',
  assetPrefix: '/optivision/',
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: false, // Fix errors instead of ignoring
  },
  eslint: {
    ignoreDuringBuilds: false, // Fix warnings instead of ignoring
  },
};

export default nextConfig;
