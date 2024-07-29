describe('Side-by-Side Component', () => {
  beforeEach(() => {
    cy.visit('iframe.html?args=&id=editorial-paragraph-side-by-side--default&viewMode=story');
  });

  it('should render the Left variant correctly', () => {
    // Check for headline
    cy.get('.side-by-side .row').within(() => {
      cy.contains('Side by Side Component');
    });

    // Check for eyebrow
    cy.get('.badge').contains('Featured');

    // Check if media image is present
    cy.get('.side-by-side .shadow img').should('have.attr', 'src').and('include', 'images/card.webp');

    // Check for body text
    cy.contains('This is a sample summary for the side-by-side component.');

    // Check for button
    cy.get('.side-by-side .btn-primary').contains('Learn More');
  });

  it('should render the Right variant correctly', () => {
    cy.visit('/iframe.html?args=&id=editorial-paragraph-side-by-side--right&viewMode=story');

    // Check for headline
    cy.get('.side-by-side .row').within(() => {
      cy.contains('Side by Side Component');
    });

    // Check for eyebrow
    cy.get('.badge').contains('Featured');

    // Check if media image is present
    cy.get('.side-by-side .shadow img').should('have.attr', 'src').and('include', 'images/card.webp');

    // Check for body text
    cy.contains('This is a sample summary for the side-by-side component.');

    // Check for button
    cy.get('.side-by-side .btn-primary').contains('Learn More');

    // Check if flex-lg-row-reverse is applied correctly
    cy.get('.side-by-side .row').should('have.css', 'flex-direction', 'row-reverse');
  });

  context('Responsive Design Tests', () => {
    ['ipad-2', 'iphone-6+', 'macbook-15'].forEach((size) => {
      it(`should display correctly on ${size} screen`, () => {
        cy.viewport(size);

        cy.get('.side-by-side')
          .should('be.visible');

        cy.get('.badge').contains('Featured');
        cy.contains('Side by Side Component').should('be.visible');
        cy.get('.side-by-side .shadow img')
          .should('have.attr', 'src').and('include', 'images/card.webp');
        cy.contains('This is a sample summary for the side-by-side component.')
          .should('be.visible');
        cy.get('.side-by-side .btn-primary')
          .contains('Learn More')
          .should('be.visible');
      });
    });
  });
});
