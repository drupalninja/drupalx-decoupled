describe('Pricing Component', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?args=&id=editorial-pricing--default&viewMode=story');
  });

  it('should contain all expected elements', () => {
    // Verify the main pricing section
    cy.get('.px-[5%]').should('exist');
    cy.get('.py-16').should('exist');
    cy.get('.md:py-24').should('exist');
    cy.get('.lg:py-28').should('exist');
    cy.get('.container').should('exist');

    // Verify the header content
    cy.get('.mx-auto').should('exist');
    cy.get('.mb-12').should('exist');
    cy.get('.max-w-lg').should('exist');
    cy.get('.text-center').should('exist');
    cy.get('.md:mb-18').should('exist');
    cy.get('.lg:mb-20').should('exist');
    cy.get('.mb-3').should('exist');
    cy.get('.font-semibold').should('exist');
    cy.get('.md:mb-4').should('exist');
    cy.get('.mb-5').should('exist');
    cy.get('.text-5xl').should('exist');
    cy.get('.md:mb-6').should('exist');
    cy.get('.md:text-6xl').should('exist');
    cy.get('.lg:text-7xl').should('exist');
    cy.get('.md:text-md').should('exist');

    // Verify the pricing cards
    cy.get('.grid').should('exist');
    cy.get('.grid-cols-1').should('exist');
    cy.get('.flex').should('exist');
    cy.get('.flex').should('exist');

    cy.get('.flex').should('exist');
    cy.get('.h-full').should('exist');
    cy.get('.flex-col').should('exist');
    cy.get('.justify-between').should('exist');
    cy.get('.p-6').should('exist');
    cy.get('.md:p-8').should('exist');
    cy.get('.border').should('exist');
    cy.get('.border-border-primary').should('exist');

    cy.get('.mb-2').should('exist');
    cy.get('.text-md').should('exist');
    cy.get('.font-bold').should('exist');
    cy.get('.flex').should('exist');
    cy.get('.md:text-xl').should('exist');
    cy.get('.my-2').should('exist');
    cy.get('.text-4xl').should('exist');
    cy.get('.md:text-4xl').should('exist');
    cy.get('.lg:text-5xl').should('exist');
    cy.get('.text-xl').should('exist');
    cy.get('.md:text-2xl').should('exist');
    cy.get('.flex').should('exist');
    cy.get('.lg:text-3xl').should('exist');
    cy.get('.my-8').should('exist');
    cy.get('.h-px').should('exist');
    cy.get('.w-full').should('exist');
    cy.get('.bg-border').should('exist');
    cy.get('.mb-8').should('exist');
    cy.get('.mt-4').should('exist');
    cy.get('.grid-cols-1').should('exist');
    cy.get('.gap-y-4').should('exist');
    cy.get('.py-2').should('exist');
    cy.get('.self-start').should('exist');
    cy.get('.mr-4').should('exist');
    cy.get('.flex-none').should('exist');
    cy.get('.size-6').should('exist');
  });
});