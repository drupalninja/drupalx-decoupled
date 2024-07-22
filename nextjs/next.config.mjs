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
  images: {
    domains: ['drupalx-graphql.ddev.site'],
  },
};

export default nextConfig;
