describe('MainMenu', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?id=navigation-main-navigation--default&viewMode=story');
  });

  it('renders the main menu', () => {
    cy.get('nav').should('exist');
  });

  it('displays the site logo when showLogo is true', () => {
    cy.get('img[alt="Site Logo"]').should('be.visible');
  });

  describe('Mobile menu', () => {
    beforeEach(() => {
      cy.viewport(375, 667); // Mobile size
      cy.get('button.mobile-menu').click();
    });

    it('opens the mobile menu when clicked', () => {
      cy.get('[role="dialog"]').within(() => {
        cy.contains('Home').should('be.visible');
        cy.contains('About Us').should('be.visible');
        cy.contains('Services').should('be.visible');
      });
    });

    it('displays the correct number of top-level menu items', () => {
      cy.get('[role="dialog"] nav ul li').should('have.length', 3); // Excluding CTA
    });
  });

  describe('Desktop menu', () => {
    beforeEach(() => {
      cy.viewport(1200, 800); // Desktop size
    });

    it('displays desktop menu items', () => {
      cy.get('nav .hidden.lg\\:flex').should('be.visible');
      cy.get('nav .hidden.lg\\:flex > div').should('have.length', 2); // Excluding CTA
    });
  });
});
