describe('Gallery Lightbox Component', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?args=&id=editorial-paragraph-gallery--default&viewMode=story');
  });

  it('should display the gallery section with title and summary', () => {
    cy.get('.mb-4').should('contain.text', 'Optional Gallery Title');
    cy.get('.pb-3').should('contain.html', 'Optional summary text');
  });

  it('should display all gallery items', () => {
    cy.get('.row > .col-6.col-md-3.mb-3').should('have.length', 4);
  });

  it('should open and close the lightbox modal', () => {
    cy.get('.col-6.col-md-3.mb-3').first().find('img').click();
    cy.get('.modal').should('be.visible');
    cy.get('.modal.show').find('.close').click();
  });
  
  it('should display correct image in lightbox modal', () => {
    const firstItem = cy.get('.col-6.col-md-3.mb-3').first();
    firstItem.find('img').click();

    cy.get('.modal').find('img').should('have.attr', 'alt', 'Gallery 1');
    cy.get('.modal').find('img').should('have.attr', 'src').and('include', 'card.webp');
  });

  it('should be responsive on various screen sizes', () => {
    const sizes = ['iphone-6', 'ipad-2'];

    sizes.forEach((size) => {
      cy.viewport(size);

      cy.get('.row > .col-6.col-md-3.mb-3').should('have.length', 4);
    });
  });
});
