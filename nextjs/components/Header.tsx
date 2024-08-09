import { ResultOf } from "gql.tada";
import { MainMenuQuery } from "@/graphql/queries";
import MainMenu from "./main-menu/MainMenu";
import { MainMenuProps } from "./main-menu/Types";

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
          siteLogo={process.env.NEXT_PUBLIC_LOGO_URL}
          siteName={process.env.NEXT_PUBLIC_SITE_NAME}
          showLogo={process.env.NEXT_PUBLIC_SHOW_LOGO === '1'}
          menuItems={links}
          modifier="p-0"
        />
      </section>
    </header>
  );
}
