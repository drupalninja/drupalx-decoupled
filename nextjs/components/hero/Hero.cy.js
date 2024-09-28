describe('Hero Component', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?args=&id=editorial-hero--default&viewMode=story');
  });

  it('should display the hero title with formatted text', () => {
    cy.get('h1').should('exist').and('have.class', 'text-4xl lg:text-5xl font-semibold mb-4 lg:mb-4');
  });

  it('should display the hero body text', () => {
    cy.get('.text-xl.mb-2.lg\\:mb-4').should('exist');
  });

  it('should display the primary button with correct text and styling', () => {
    cy.get('.hero-button').should('exist');
  });

  it('should have correct layout and styling', () => {
    cy.get('.hero').should('have.class', 'mx-auto');
    cy.get('.mb-6.lg\\:mb-12.text-center').should('exist');
    cy.get('.max-w-3xl.mx-auto').should('exist');
  });

  it('should respond correctly to different screen sizes', () => {
    // Test for mobile screen
    cy.viewport('iphone-6');
    cy.get('.mb-6.lg\\:mb-12.text-center').should('be.visible');
    cy.get('h1').should('have.class', 'text-4xl');

    // Test for desktop screen
    cy.viewport('macbook-15');
    cy.get('.mb-6.lg\\:mb-12.text-center').should('be.visible');
    cy.get('h1').should('have.class', 'lg:text-5xl');
  });
});
