describe('Newsletter Form Component', () => {
  beforeEach(() => {
    cy.visit('iframe.html?args=&id=editorial-newsletter--default&viewMode=story');
  });

  it('should render the newsletter form component', () => {
    cy.get('.bg-gray-100').should('be.visible');
  });

  it('should display the correct content in the newsletter form', () => {
    cy.get('h2').should('be.visible')
      .and('have.class', 'text-3xl')
      .and('have.class', 'font-semibold');
    cy.get('.newsletter-summary').should('be.visible');
  });

  it('should have an input field and a submit button', () => {
    cy.get('input[type="email"]')
      .should('exist')
      .and('have.class', 'bg-white')
      .and('have.class', 'text-xl')
      .and('have.class', 'h-12')
      .and('have.attr', 'placeholder', 'Email Address')
      .and('have.attr', 'aria-label', 'Email Address');

    cy.get('button[type="submit"]')
      .should('exist')
      .and('have.class', 'bg-gray-900')
      .and('have.class', 'text-white')
      .and('have.class', 'text-xl')
      .and('have.class', 'h-12')
      .and('contain', 'Submit');
  });

  it('should be responsive and display correctly on various screen sizes', () => {
    cy.viewport('iphone-6');
    cy.get('.bg-gray-100').should('be.visible');
    cy.get('.flex').first().should('have.class', 'flex-col');

    cy.viewport('ipad-2');
    cy.get('.bg-gray-100').should('be.visible');
    cy.get('.flex').first().should('have.class', 'flex-col');

    cy.viewport(1280, 800);
    cy.get('.bg-gray-100').should('be.visible');
    cy.get('.flex').first().should('have.class', 'flex-col').and('have.class', 'lg:space-y-8');
  });

  it('should have the correct layout for the form', () => {
    cy.get('.md\\:w-3\\/4').should('exist');
    cy.get('.xl\\:w-1\\/2').should('exist');

    cy.viewport('iphone-6');
    cy.get('.flex-col').should('exist');

    cy.viewport(1280, 800);
    cy.get('.sm\\:flex-row').should('exist');
  });
});
