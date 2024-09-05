describe('Quote Component', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?args=&id=editorial-paragraph-quote--default&viewMode=story');
  });

  it('should render the quote component with correct structure', () => {
    cy.get('.container').should('exist');
    cy.get('.text-center').should('exist');
    cy.get('blockquote').should('exist');
    cy.get('.quote-image img').should('have.attr', 'src').and('include', 'images/card.webp');
  });

  it('should display correctly on a mobile screen', () => {
    cy.viewport('iphone-6');
    cy.get('.col-12').should('exist');
    cy.get('blockquote').should('have.class', 'mb-4');
  });

  it('should display correctly on a desktop screen', () => {
    cy.viewport(1280, 800);
    cy.get('.col-12').should('have.class', 'col-lg-10').and('have.class', 'col-xxl-8');
    cy.get('blockquote').should('have.class', 'mb-4');
  });
});
