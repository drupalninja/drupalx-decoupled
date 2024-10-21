describe('MainMenu', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?args=&id=navigation-main-navigation--default&viewMode=story');
  });

  it('renders the main menu', () => {
    cy.get('nav').should('exist');
  });

  it('displays the site logo', () => {
    cy.get('img[alt="Site Logo"]').should('be.visible');
  });

  describe('Mobile menu', () => {
    beforeEach(() => {
      cy.viewport(375, 667); // Set viewport to mobile size
      cy.get('button.mobile-menu').should('exist').click();
    });

    it('opens the mobile menu when clicked', () => {
      cy.get('[role="dialog"]').within(() => {
        cy.contains('Home').should('be.visible');
        cy.contains('Menu Item 1').should('be.visible');
        cy.contains('Menu Item 2').should('be.visible');
        cy.contains('Menu Item 3').should('be.visible');
      });
    });

    it('displays the correct number of top-level menu items', () => {
      cy.get('[role="dialog"] > nav > ul > li').should('have.length', 4);
    });

    it('highlights the active menu item', () => {
      cy.contains('Home').should('have.class', 'font-bold');
    });
  });

  describe('Desktop menu', () => {
    beforeEach(() => {
      cy.viewport(1200, 800); // Set viewport to desktop size
    });

    it('displays desktop menu items', () => {
      cy.get('nav .hidden.lg\\:flex').should('be.visible');
      cy.get('nav .hidden.lg\\:flex > div > div').should('have.length', 4);
    });

    it('shows dropdown on hover', () => {
      cy.contains('Menu Item 1').trigger('mouseover');
      cy.get('.absolute.left-0.mt-2.w-48').should('exist');
      cy.contains('Vestibulum ac diam').should('exist');
      cy.contains('Mauris blandit aliquet').should('exist');
      cy.contains('Pellentesque in').should('exist');
    });
  });
});
