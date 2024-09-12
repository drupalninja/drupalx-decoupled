describe('ParagraphAccordion Component', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?args=&id=editorial-paragraph-accordion--default&viewMode=story');
  });

  it('should display the accordion container', () => {
    cy.get('.bg-gray-100').should('exist');
    cy.get('.container').should('exist');
  });

  it('should display the title if provided', () => {
    cy.get('h2').should('exist');
  });

  it('should have collapsed accordion items initially', () => {
    cy.get('[data-state="closed"]').should('exist');
    cy.get('[data-state="open"]').should('not.exist');
  });

  it('should expand and collapse an accordion item when clicked', () => {
    cy.get('[data-state="closed"]').first().click();
    cy.get('[data-state="open"]').should('exist');

    cy.get('[data-state="open"]').first().click();
    cy.get('[data-state="closed"]').should('exist');
  });

  it('should display accordion item content when expanded', () => {
    cy.get('[data-state="closed"]').first().click();
    cy.get('[data-state="open"] .accordion-content').should('be.visible');
  });

  it('should display a button in the accordion content if a link is provided', () => {
    cy.get('[data-state="closed"]').first().click();
    cy.get('[data-state="open"] .accordion-content a').should('exist');
  });

  context('Responsive Design', () => {
    const viewports = [
      { width: 320, height: 568 }, // Mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1024, height: 768 }, // Laptop
      { width: 1920, height: 1080 }, // Desktop
    ];

    viewports.forEach(({ width, height }) => {
      it(`should render correctly on ${width}x${height} resolution`, () => {
        cy.viewport(width, height);
        cy.get('.bg-gray-100').should('be.visible');
        cy.get('.container').should('be.visible');
        cy.get('.accordion-item').should('be.visible');
      });
    });
  });
});
