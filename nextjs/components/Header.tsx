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
    <header role="banner" className="sticky-top">
      <section className="mb-2 mb-lg-8">
        <MainMenu
          siteLogo={publicRuntimeConfig.LOGO_URL}
          siteName={publicRuntimeConfig.SITE_NAME}
          showLogo={publicRuntimeConfig.SHOW_LOGO === '1'}
          menuItems={links}
          modifier="p-0"
          ctaLinkCount={2}
        />
      </section>
    </header>
  );
}
