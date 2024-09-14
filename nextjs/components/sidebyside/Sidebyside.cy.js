describe('Side-by-Side Component', () => {
  beforeEach(() => {
    cy.visit('iframe.html?args=&id=editorial-side-by-side--default&viewMode=story');
  });

  it('should render the Left variant correctly', () => {
    // Check for container classes
    cy.get('.flex.flex-col.lg\\:flex-row').should('exist');

    // Check for eyebrow
    cy.get('.sidebyside-badge').contains('Featured');

    // Check if media image is present
    cy.get('img').should('have.class', 'w-full').and('have.class', 'h-auto');

    // Check for headline
    cy.get('h2').contains('Side by Side Component');

    // Check for body text
    cy.contains('This is a sample summary for the side-by-side component.');

    // Check for button
    cy.get('a').contains('Learn More');
  });

  it('should render the Right variant correctly', () => {
    cy.visit('/iframe.html?args=&id=editorial-paragraph-side-by-side--right&viewMode=story');

    // Check for container classes including right layout
    cy.get('.flex.flex-col.lg\\:flex-row.lg\\:flex-row-reverse').should('exist');

    // Other checks remain the same as the Left variant
    cy.get('.sidebyside-badge').contains('Featured');
    cy.get('img').should('have.class', 'w-full').and('have.class', 'h-auto');
    cy.get('h2').contains('Side by Side Component');
    cy.contains('This is a sample summary for the side-by-side component.');
    cy.get('a').contains('Learn More');
  });

  context('Responsive Design Tests', () => {
    ['ipad-2', 'iphone-6+', 'macbook-15'].forEach((size) => {
      it(`should display correctly on ${size} screen`, () => {
        cy.viewport(size);

        cy.get('.flex.flex-col.lg\\:flex-row')
          .should('be.visible');

        cy.get('.sidebyside-badge').contains('Featured');
        cy.get('h2').contains('Side by Side Component').should('be.visible');
        cy.get('img')
          .should('have.class', 'w-full')
          .and('have.class', 'h-auto');
        cy.contains('This is a sample summary for the side-by-side component.')
          .should('be.visible');
        cy.get('a')
          .contains('Learn More')
          .should('be.visible');
      });
    });
  });
});
