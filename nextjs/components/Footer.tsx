import { ResultOf } from "gql.tada";
import { FooterMenuQuery } from "@/graphql/queries";
import SiteFooter, { SiteFooterProps } from './site-footer/SiteFooter';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

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
      siteLogo={publicRuntimeConfig.LOGO_URL}
      siteName={publicRuntimeConfig.SITE_NAME}
      showLogo={publicRuntimeConfig.SHOW_LOGO === '1'}
    />
  )
}
