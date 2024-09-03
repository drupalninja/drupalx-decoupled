describe('Event content type', () => {
  beforeEach(() => {
    cy.login('admin', 'admin');
  });

  it('can create an event', () => {
    cy.visit('/node/add/event');
    cy.get('[data-drupal-selector=edit-title]').type('Test event');
    cy.get('[data-drupal-selector=edit-field-event-date-0-value-date]').type('2024-09-04');
    cy.get('[data-drupal-selector=edit-field-event-location-0-value]').type('Test location');
    cy.get('[data-drupal-selector=edit-submit]').click();
    cy.url().should('contain', '/node');
  });

  it('can view an event', () => {
    cy.visit('/node/1');
    cy.get('[data-drupal-selector=node-title]').should('contain', 'Test event');
    cy.get('[data-drupal-selector=field--field-event-date]').should('contain', '2024-09-04');
    cy.get('[data-drupal-selector=field--field-event-location]').should('contain', 'Test location');
  });
});
