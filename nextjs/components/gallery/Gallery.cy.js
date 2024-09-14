describe('Gallery Lightbox Component', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?args=&id=editorial-gallery--default&viewMode=story');
  });

  it('should display the gallery section with title and summary', () => {
    cy.get('h2').should('contain.text', 'Gallery Title');
    cy.get('.text-center.pb-3').should('exist');
  });

  it('should display all gallery items', () => {
    cy.get('.grid > div').should('have.length', 4);
  });

  it('should open and close the lightbox modal', () => {
    cy.get('[data-cy="modal-button"]').first().click();
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('.gallery-close').contains('Close').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('should display correct image in lightbox modal', () => {
    cy.get('[data-cy="modal-button"]').first().click();
    cy.get('[data-cy="modal"]').find('img').should('exist');
  });

  it('should be responsive on various screen sizes', () => {
    const sizes = ['iphone-6', 'ipad-2'];

    sizes.forEach((size) => {
      cy.viewport(size);
      cy.get('.grid > div').should('have.length', 4);
    });
  });
});
