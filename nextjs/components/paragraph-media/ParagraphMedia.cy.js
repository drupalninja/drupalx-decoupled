describe('ParagraphMedia Component', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?args=&id=editorial-paragraph-media--default&viewMode=story');
  });

  it('should render the media component correctly', () => {
    cy.get('.container').should('exist');
    cy.get('.w-full').should('exist');
    cy.get('img').should('exist');
    cy.get('img').should('have.class', 'w-full');
    cy.get('img').should('have.class', 'h-auto');
    cy.get('img').should('have.class', 'rounded');
  });

  context('Responsive Design Tests', () => {
    const sizes = ['iphone-6', 'ipad-2'];

    sizes.forEach((size) => {
      it(`should display correctly on ${size}`, () => {
        cy.viewport(size);
        cy.get('img').should('be.visible').and(($img) => {
          const width = $img.width();
          const parentWidth = $img.parent().width();
          expect(width).to.equal(parentWidth);
        });
      });
    });
  });
});
