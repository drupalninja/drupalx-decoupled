import { ResultOf } from "gql.tada";
import { MainMenuQuery } from "@/graphql/queries";
import MainMenu from "./main-menu/MainMenu";
import { MainMenuProps } from "./main-menu/Types";
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

type MainMenuData = ResultOf<typeof MainMenuQuery>;

// Define the props for the Header component
type HeaderProps = {
  mainMenu: MainMenuData['menu'] | null;
};

export default function Header({ mainMenu }: HeaderProps) {
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
    <header role="banner" className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mb-8">
      <div className="container mx-auto py-6">
        <MainMenu
          siteLogo={publicRuntimeConfig.LOGO_URL}
          siteName={publicRuntimeConfig.SITE_NAME}
          showLogo={publicRuntimeConfig.SHOW_LOGO === '1'}
          showSiteName={publicRuntimeConfig.SHOW_SITE_NAME === '1'}
          menuItems={links}
          modifier="p-0"
          ctaLinkCount={publicRuntimeConfig.CTA_LINK_COUNT || 2}
        />
      </div>
    </header>
  );
}
