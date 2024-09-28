describe('LogoCollection', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?args=&id=editorial-logo-collection--default&viewMode=story');
  });

  it('renders the title correctly', () => {
    cy.get('h2').should('contain.text', 'Trusted by top companies worldwide');
  });

  it('renders all logos', () => {
    cy.get('div[class*="flex flex-wrap"]').children().should('have.length', 3);
  });

  it('applies correct classes for responsive layout', () => {
    cy.get('section').should('have.class', 'py-8').and('have.class', 'md:py-12');
    cy.get('div[class*="container"]').should('exist');
    cy.get('div[class*="flex flex-col md:flex-row"]').should('exist');
  });

  it('applies correct classes to logo images', () => {
    cy.get('img').should('have.class', 'max-w-[120px]').and('have.class', 'h-auto');
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
    cy.get('div[class*="flex flex-wrap"]').children().should('have.length', 2);
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
    cy.get('div[class*="flex flex-wrap"]').children().should('have.length', 6);
  });
});
