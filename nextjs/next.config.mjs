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
  publicRuntimeConfig: {
    LOGO_URL: '/images/dc-logo.png',
    LOGO_WIDTH: '100',
    LOGO_HEIGHT: '100',
    SITE_NAME: 'United States Court of Appeals\nDistrict of Columbia Circuit',
    SHOW_LOGO: '1',
    SHOW_SITE_NAME: '1',
    CTA_LINK_COUNT: '0',
  },
};

export default nextConfig;
