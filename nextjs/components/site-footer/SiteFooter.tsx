import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export type SiteFooterProps = {
  links: { title: string; url: string | null }[];
  siteLogo?: string;
  siteName?: string;
  showLogo?: boolean;
  currentYear?: number;
};

const SiteFooter: React.FC<SiteFooterProps> = ({
  links,
  siteLogo,
  siteName = '',
  showLogo = true,
  currentYear = new Date().getFullYear(),
}) => {
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top container">
      <p className="col-md-4 mb-0 text-body-secondary">
        © {currentYear} {siteName}
      </p>

      <Link
        href="/"
        className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
      >
        {showLogo && siteLogo ? (
          <Image src={siteLogo} width={250} height={70} alt={siteName} />
        ) : (
          <svg className="bi me-2" width="40" height="32">
            <use xlinkHref="#bootstrap"></use>
          </svg>
        )}
      </Link>

      <ul className="nav col-md-4 justify-content-end">
        {links.map((link, index) =>
          link?.url && (
            <li key={index} className="nav-item">
              <Link href={link.url} className="nav-link px-2 text-body-secondary">
                {link.title}
              </Link>
            </li>
          )
        )}
      </ul>
    </footer>
  );
};

export default SiteFooter;
