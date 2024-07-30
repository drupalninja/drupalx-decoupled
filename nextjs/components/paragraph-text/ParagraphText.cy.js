describe('Text Block Component', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?args=&id=editorial-paragraph-text--default&viewMode=story');
  });

  it('should display the correct heading', () => {
    cy.get('h2').should('have.class', 'mb-2 display-3').and('contain.text', 'Title Lorem Ipsum Dolor');
  });

  it('should display the correct body text', () => {
    cy.get('.row .col-lg-10').within(() => {
      cy.get('p').first().should('contain.text', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
      cy.get('p').last().should('contain.text', 'Mauris mollis risus sit amet ligula mattis vehicula.');
    });
  });

  it('should adapt to different screen sizes', () => {
    const sizes = ['iphone-6', 'ipad-2'];

    sizes.forEach((size) => {
      cy.viewport(size);
      cy.get('h2').should('be.visible');
      cy.get('.row .col-lg-10').should('be.visible');
    });
  });
});
