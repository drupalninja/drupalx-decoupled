export interface MainMenuItem {
  title: string;
  url: string;
  inActiveTrail?: boolean;
  isExpanded?: boolean;
  below?: MainMenuItem[];
}

export interface MainMenuProps {
  modifier?: string;
  linkModifier?: string;
  siteLogo: string;
  menuItems: MainMenuItem[];
}