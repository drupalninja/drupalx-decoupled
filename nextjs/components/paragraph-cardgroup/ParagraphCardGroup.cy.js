describe('Card Group Component', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?args=&id=editorial-paragraph-card-group--default&viewMode=story');
  });

  it('should display the card group section title if provided', () => {
    cy.get('h2')
      .should('be.visible')
      .and('have.class', 'text-3xl lg:text-3xl font-bold text-center mb-6 lg:mb-8');
  });

  it('should display the correct number of items', () => {
    cy.get('.grid > div')
      .should('be.visible')
      .and('have.length.greaterThan', 0);
  });

  it('should display Card and Stat components', () => {
    cy.get('.grid > div').each(($item) => {
      cy.wrap($item).find('.card').should('be.visible');
    });
  });

  it('should display correct content for Card components', () => {
    cy.get('.card').each(($card) => {
      cy.wrap($card).find('.card-title').should('be.visible');
      cy.wrap($card).find('.badge').should('exist');
      cy.wrap($card).find('p').should('be.visible');
      cy.wrap($card).find('a').should('exist');
    });
  });

  context('Responsive Design', () => {
    it('should display items in a single column on mobile', () => {
      cy.viewport('iphone-6');
      cy.get('.grid').should('have.class', 'grid-cols-1');
    });

    it('should display items in two columns on tablet', () => {
      cy.viewport('ipad-mini');
      cy.get('.grid').should('have.class', 'sm:grid-cols-2');
    });

    it('should display items in three columns on desktop for 3 or more cards', () => {
      cy.viewport('macbook-15');
      cy.get('.grid').should('have.class', 'lg:grid-cols-3');
    });

    it('should display items in two columns on desktop for 2 cards', () => {
      cy.viewport('macbook-15');
      cy.get('.grid > div').then(($items) => {
        if ($items.length === 2) {
          cy.get('.grid').should('have.class', 'sm:grid-cols-2');
        }
      });
    });
  });
});
