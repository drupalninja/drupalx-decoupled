describe('LogoCollection', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?args=&id=editorial-logo-collection--default&viewMode=story');
  });

  it('renders the title correctly', () => {
    cy.get('h2').should('contain.text', 'Trusted by top companies worldwide');
  });

  it('renders all logos', () => {
    cy.get('div[class*="grid"]').children().should('have.length', 3);
  });

  it('applies correct classes for responsive layout', () => {
    cy.get('section').should('have.class', 'py-8').and('have.class', 'md:py-12');
    cy.get('div[class*="container"]').should('exist');
    cy.get('div[class*="flex flex-col md:flex-row"]').should('exist');
  });

  it('applies correct classes to logo images', () => {
    cy.get('img').should('have.class', 'max-w-[100px]')
      .and('have.class', 'md:max-w-[120px]')
      .and('have.class', 'h-auto');
  });

  it('has correct grid layout classes', () => {
    cy.get('div[class*="grid"]')
      .should('have.class', 'grid-cols-2')
      .and('have.class', 'sm:grid-cols-3');
  });

  it('has correct title styling', () => {
    cy.get('h2')
      .should('have.class', 'text-xl')
      .and('have.class', 'font-bold')
      .and('have.class', 'text-center')
      .and('have.class', 'md:text-left');
  });
});

describe('LogoCollection - Few Logos', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?args=&id=editorial-logo-collection--few-logos&viewMode=story');
  });

  it('renders correct title for few logos', () => {
    cy.get('h2').should('contain.text', 'Our Partners');
  });

  it('renders correct number of logos', () => {
    cy.get('div[class*="grid"]').children().should('have.length', 2);
  });

  it('maintains grid layout with fewer items', () => {
    cy.get('div[class*="grid"]')
      .should('have.class', 'grid-cols-2')
      .and('have.class', 'sm:grid-cols-3');
  });
});

describe('LogoCollection - Many Logos', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?args=&id=editorial-logo-collection--many-logos&viewMode=story');
  });

  it('renders correct title for many logos', () => {
    cy.get('h2').should('contain.text', 'Clients We\'ve Worked With');
  });

  it('renders correct number of logos', () => {
    cy.get('div[class*="grid"]').children().should('have.length', 6);
  });

  it('maintains grid layout with more items', () => {
    cy.get('div[class*="grid"]')
      .should('have.class', 'grid-cols-2')
      .and('have.class', 'sm:grid-cols-3');
  });
});
