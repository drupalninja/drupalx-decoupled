import { ResultOf } from "gql.tada";
import { MainMenuQuery } from "@/graphql/queries";
import MainMenu from "./main-menu/MainMenu";

type MainMenuData = ResultOf<typeof MainMenuQuery>;

// Define the props for the Header component
type HeaderProps = {
  mainMenu: MainMenuData['menu'] | null;
};

export default function Header({ mainMenu }: HeaderProps) {
  const menus = mainMenu?.items;

  return (
    <header role="banner" className="sticky-top">
      <section className="mb-2 mb-lg-8">
        <MainMenu
          siteLogo="/images/logo.svg"
          menuItems={menus || []}
          modifier="p-0"
        />
      </section>
    </header>
  );
}
