describe('Quote Component', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?args=&id=editorial-paragraph-quote--default&viewMode=story');
  });

  it('should render the quote component with correct structure', () => {
    cy.get('.text-center').should('exist');
    cy.get('.quote-logo img').should('have.attr', 'src').and('include', 'images/card.webp');
    cy.get('blockquote').should('exist');
    cy.get('blockquote .material-symbols-outlined').should('contain.text', 'format_quote');
    cy.get('.quote-image img').should('have.attr', 'src').and('include', 'images/card.webp');
    cy.get('.quote-text .fw-semibold').should('contain.text', 'Author Name');
    cy.get('blockquote p').should('contain.text', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mauris mi, aliquam');
  });

  it('should display correctly on a mobile screen', () => {
    cy.viewport('iphone-6');
    cy.get('.text-center').should('have.class', 'd-flex').and('have.class', 'justify-content-center');
    cy.get('.quote-logo').should('have.class', 'mx-auto').and('have.class', 'mb-2');
    cy.get('blockquote').should('have.class', 'fs-4').and('have.class', 'mb-3');
  });

  it('should display correctly on a desktop screen', () => {
    cy.viewport(1280, 800);
    cy.get('.text-center').should('have.class', 'd-flex').and('have.class', 'justify-content-center');
    cy.get('.quote-logo').should('have.class', 'col-lg-3').and('have.class', 'mx-auto').and('have.class', 'mb-2');
    cy.get('blockquote').should('have.class', 'fs-4').and('have.class', 'mb-3');
  });
});
