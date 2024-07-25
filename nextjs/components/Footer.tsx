import { ResultOf } from "gql.tada";
import { FooterMenuQuery } from "@/graphql/queries";
import SiteFooter, {SiteFooterProps} from './site-footer/SiteFooter';

type FooterMenuData = ResultOf<typeof FooterMenuQuery>;

export default function Footer({ footerMenu }: Readonly<{ footerMenu: FooterMenuData['menu'] | null }>) {
  const menus = footerMenu?.items;
  
  const links: SiteFooterProps['links'] = menus?.map(item => ({
    title: item.title,
    url: item.url,
    children: item.children[0] || { title: '', url: null }
  })) || [];
  
  return (
    <SiteFooter
      links={links}
      siteLogo="/images/logo.svg"
      modifier="bg-black"
      menuModifier="fs-5 text-white"
      linkItemModifier="fs-5 text-white"
    />    
  )
}
