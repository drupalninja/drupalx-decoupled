describe('Media Component', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?args=&id=editorial-paragraph-media--default&viewMode=story');
  });

  it('should render the media component correctly', () => {
    cy.get('.image img').should('have.attr', 'src');
    cy.get('.image img').should('have.class', 'img-fluid');
    cy.get('.image img').should('have.class', 'rounded');
  });

  context('Responsive Design Tests', () => {
    const sizes = ['iphone-6', 'ipad-2'];

    sizes.forEach((size) => {
      it(`should display correctly on ${size}`, () => {
        cy.viewport(size);
        cy.get('.image img').should('be.visible').and(($img) => {
          const width = $img.width();
          const parentWidth = $img.parent().width();
          expect(width).to.equal(parentWidth);
        });
      });
    });
  });
});
