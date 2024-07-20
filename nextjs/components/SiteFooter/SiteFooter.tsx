import React from 'react';
import './SiteFooter.scss';
import Image from 'next/image';

type SiteFooterProps = {
  links: { title: string; url: string }[];
  siteLogo: string;
  modifier?: string;
  menuModifier?: string;
  linkItemModifier?: string;
};

const SiteFooter: React.FC<SiteFooterProps> = ({
  links,
  siteLogo,
  modifier = '',
  menuModifier = '',
  linkItemModifier = 'fs-5 text-white',
}) => {
  return (
    <div className={`bg-black px-2 py-4 ${modifier}`}>
      <div className="container">
        <div className="row d-lg-flex flex-wrap justify-content-lg-between align-items-center">
          <div className="col-lg-3 footer-logo mb-2">
            <Image src={siteLogo} width={312} height={96} alt="Site Logo" className="footer-logo w-100" />
          </div>
          <div className="col-lg-8 text-right justify-lg-content-end">
            <div className="mb-2">
              <nav className={`d-lg-flex justify-content-lg-end ${menuModifier}`}>
                <ul className="nav">
                  {links.map((link, index) => (
                    <li key={index} className={`nav-item ${linkItemModifier}`}>
                      <a href={link.url} className="nav-link text-decoration-none fs-5 text-white">
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteFooter;
