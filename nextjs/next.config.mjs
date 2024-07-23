/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/welcome',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/sites/default/files/:path*',
        destination: 'http://drupalx-graphql.ddev.site/sites/default/files/:path*', // Proxy to the external domain
      },
    ];
  },
  images: {
    domains: ['drupalx-graphql.ddev.site'],
  },
};

export default nextConfig;
