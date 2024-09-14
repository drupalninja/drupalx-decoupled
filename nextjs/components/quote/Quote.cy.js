describe('Quote Component', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?args=&id=editorial-quote--default&viewMode=story');
  });

  it('should render the quote component with correct structure', () => {
    cy.get('.container').should('exist');
    cy.get('.flex.justify-center').should('exist');
    cy.get('.quote-card').should('exist');
    cy.get('.quote-content').should('exist');
  });

  it('should display the logo if provided', () => {
    cy.get('.text-center.mb-4 img').should('exist');
  });

  it('should display the quote text', () => {
    cy.get('blockquote p').should('exist');
  });

  it('should display the author information', () => {
    cy.get('img').should('exist');
    cy.get('.font-bold').should('exist');
    cy.get('.text-sm.text-muted-foreground').should('exist');
  });

  it('should be responsive', () => {
    // Test for mobile view
    cy.viewport('iphone-6');
    cy.get('.quote-card').should('have.class', 'w-full');

    // Test for desktop view
    cy.viewport(1280, 800);
    cy.get('.quote-card').should('have.class', 'lg:w-4/5');
  });
});
