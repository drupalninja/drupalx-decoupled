describe('Hero Component', () => {
  describe('Default Layout', () => {
    beforeEach(() => {
      cy.visit('/iframe.html?args=&id=editorial-hero--default&viewMode=story');
    });

    it('should display the hero title with formatted text', () => {
      cy.get('h1').should('exist').and('have.class', 'text-4xl lg:text-5xl font-semibold mb-4 lg:mb-4');
    });

    it('should display the hero body text', () => {
      cy.get('.text-xl.mb-2.lg\\:mb-4').should('exist');
    });

    it('should display the primary and secondary buttons with correct text and styling', () => {
      cy.get('.hero-button').should('have.length', 2);
      cy.get('.hero-button').first().should('contain.text', 'Learn More');
      cy.get('.hero-button').last().should('contain.text', 'Get Started');
    });

    it('should have correct layout and styling', () => {
      cy.get('.hero').should('have.class', 'mx-auto');
      cy.get('.mb-6.lg\\:mb-12.text-center').should('exist');
      cy.get('.max-w-3xl.mx-auto').should('exist');
    });

    it('should respond correctly to different screen sizes', () => {
      // Test for mobile screen
      cy.viewport('iphone-6');
      cy.get('.mb-6.lg\\:mb-12.text-center').should('be.visible');
      cy.get('h1').should('have.class', 'text-4xl');

      // Test for desktop screen
      cy.viewport('macbook-15');
      cy.get('.mb-6.lg\\:mb-12.text-center').should('be.visible');
      cy.get('h1').should('have.class', 'lg:text-5xl');
    });
  });

  describe('Image Bottom Split Layout', () => {
    beforeEach(() => {
      cy.visit('/iframe.html?args=&id=editorial-hero--image-bottom-split&viewMode=story');
    });

    it('should display the hero title on the left side', () => {
      cy.get('h1')
        .should('exist')
        .and('have.class', 'text-4xl lg:text-5xl font-semibold mb-4 lg:mb-4')
        .and('contain.text', 'Empower Your Content with DrupalX Today');
    });

    it('should display the hero body text and buttons on the right side', () => {
      cy.get('.lg\\:w-1\\/2').eq(1).within(() => {
        cy.get('.text-xl').should('exist')
          .and('contain.text', 'Discover the power of a decoupled CMS that adapts to your needs');
        cy.get('.hero-button').should('have.length', 2);
      });
    });

    it('should display the image at the bottom', () => {
      cy.get('.mt-8.flex.justify-center.items-center').should('exist');
    });

    it('should have correct layout and styling', () => {
      cy.get('.hero').should('have.class', 'mx-auto');
      cy.get('.flex.flex-col.lg\\:flex-row').should('exist');
    });

    it('should respond correctly to different screen sizes', () => {
      // Test for mobile screen
      cy.viewport('iphone-6');
      cy.get('.flex.flex-col.lg\\:flex-row').should('exist');
      cy.get('h1').should('have.class', 'text-4xl');

      // Test for desktop screen
      cy.viewport('macbook-15');
      cy.get('.flex.flex-col.lg\\:flex-row').should('exist');
      cy.get('h1').should('have.class', 'lg:text-5xl');
    });
  });
});
