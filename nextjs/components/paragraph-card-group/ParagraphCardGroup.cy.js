describe('Card Group Component', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?args=&id=editorial-paragraph-card-group--default&viewMode=story');
  });

  it('should display the card group section title', () => {
    cy.get('.card-group-heading')
      .should('be.visible')
      .and('contain', 'Featured Cards');
  });

  it('should display the correct number of cards', () => {
    cy.get('.card')
      .should('be.visible')
      .and('have.length', 6);
  });

  it('should display the card image, title, tags, summary, and links', () => {
    cy.get('.card').each(($card) => {
      cy.wrap($card).find('.card-img-top').should('be.visible');
      cy.wrap($card).find('.card-title').should('be.visible');
      cy.wrap($card).find('.badge').should('be.visible');
      cy.wrap($card).find('.card-text').should('be.visible');
      cy.wrap($card).find('.btn').should('be.visible');
    });
  });

  context('Responsive Design', () => {
    it('should display cards in a single column on mobile', () => {
      cy.viewport('iphone-6');
      cy.get('.card-group .col-sm-6').should('have.length', 6);
    });

    it('should display cards in two columns on tablet', () => {
      cy.viewport('ipad-mini');
      cy.get('.card-group .col-lg-4').should('have.length', 6);
    });

    it('should display cards in three columns on desktop', () => {
      cy.viewport('macbook-15');
      cy.get('.card-group .col-lg-4').should('have.length', 6);
    });
  });
});
