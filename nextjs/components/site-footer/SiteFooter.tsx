import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Separator } from "@/components/ui/separator"

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
    <footer className="container mx-auto px-4">
      <Separator className="my-4" />
      <div className="flex flex-wrap justify-between items-center py-3">
        <p className="text-sm text-muted-foreground">
          © {currentYear} {siteName}
        </p>

        <Link
          href="/"
          className="flex items-center justify-center mb-3 md:mb-0 md:mr-auto"
        >
          {showLogo && siteLogo ? (
            <Image src={siteLogo} width={250} height={70} alt={siteName} />
          ) : (
            <svg className="w-10 h-8" viewBox="0 0 40 32" fill="currentColor">
              <path d="M31.3 8H8.7c-.4 0-.7.3-.7.7v14.7c0 .3.3.6.7.6h22.6c.4 0 .7-.3.7-.7V8.7c0-.4-.3-.7-.7-.7zM11.2 21.4l5.1-6.9 3.6 4.3 5-6.7 5.1 9.3H11.2z" />
            </svg>
          )}
        </Link>

        <nav>
          <ul className="flex justify-end space-x-4">
            {links.map((link, index) =>
              link?.url && (
                <li key={index}>
                  <Link href={link.url} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.title}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default SiteFooter;
