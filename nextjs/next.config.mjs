const externalDomain = process.env.DRUPAL_AUTH_URI;
const externalUrl = new URL(externalDomain);
const externalDomainHost = externalUrl.hostname;
const externalDomainProtocol = externalUrl.protocol.replace(':', '');

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
    remotePatterns: [
      {
        protocol: externalDomainProtocol,
        hostname: externalDomainHost,
        port: '', // Specify port if needed
        pathname: '/**',
      },
    ],
    formats: ['image/webp'],
  },
  publicRuntimeConfig: {
    LOGO_URL: '/images/logo.svg',
    LOGO_WIDTH: '200',
    LOGO_HEIGHT: '100',
    SITE_NAME: 'DrupalX',
    SHOW_LOGO: '1',
    SHOW_SITE_NAME: '0',
    CTA_LINK_COUNT: '2',
  },
};

export default nextConfig;
