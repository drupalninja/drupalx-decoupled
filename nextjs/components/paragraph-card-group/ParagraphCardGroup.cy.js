describe('Card Group Component', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?args=&id=editorial-paragraph-card-group--default&viewMode=story');
  });

  it('should display the card group section title if provided', () => {
    cy.get('.card-group-heading')
      .should('be.visible')
      .and('contain', 'Featured Cards');
  });

  it('should display the correct number of items', () => {
    cy.get('.card-group .col-sm-6')
      .should('be.visible')
      .and('have.length.greaterThan', 0);
  });

  it('should display Card and Stat components', () => {
    cy.get('.card-group .col-sm-6').each(($item) => {
      cy.wrap($item).find('.card, .stat-group-item').should('be.visible');
    });
  });

  it('should display correct content for Card components', () => {
    cy.get('.card').each(($card) => {
      cy.wrap($card).find('.card-title').should('be.visible');
      cy.wrap($card).find('.badge').should('exist');
      cy.wrap($card).find('.card-text').should('be.visible');
      cy.wrap($card).find('.btn').should('exist');
    });
  });

  context('Responsive Design', () => {
    it('should display items in a single column on mobile', () => {
      cy.viewport('iphone-6');
      cy.get('.card-group .col-sm-6').should('have.class', 'col-sm-6');
    });

    it('should display items in two columns on tablet', () => {
      cy.viewport('ipad-mini');
      cy.get('.card-group .col-sm-6').should('have.class', 'col-sm-6');
    });

    it('should display items in three columns on desktop', () => {
      cy.viewport('macbook-15');
      cy.get('.card-group .col-lg-4').should('have.class', 'col-lg-4');
    });
  });
});
