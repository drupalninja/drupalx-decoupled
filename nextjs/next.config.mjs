const externalDomain = process.env.DRUPAL_AUTH_URI;
const externalDomainHost = new URL(externalDomain).host;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
    formats: ['image/webp'],
  },
};

export default nextConfig;
