describe('Paragraph Text Component', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?args=&id=editorial-paragraph-text--default&viewMode=story');
  });

  it('should have the correct container classes', () => {
    cy.get('.container').should('have.class', 'mx-auto').and('have.class', 'my-6');
    cy.get('.container').should('have.class', 'lg:my-15');
  });

  it('should have the correct content classes', () => {
    cy.get('.container > div').should('have.class', 'max-w-4xl');
  });

  it('should display the eyebrow when present', () => {
    cy.get('h6').should('exist')
      .and('have.class', 'text-sm')
      .and('have.class', 'font-semibold')
      .and('have.class', 'uppercase')
      .and('have.class', 'tracking-wide')
      .and('have.class', 'text-gray-500');
  });

  it('should display the correct title', () => {
    cy.get('h2').should('exist')
      .and('have.class', 'mt-2')
      .and('have.class', 'text-3xl')
      .and('have.class', 'font-semibold')
      .and('have.class', 'tracking-tight')
      .and('have.class', 'text-gray-900')
      .and('have.class', 'sm:text-4xl');
  });

  it('should display the correct body text', () => {
    cy.get('.mt-4').should('exist')
      .and('have.class', 'text-xl')
      .and('have.class', 'text-gray-500');
  });

  it('should display buttons when links are provided', () => {
    cy.get('.mt-6').should('exist').and('have.class', 'flex');
    cy.get('a').first().should('exist');
    cy.get('a').last().should('exist');
  });

  it('should adapt to different screen sizes', () => {
    const sizes = ['iphone-6', 'ipad-2'];

    sizes.forEach((size) => {
      cy.viewport(size);
      cy.get('.container').should('be.visible');
    });
  });
});
