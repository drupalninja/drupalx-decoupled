describe('Paragraph Text Component', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?args=&id=editorial-paragraph-text--default&viewMode=story');
  });

  it('should display the correct title', () => {
    cy.get('h2').should('be.visible').and('have.class', 'mb-2');
  });

  it('should display the eyebrow when present', () => {
    cy.get('h6').should('exist');
  });

  it('should display the correct body text', () => {
    cy.get('.col-lg-10 div').should('exist');
  });

  it('should display buttons when links are provided', () => {
    cy.get('.btn-primary').should('exist');
    cy.get('.btn-secondary').should('exist');
  });

  it('should adapt to different screen sizes', () => {
    const sizes = ['iphone-6', 'ipad-2'];

    sizes.forEach((size) => {
      cy.viewport(size);
      cy.get('.col-lg-10').should('be.visible');
    });
  });
});
