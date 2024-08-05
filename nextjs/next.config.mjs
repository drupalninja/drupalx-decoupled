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
  env: {
    NEXT_PUBLIC_LOGO_URL: process.env.NEXT_PUBLIC_LOGO_URL ?? '/images/logo.svg',
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME ?? 'DrupalX',
    NEXT_PUBLIC_SHOW_LOGO: process.env.NEXT_PUBLIC_SHOW_LOGO ?? '1',
  },
};

export default nextConfig;
