import SiteFooter from './SiteFooter/SiteFooter';

export default function Footer() {
  
  return (
    <SiteFooter
      links={[
        { title: 'Home', url: '/' },
        { title: 'About', url: '/about' },
        { title: 'Services', url: '/services' },
        { title: 'Contact', url: '/contact' },
      ]}
      siteLogo="/images/logo.svg"
      modifier="bg-black"
      menuModifier="fs-5 text-white"
      linkItemModifier="fs-5 text-white"
    />    
  )
}
