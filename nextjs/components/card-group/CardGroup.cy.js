describe('Card Group Component', () => {
  context('Default Story', () => {
    beforeEach(() => {
      cy.visit('/iframe.html?args=&id=editorial-card-group--default&viewMode=story');
    });

    it('should display the card group section title', () => {
      cy.get('h2')
        .should('be.visible')
        .and('contain', 'Featured Cards')
        .and('have.class', 'text-3xl font-bold text-center mb-6 md:mb-8');
    });

    it('should display the correct number of cards', () => {
      cy.get('.grid > div').should('have.length', 3);
    });

    it('should display both Custom and Stat cards', () => {
      // Using more specific selectors based on the new structure
      cy.get('.grid > div').eq(0).find('.card').should('be.visible');
      cy.get('.grid > div').eq(1).find('.card').should('be.visible');
      cy.get('.grid > div').eq(2).find('.stat').should('be.visible');
    });

    it('should display correct content for Custom cards', () => {
      cy.get('.card').each(($card, index) => {
        if (index < 2) {
          cy.wrap($card).within(() => {
            cy.get('.card-title').should('be.visible');
            cy.get('.badge').should('exist');
            cy.get('p').should('be.visible');
            cy.get('a').should('exist');
            cy.get('img').should('exist');
          });
        }
      });
    });

    it('should display correct content for Stat card', () => {
      cy.get('.stat').within(() => {
        cy.get('h3').should('be.visible');
        cy.get('p').should('be.visible');
        cy.get('svg').should('exist');
      });
    });
  });

  context('Single Card Story', () => {
    beforeEach(() => {
      cy.visit('/iframe.html?args=&id=editorial-card-group--single-card&viewMode=story');
    });

    it('should display only one card', () => {
      cy.get('.grid > div').should('have.length', 1);
    });

    it('should display the correct title', () => {
      cy.get('h2').should('contain', 'Single Card Example');
    });
  });

  context('Two Cards Story', () => {
    beforeEach(() => {
      cy.visit('/iframe.html?args=&id=editorial-card-group--two-cards&viewMode=story');
    });

    it('should display two cards', () => {
      cy.get('.grid > div').should('have.length', 2);
    });

    it('should display the correct title', () => {
      cy.get('h2').should('contain', 'Two Cards Example');
    });
  });

  context('Stat Cards Only Story', () => {
    beforeEach(() => {
      cy.visit('/iframe.html?args=&id=editorial-card-group--stat-cards-only&viewMode=story');
    });

    it('should display only stat cards', () => {
      cy.get('.grid > div').should('have.length', 2);
      cy.get('.stat').should('have.length', 2);
    });

    it('should display the correct title', () => {
      cy.get('h2').should('contain', 'Stat Cards');
    });

    it('should display correct content for Stat cards', () => {
      cy.get('.stat').each(($stat) => {
        cy.wrap($stat).within(() => {
          cy.get('h3').should('be.visible');
          cy.get('p').should('be.visible');
          cy.get('svg').should('exist');
        });
      });
    });
  });

  context('Responsive Design', () => {
    beforeEach(() => {
      cy.visit('/iframe.html?args=&id=editorial-card-group--default&viewMode=story');
    });

    it('should display items in a single column on mobile', () => {
      cy.viewport('iphone-6');
      cy.get('.grid').should('have.class', 'grid-cols-1');
    });

    it('should display items in two columns on tablet', () => {
      cy.viewport('ipad-mini');
      cy.get('.grid').should('have.class', 'md:grid-cols-2');
    });

    it('should display items in three columns on desktop for 3 or more cards', () => {
      cy.viewport('macbook-15');
      cy.get('.grid').should('have.class', 'lg:grid-cols-3');
    });

    it('should display items in two columns on desktop for 2 cards', () => {
      cy.visit('/iframe.html?args=&id=editorial-card-group--two-cards&viewMode=story');
      cy.viewport('macbook-15');
      cy.get('.grid').should('have.class', 'md:grid-cols-2');
    });
  });
});
