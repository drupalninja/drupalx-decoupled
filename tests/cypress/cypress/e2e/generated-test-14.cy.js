describe('Event content type', () => {
  before(() => {
    cy.visit('/user/login');
    cy.get('[data-drupal-selector=edit-name]').type('admin');
    cy.get('[data-drupal-selector=edit-pass]').type('admin');
    cy.get('[data-drupal-selector=edit-submit]').click();
  });

  it('creates an event node', () => {
    cy.visit('/node/add/event');
    cy.get('[name=title[0][value]]').type('Test Event');
    cy.get('[name=field_event_date[0][value][date]]').type('2024-09-10');
    cy.get('[name=field_event_location[0][value]]').type('Test Location');
    cy.get('[name=op]').click();
    cy.get('.node').should('contain', 'Test Event');
  });

  it('displays the event date and location', () => {
    cy.visit('/node/1');
    cy.get('.field--name-field-event-date').should('contain', '2024-09-10');
    cy.get('.field--name-field-event-location').should('contain', 'Test Location');
  });
});
