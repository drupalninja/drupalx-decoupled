describe('Carousel Component', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?args=&id=editorial-paragraph-carousel--default&viewMode=story');
  });

  it('should display the carousel', () => {
    cy.get('.carousel-single').should('be.visible');
  });

  it('should display the correct number of carousel items', () => {
    cy.get('.carousel-item').should('have.length', 3);
  });

  it('should mark the first carousel item as active', () => {
    cy.get('.carousel-item:first-child').should('have.class', 'active');
  });

  it('should display the carousel controls', () => {
    cy.get('.carousel-control-prev').should('be.visible');
    cy.get('.carousel-control-next').should('be.visible');
  });

  it('should navigate to the next slide when the next control is clicked', () => {
    cy.get('.carousel-single .carousel-control-next').first().click();
    cy.get('.carousel-item:nth-child(2)').should('have.class', 'active');
  });

  it('should navigate to the previous slide when the previous control is clicked', () => {
    cy.get('.carousel-single .carousel-control-prev').first().click();
    cy.get('.carousel-item:first-child').should('have.class', 'active');
  });

  context('Responsive Design', () => {
    it('should display correctly on mobile devices', () => {
      cy.viewport('iphone-6');
      cy.get('.carousel-single').should('be.visible');
      cy.get('.carousel-item').should('be.visible');
    });

    it('should display correctly on tablet devices', () => {
      cy.viewport('ipad-2');
      cy.get('.carousel-single').should('be.visible');
      cy.get('.carousel-item').should('be.visible');
    });

    it('should display correctly on desktop devices', () => {
      cy.viewport('macbook-15');
      cy.get('.carousel-single').should('be.visible');
      cy.get('.carousel-item').should('be.visible');
    });
  });
});
