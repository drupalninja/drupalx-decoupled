describe('Media Component', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?args=&id=editorial-media--default&viewMode=story');
  });

  it('should render the media component correctly', () => {
    cy.get('img').should('exist');
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
