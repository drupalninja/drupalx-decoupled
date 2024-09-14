describe('Newsletter Form Component', () => {
  beforeEach(() => {
    cy.visit('iframe.html?args=&id=editorial-newsletter--default&viewMode=story');
  });

  it('should render the newsletter form component', () => {
    cy.get('.bg-gray-100').should('be.visible');
  });

  it('should display the correct content in the newsletter form', () => {
    cy.get('h3').should('be.visible').and('have.class', 'text-3xl');
    cy.get('.newsletter-summary').should('be.visible');
  });

  it('should have an input field and a submit button', () => {
    cy.get('input[type="email"]').should('exist').and('have.class', 'bg-white');
    cy.get('button[type="submit"]').should('exist').and('have.class', 'bg-gray-900');
  });

  it('should be responsive and display correctly on various screen sizes', () => {
    cy.viewport('iphone-6');
    cy.get('.bg-gray-100').should('be.visible');
    cy.get('.flex').should('have.class', 'flex-col');

    cy.viewport('ipad-2');
    cy.get('.bg-gray-100').should('be.visible');
    cy.get('.flex').should('have.class', 'flex-col');

    cy.viewport(1280, 800);
    cy.get('.bg-gray-100').should('be.visible');
    cy.get('.flex').should('have.class', 'lg:flex-row');
  });
});
