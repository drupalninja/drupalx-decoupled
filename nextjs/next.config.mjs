const externalDomain = 'http://drupalx-graphql.ddev.site';
const externalDomainHost = 'drupalx-graphql.ddev.site';

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
    ];
  },
  async rewrites() {
    return [
      {
        source: '/sites/default/files/:path*',
        destination: `${externalDomain}/sites/default/files/:path*`, // Proxy to the external domain
      },
    ];
  },
  images: {
    domains: [externalDomainHost],
  },
};

export default nextConfig;
