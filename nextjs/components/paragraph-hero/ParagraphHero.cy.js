describe('Hero Component', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?args=&id=editorial-paragraph-hero--default&viewMode=story');
  });

  it('should display the hero title with formatted text', () => {
    cy.get('h1').contains('Welcome to').should('exist');
    cy.get('h1 strong').contains('Our Website').should('exist');
  });

  it('should display the hero body text with formatted text', () => {
    cy.get('.lead').contains('This is a brief summary of our amazing content').should('exist');
    cy.get('.lead em').contains('formatted text').should('exist');
  });

  it('should display the primary button with correct text', () => {
    cy.get('.btn-primary').contains('Learn More').should('exist');
  });

  it('should display the image with correct attributes', () => {
    cy.get('img.img-fluid').should('have.attr', 'src').should('exist');
  });

  it('should display the image at the top when layout is "image_top"', () => {
    cy.get('.image-top img.img-fluid').should('exist');
  });

  it('should display the image at the bottom when layout is "image_bottom"', () => {
    cy.visit('/iframe.html?args=&id=editorial-paragraph-hero--image-bottom&viewMode=story');
    cy.get('.image-bottom img.img-fluid').should('exist');
  });

  it('should respond correctly to different screen sizes', () => {
    // Test for mobile screen
    cy.viewport('iphone-6');
    cy.get('.mb-6.mb-lg-12.text-center').should('be.visible');

    // Test for tablet screen
    cy.viewport('ipad-2');
    cy.get('.mb-6.mb-lg-12.text-center').should('be.visible');

    // Test for desktop screen
    cy.viewport('macbook-15');
    cy.get('.mb-6.mb-lg-12.text-center').should('be.visible');
  });
});