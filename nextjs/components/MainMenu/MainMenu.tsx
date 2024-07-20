import React from 'react';
import { Navbar, Nav, Offcanvas, Container, NavDropdown } from 'react-bootstrap';
import { MainMenuItem, MainMenuProps } from './Types';
import Image from 'next/image';
import './MainMenu.scss';

const MainMenu: React.FC<MainMenuProps> = ({
  modifier,
  linkModifier,
  siteLogo,
  menuItems,
}) => {
  return (
    <Navbar bg="primary" expand="lg" variant="dark" className={`py-2 ${modifier}`}>
      <Container>
        <Navbar.Brand href="/">
          <Image src={siteLogo} alt="Site Name" width={312} height={96} style={{ marginRight: '4px' }} />
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
              <MainMenuItems items={menuItems} linkModifier={linkModifier} depth={0} isDesktop={false} />
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        <Navbar.Collapse id="navbarSupportedContent" className="d-none d-lg-block">
          <Nav className="ms-auto gap-4">
            <MainMenuItems items={menuItems} linkModifier={linkModifier} depth={0} isDesktop={true} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const MainMenuItems: React.FC<{
  items: MainMenuItem[];
  linkModifier?: string;
  depth: number;
  isDesktop: boolean;
}> = ({ items, linkModifier, depth, isDesktop }) => {
  return (
    <>
      {items.map((item, index) => (
        item.below ? (
          <NavDropdown
            key={index}
            title={item.title}
            id={`nav-dropdown-${index}`}
            className={`fs-5 ${linkModifier ?? ''} ${item.inActiveTrail ? 'active' : ''}`}
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
        ) : (
          <Nav.Link
            key={index}
            href={item.url}
            className={`nav-link fs-5 ${linkModifier ?? ''} ${item.inActiveTrail ? 'active' : ''}`}
          >
            {item.title}
          </Nav.Link>
        )
      ))}
    </>
  );
};

export default MainMenu;
