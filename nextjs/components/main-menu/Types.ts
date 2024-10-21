export interface MainMenuItem {
  title: string;
  url: string;
  inActiveTrail?: boolean;
  isExpanded?: boolean;
  below?: MainMenuItem[];
  isCTA?: boolean;
}

export interface MainMenuProps {
  modifier?: string;
  linkModifier?: string;
  siteLogo?: string;
  siteLogoWidth: number;
  siteLogoHeight: number;
  siteName?: string;
  showLogo?: boolean;
  showSiteName?: boolean;
  menuItems: MainMenuItem[];
  ctaLinkCount: number;
}
