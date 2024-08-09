import { ResultOf } from "gql.tada";
import { FooterMenuQuery } from "@/graphql/queries";
import SiteFooter, { SiteFooterProps } from './site-footer/SiteFooter';

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
      siteLogo={process.env.NEXT_PUBLIC_LOGO_URL}
      siteName={process.env.NEXT_PUBLIC_SITE_NAME}
      showLogo={process.env.NEXT_PUBLIC_SHOW_LOGO === '1'}
      modifier="bg-black"
      menuModifier="fs-5 text-white"
      linkItemModifier="fs-5 text-white"
    />
  )
}
