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
    cy.get('.mb-3.font-semibold.md\\:mb-4').should('contain', 'Choose Your Plan');

    // Verify title
    cy.get('.mb-5.text-5xl.font-semibold.md\\:mb-6.md\\:text-6xl.lg\\:text-7xl').should('contain', 'Compare Our Options');

    // Verify summary
    cy.get('.md\\:text-md').should('contain', 'Select the best option for your needs');

    // Verify the pricing cards grid
    cy.get('.grid.grid-cols-1.gap-8.md\\:grid-cols-3').should('exist');

    // Verify each card
    cy.get('.flex.h-full.flex-col.justify-between.p-6.md\\:p-8.border.border-border-primary').should('have.length', 3);

    cy.get('.flex.h-full.flex-col.justify-between.p-6.md\\:p-8.border.border-border-primary').each(($card, index) => {
      // Verify card structure
      cy.wrap($card).within(() => {
        cy.get('.mb-2.text-md.font-bold.leading-\\[1\\.4\\].md\\:text-xl').should('exist');
        cy.get('.my-2.text-4xl.font-bold.md\\:text-4xl.lg\\:text-5xl').should('exist');
        cy.get('.my-8.h-px.w-full.bg-border').should('exist');
        cy.get('.mb-8.mt-4.grid.grid-cols-1.gap-y-4.py-2').should('exist');
      });

      // Verify card content based on index
      if (index === 0) {
        cy.wrap($card).contains('DrupalX CMS');
        cy.wrap($card).contains('Free');
        cy.wrap($card).contains('Get Started');
      } else if (index === 1) {
        cy.wrap($card).contains('Technical Discovery');
        cy.wrap($card).contains('$5,000');
        cy.wrap($card).contains('Book Discovery');
      } else if (index === 2) {
        cy.wrap($card).contains('Full Project Build');
        cy.wrap($card).contains('Contact');
        cy.wrap($card).contains('Contact Sales');
      }
    });

    // Verify features
    cy.get('.flex.self-start').should('exist');
    cy.get('.mr-4.flex-none.self-start').should('exist');
    cy.get('.size-6').should('exist'); // Check icon

    // Verify CTA button
    cy.get('a.w-full').should('exist');
  });
});
