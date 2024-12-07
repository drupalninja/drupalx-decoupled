describe('MainMenu', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?id=navigation-main-navigation--default&viewMode=story');
  });

  it('renders the main menu', () => {
    cy.get('nav').should('exist');
  });

  it('displays the site logo when showLogo is true', () => {
    cy.get('img[alt="Site Logo"]').should('be.visible');
    cy.get('img[alt="Site Logo"]').should('have.attr', 'width', '200');
    cy.get('img[alt="Site Logo"]').should('have.attr', 'height', '100');
  });

  describe('Mobile menu', () => {
    beforeEach(() => {
      cy.viewport(375, 667);
      cy.get('button.mobile-menu').click();
    });

    it('opens the mobile menu when clicked', () => {
      cy.get('[role="dialog"]').should('be.visible');
      cy.get('[role="dialog"]').within(() => {
        cy.contains('Menu').should('be.visible');
        cy.contains('Home').should('be.visible');
      });
    });

    it('displays the correct number of top-level menu items', () => {
      cy.get('[role="dialog"] nav ul > li').should('have.length', 4); // Including non-CTA items
    });

    it('displays CTA buttons correctly', () => {
      cy.get('[role="dialog"]').within(() => {
        cy.contains('CTA 1').should('be.visible')
          .should('have.class', 'text-lg');
        cy.contains('CTA 2').should('be.visible')
          .should('have.class', 'text-lg');
      });
    });
  });

  describe('Desktop menu', () => {
    beforeEach(() => {
      cy.viewport(1200, 800);
    });

    it('displays desktop menu items', () => {
      cy.get('nav .hidden.lg\\:flex').should('be.visible');
      cy.get('nav .hidden.lg\\:flex').within(() => {
        cy.contains('Home').should('be.visible');
        cy.contains('Menu Item 1').should('be.visible');
        cy.contains('Menu Item 2').should('be.visible');
        cy.contains('Menu Item 3').should('be.visible');
      });
    });

    it('applies hover states correctly', () => {
      cy.contains('Home').trigger('mouseover')
        .should('have.class', 'hover:text-primary');
    });
  });

  describe('Responsive behavior', () => {
    it('shows mobile menu on small screens and hides desktop menu', () => {
      cy.viewport(375, 667);
      cy.get('button.mobile-menu').should('be.visible');
      cy.get('nav .hidden.lg\\:flex').should('not.be.visible');
    });

    it('shows desktop menu on large screens and hides mobile menu button', () => {
      cy.viewport(1200, 800);
      cy.get('button.mobile-menu').should('not.be.visible');
      cy.get('nav .hidden.lg\\:flex').should('be.visible');
    });
  });
});
