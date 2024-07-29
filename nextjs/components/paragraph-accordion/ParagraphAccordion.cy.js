describe('Accordion Component', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?args=&id=editorial-paragraph-accordion--default&viewMode=story');
  });

  it('should display all accordion items', () => {
    cy.get('.accordion-item').should('have.length', 3);
  });

  it('should have collapsed accordion items initially', () => {
    cy.get('.accordion-button').each(($button) => {
      cy.wrap($button).should('have.class', 'collapsed');
    });
    cy.get('.accordion-collapse').each(($collapse) => {
      cy.wrap($collapse).should('not.have.class', 'show');
    });
  });

  it('should expand and collapse an accordion item when clicked', () => {
    cy.get('.accordion-button').first().click();
    cy.get('.accordion-collapse').first().should('have.class', 'show');
    cy.get('.accordion-button').first().should('not.have.class', 'collapsed');

    cy.get('.accordion-button').first().click();
    cy.get('.accordion-collapse').first().should('not.have.class', 'show');
    cy.get('.accordion-button').first().should('have.class', 'collapsed');
  });

  it('should allow multiple accordion items to be expanded simultaneously', () => {
    cy.get('.accordion-button').each(($button, index) => {
      cy.wrap($button).click();
      cy.get('.accordion-collapse').eq(index).should('have.class', 'show');
    });
  });

  context('Responsive Design', () => {
    const viewports = [
      { width: 320, height: 568 }, // iPhone 5
      { width: 768, height: 1024 }, // iPad
      { width: 1024, height: 768 }, // Laptop
      { width: 1920, height: 1080 }, // Desktop
    ];

    viewports.forEach(({ width, height }) => {
      it(`should render correctly on ${width}x${height} resolution`, () => {
        cy.viewport(width, height);
        cy.get('.accordion').should('be.visible');
        // Add more assertions for responsive design expectations
      });
    });
  });
});
