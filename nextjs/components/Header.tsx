import { ResultOf } from "gql.tada";
import { MainMenuQuery } from "@/graphql/queries";

type MainMenuData = ResultOf<typeof MainMenuQuery>;

// Define the props for the Header component
type HeaderProps = {
  mainMenu: MainMenuData['menu'] | null;
};

export default function Header({ mainMenu }: HeaderProps) {
  const menus = mainMenu?.items;

  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8">
        {`Drupal ❤️ Decoupled`}
      </h1>
      <div className="text-center md:text-left text-lg mt-5 md:pl-8">
        <ul className="flex">
          {menus &&
            menus?.map(function (item) {
              return (
                <li key={item.id} className="mr-6">
                  <a href={item.url}>
                    {item.title}
                  </a>
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
}
