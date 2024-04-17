/** @type {import('next').NextConfig} */
module.exports = {
  // output: 'export',
  reactStrictMode: true,
  images: {
    // unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'user-images.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'github-production-user-asset-6210df.s3.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
};
