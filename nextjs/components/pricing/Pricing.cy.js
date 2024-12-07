describe('Pricing Component', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?args=&id=editorial-pricing--default&viewMode=story');
  });

  it('should contain all expected elements', () => {
    // Verify the main pricing section
    cy.get('section.px-4.sm\\:px-\\[5\\%\\].my-12.lg\\:my-25').should('exist');

    // Verify the header content
    cy.get('.mx-auto.max-w-lg.text-center.mb-6.lg\\:mb-12').should('exist');

    // Verify eyebrow
    cy.get('.eyebrow').should('exist')
      .should('have.class', 'mb-2')
      .should('have.class', 'sm:mb-3')
      .should('have.class', 'md:mb-4');

    // Verify title
    cy.get('h2')
      .should('have.class', 'mb-4')
      .should('have.class', 'sm:mb-5')
      .should('have.class', 'md:mb-6')
      .should('have.class', 'text-3xl')
      .should('have.class', 'sm:text-4xl')
      .should('have.class', 'md:text-5xl')
      .should('have.class', 'lg:text-7xl');

    // Verify summary
    cy.get('.summary')
      .should('have.class', 'text-sm')
      .should('have.class', 'sm:text-base')
      .should('have.class', 'md:text-md');

    // Verify the pricing cards grid
    cy.get('.grid.grid-cols-1.gap-6.sm\\:gap-8.md\\:grid-cols-3').should('exist');

    // Verify each card
    cy.get('.flex.h-full.flex-col.justify-between.p-4.sm\\:p-6.md\\:p-8').should('have.length', 3);

    cy.get('.flex.h-full.flex-col.justify-between.p-4.sm\\:p-6.md\\:p-8').each(($card) => {
      // Verify card structure
      cy.wrap($card).within(() => {
        // Card title
        cy.get('h2')
          .should('have.class', 'mb-2')
          .should('have.class', 'text-md')
          .should('have.class', 'md:text-xl');

        // Price
        cy.get('h3')
          .should('have.class', 'my-2')
          .should('have.class', 'text-2xl')
          .should('have.class', 'sm:text-3xl')
          .should('have.class', 'lg:text-4xl');

        // Divider
        cy.get('.my-4.sm\\:my-8.h-px.w-full.bg-border').should('exist');

        // Features container
        cy.get('.mb-6.sm\\:mb-8.mt-3.sm\\:mt-4.grid.grid-cols-1.gap-y-3.sm\\:gap-y-4.py-2').should('exist');

        // Feature items
        cy.get('.flex.self-start').each(($feature) => {
          cy.wrap($feature).within(() => {
            // Icon
            cy.get('.size-5.sm\\:size-6').should('exist');

            // Feature text
            cy.get('p')
              .should('have.class', 'text-sm')
              .should('have.class', 'sm:text-base');
          });
        });

        // CTA button
        cy.get('a.w-full').should('exist');
      });
    });
  });
});
