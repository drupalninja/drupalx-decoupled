'use client'

import React from 'react';
import { Navbar, Nav, Offcanvas, Container, NavDropdown } from 'react-bootstrap';
import Button from '../button/Button';
import { MainMenuItem, MainMenuProps } from './Types';
import { usePathname } from 'next/navigation';
import { frontpagePath } from '@/utils/routes';
import Image from 'next/image';
import Link from 'next/link';
import './MainMenu.scss';

const MainMenu: React.FC<MainMenuProps> = ({
  modifier,
  linkModifier,
  siteLogo,
  siteName,
  showLogo,
  menuItems,
  ctaLinkCount,
}) => {
  const pathname = usePathname();

  // Add active trail classes to menu items.
  menuItems = menuItems.map((item, index) => {
    const isCTA = index >= menuItems.length - ctaLinkCount;
    if (item.url === frontpagePath && pathname === '/') {
      item.inActiveTrail = true;
    }
    else if (pathname) {
      item.inActiveTrail = pathname.startsWith(item.url);
    }
    if (item.below && pathname) {
      item.below = item.below.map((subItem) => {
        subItem.inActiveTrail = pathname.startsWith(subItem.url);
        return subItem;
      });
    }
    return { ...item, isCTA };
  });

  return (
    <Navbar bg="white" expand="lg" className={`${modifier} border-bottom`}>
      <Container>
        <Navbar.Brand href="/" className={!showLogo ? "py-4 fs-2 fw-bold" : ""}>
          {showLogo && <Image src={siteLogo ?? ''} alt="Site Name" width={312} height={96} style={{ marginRight: '4px' }} />}
          {!showLogo && siteName}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          className="d-lg-none"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <MainMenuItems items={menuItems} linkModifier={linkModifier} depth={0} ctaLinkCount={ctaLinkCount} isDesktop={false} />
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        <Navbar.Collapse id="navbarSupportedContent" className="d-none d-lg-block">
          <Nav className="ms-auto gap-3 align-items-center">
            <MainMenuItems items={menuItems} linkModifier={linkModifier} depth={0} ctaLinkCount={ctaLinkCount} isDesktop={true} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const MainMenuItems: React.FC<{
  items: (MainMenuItem & { isCTA?: boolean })[];
  linkModifier?: string;
  depth: number;
  isDesktop: boolean;
  ctaLinkCount: number;
}> = ({ items, linkModifier, depth, isDesktop, ctaLinkCount }) => {
  return (
    <>
      {items.map((item, index) => {
        if (item.isCTA) {
          return (
            <Button
              key={index}
              url={item.url}
              text={item.title}
              modifier={`${index === items.length - ctaLinkCount ? "btn-primary" : "btn-outline-primary"} mt-2`}
            />
          );
        }

        if (item.below) {
          return (
            <NavDropdown
              key={index}
              title={item.title}
              id={`nav-dropdown-${index}`}
              className={`fs-6 ${linkModifier ?? ''} ${item.inActiveTrail ? 'active' : ''}`}
            >
              {item.below.map((subItem, subIndex) => (
                <NavDropdown.Item
                  key={subIndex}
                  href={subItem.url}
                  className={`${linkModifier ?? ''} ${subItem.inActiveTrail ? 'active' : ''}`}
                >
                  {subItem.title}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          );
        }

        return (
          <Link
            key={index}
            href={item.url}
            className={`nav-link fs-6 ${linkModifier ?? ''} ${item.inActiveTrail ? 'active' : ''}`}
          >
            {item.title}
          </Link>
        );
      })}
    </>
  );
};

export default MainMenu;
