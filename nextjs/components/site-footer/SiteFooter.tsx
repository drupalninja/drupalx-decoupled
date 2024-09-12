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
      <div className="flex flex-col items-center space-y-4 pt-3 pb-10 md:flex-row md:justify-between md:space-y-0">
        <div className="text-center md:text-left">
          <p className="text-muted-foreground">
            © {currentYear} {siteName}
          </p>
        </div>

        <div className="flex justify-center">
          <Link href="/" className="flex items-center justify-center">
            {showLogo && siteLogo && (
              <Image src={siteLogo} width={250} height={70} alt={siteName} />
            )}
          </Link>
        </div>

        <nav>
          <ul className="flex flex-wrap justify-center space-x-4 md:justify-end">
            {links.map((link, index) =>
              link?.url && (
                <li key={index}>
                  <Link href={link.url} className="text-muted-foreground hover:text-foreground">
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
