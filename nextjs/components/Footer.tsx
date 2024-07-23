import { ResultOf } from "gql.tada";
import { FooterMenuQuery } from "@/graphql/queries";
import SiteFooter from './site-footer/SiteFooter';

type FooterMenuData = ResultOf<typeof FooterMenuQuery>;

export default function Footer({ footerMenu }: Readonly<{ footerMenu: FooterMenuData['menu'] | null }>) {
  const menus = footerMenu?.items;
  
  return (
    <SiteFooter
      links={menus || []}
      siteLogo="/images/logo.svg"
      modifier="bg-black"
      menuModifier="fs-5 text-white"
      linkItemModifier="fs-5 text-white"
    />    
  )
}
