'use client'

import MainMenu from "./main-menu/MainMenu";
import { MainMenuProps } from "./main-menu/Types";
import { useScrollPosition } from '@/hooks/useScrollPosition';

// Define the type for menu data
interface MenuItem {
  title: string;
  url?: string;
  children: {
    title: string;
    url?: string;
  }[];
}

interface MenuData {
  menu?: {
    name?: string;
    items?: MenuItem[];
  };
}

// Define the props for the Header component
type HeaderProps = {
  mainMenu: MenuData['menu'] | null;
  config: {
    LOGO_URL: string;
    LOGO_WIDTH: string;
    LOGO_HEIGHT: string;
    SITE_NAME: string;
    SHOW_LOGO: string;
    SHOW_SITE_NAME: string;
    CTA_LINK_COUNT?: string;
  };
};

export default function Header({ mainMenu, config }: HeaderProps) {
  const scrolled = useScrollPosition();
  const menus = mainMenu?.items;
  const links: MainMenuProps['menuItems'] = menus?.map(item => ({
    title: item.title,
    url: item.url ?? '',
    below: item.children.length > 0 ? item.children.map(child => ({
      title: child.title,
      url: child.url ?? ''
    })) : undefined
  })) || [];

  return (
    <header role="banner" className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mb-8">
      <div className={`lg:container mx-auto transition-all duration-300 ease-in-out ${scrolled ? 'py-2' : 'py-6'}`}>
        <MainMenu
          siteLogo={config.LOGO_URL}
          siteLogoWidth={parseInt(config.LOGO_WIDTH)}
          siteLogoHeight={parseInt(config.LOGO_HEIGHT)}
          siteName={config.SITE_NAME}
          showLogo={config.SHOW_LOGO === '1'}
          showSiteName={config.SHOW_SITE_NAME === '1'}
          menuItems={links}
          modifier="p-0"
          ctaLinkCount={config.CTA_LINK_COUNT ? parseInt(config.CTA_LINK_COUNT) : 2}
        />
      </div>
    </header>
  );
}
