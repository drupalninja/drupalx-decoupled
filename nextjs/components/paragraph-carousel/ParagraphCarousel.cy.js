describe('Carousel Component', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?args=&id=editorial-paragraph-carousel--default&viewMode=story');
  });

  it('should display the carousel', () => {
    cy.get('.carousel').should('be.visible');
  });

  it('should display the correct number of carousel items', () => {
    cy.get('.carousel-item').should('have.length.at.least', 1);
  });

  it('should display the first carousel item', () => {
    cy.get('.carousel-item').first().should('be.visible');
  });

  it('should display the carousel controls', () => {
    cy.get('.carousel-prev').should('be.visible');
    cy.get('.carousel-next').should('be.visible');
  });

  it('should navigate to the next slide when the next control is clicked', () => {
    cy.get('.carousel-next').click();
    cy.get('.carousel-item').eq(1).should('be.visible');
  });

  it('should navigate to the previous slide when the previous control is clicked', () => {
    cy.get('.carousel-next').click();
    cy.get('.carousel-prev').click();
    cy.get('.carousel-item').first().should('be.visible');
  });

  it('should display the correct content for each carousel item', () => {
    cy.get('.carousel-item').each(($item) => {
      cy.wrap($item).within(() => {
        cy.get('.carousel-content').should('exist');
        cy.get('h3').should('exist');
        cy.get('p').should('exist');
      });
    });
  });

  context('Responsive Design', () => {
    const viewports = ['iphone-6', 'ipad-2', 'macbook-15'];
    viewports.forEach((viewport) => {
      it(`should display correctly on ${viewport}`, () => {
        cy.viewport(viewport);
        cy.get('.carousel').should('be.visible');
        cy.get('.carousel-item').first().should('be.visible');
        cy.get('.carousel-prev').should('be.visible');
        cy.get('.carousel-next').should('be.visible');
      });
    });

    it('should adjust control positioning on different screen sizes', () => {
      cy.viewport('iphone-6');
      cy.get('.carousel-prev').should('have.class', 'left-2');
      cy.get('.carousel-next').should('have.class', 'right-2');

      cy.viewport('macbook-15');
      cy.get('.carousel-prev').should('have.class', 'md:left-4');
      cy.get('.carousel-next').should('have.class', 'md:right-4');
    });
  });
});
