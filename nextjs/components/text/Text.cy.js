describe('Text Component', () => {
  describe('Default Layout', () => {
    beforeEach(() => {
      cy.visit('/iframe.html?args=&id=editorial-text--default&viewMode=story');
    });

    it('should have the correct container classes', () => {
      cy.get('.container').should('have.class', 'mx-auto').and('have.class', 'my-6');
      cy.get('.container').should('have.class', 'lg:my-25');
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
      cy.get('.mt-6').should('exist').and('have.class', 'flex').and('have.class', 'justify-start');
      cy.get('a').first().should('exist');
      cy.get('a').last().should('exist');
    });
  });

  describe('Centered Layout', () => {
    beforeEach(() => {
      cy.visit('/iframe.html?args=&id=editorial-text--centered&viewMode=story');
    });

    it('should have centered content', () => {
      cy.get('.container > div').should('have.class', 'mx-auto').and('have.class', 'text-center');
    });

    it('should have centered buttons', () => {
      cy.get('.mt-6').should('have.class', 'justify-center');
    });
  });

  describe('Buttons Right Layout', () => {
    beforeEach(() => {
      cy.visit('/iframe.html?args=&id=editorial-text--buttons-right&viewMode=story');
    });

    it('should have the correct layout on large screens', () => {
      cy.viewport(1200, 800);
      cy.get('.container > div').should('have.class', 'lg:flex').and('have.class', 'lg:items-start').and('have.class', 'lg:justify-between');
      cy.get('.container > div > div').first().should('have.class', 'lg:flex-grow');
      cy.get('.container > div > div').last().should('have.class', 'lg:ml-8').and('have.class', 'lg:flex-shrink-0').and('have.class', 'lg:self-start');
    });

    it('should have buttons aligned to the right on large screens', () => {
      cy.viewport(1200, 800);
      cy.get('.mt-6').should('have.class', 'justify-start').and('have.class', 'lg:justify-end');
    });

    it('should have buttons below content on small screens', () => {
      cy.viewport('iphone-6');
      cy.get('.container > div').should('not.have.class', 'flex');
      cy.get('.mt-6').should('have.class', 'justify-start');
    });
  });

  describe('Responsive Behavior', () => {
    beforeEach(() => {
      cy.visit('/iframe.html?args=&id=editorial-text--default&viewMode=story');
    });

    it('should adapt to different screen sizes', () => {
      const sizes = ['iphone-6', 'ipad-2'];

      sizes.forEach((size) => {
        cy.viewport(size);
        cy.get('.container').should('be.visible');
      });
    });
  });
});
