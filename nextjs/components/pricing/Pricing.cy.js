describe('Pricing Component', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?args=&id=editorial-pricing--default&viewMode=story');
  });

  it('should contain all expected elements', () => {
    // Verify the main pricing section
    cy.get('section.px-\\[5\\%\\].my-12.lg\\:my-25').should('exist');
    cy.get('.container').should('exist');

    // Verify the header content
    cy.get('.mx-auto.max-w-lg.text-center.mb-6.lg\\:mb-12').should('exist');

    // Verify eyebrow
    cy.get('.eyebrow').should('exist');

    // Verify title
    cy.get('h1').should('exist');

    // Verify summary
    cy.get('.summary').should('exist');

    // Verify the pricing cards grid
    cy.get('.grid.grid-cols-1.gap-8.md\\:grid-cols-3').should('exist');

    // Verify each card
    cy.get('.flex.h-full.flex-col.justify-between.p-6.md\\:p-8.border.border-border-primary').should('have.length', 3);

    cy.get('.flex.h-full.flex-col.justify-between.p-6.md\\:p-8.border.border-border-primary').each(($card, index) => {
      // Verify card structure
      cy.wrap($card).within(() => {
        cy.get('.mb-2.text-md.font-bold.leading-\\[1\\.4\\].md\\:text-xl').should('exist');
        cy.get('.my-2.text-3xl.font-bold.lg\\:text-4xl').should('exist');
        cy.get('.my-8.h-px.w-full.bg-border').should('exist');
        cy.get('.mb-8.mt-4.grid.grid-cols-1.gap-y-4.py-2').should('exist');
      });

      // Verify "Includes:" text
      cy.wrap($card).contains('Includes:');

      // Verify features
      cy.wrap($card).find('.flex.self-start').should('exist');
      cy.wrap($card).find('.size-6').should('exist'); // Check icon

      // Verify CTA button
      cy.wrap($card).find('a.w-full').should('exist');
    });
  });
});
