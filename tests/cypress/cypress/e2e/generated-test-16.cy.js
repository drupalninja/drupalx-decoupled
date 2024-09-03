describe('Event content type', () => {
  beforeEach(() => {
    cy.visit('/user/login')
    cy.get('[data-drupal-selector=edit-name]').type('admin')
    cy.get('[data-drupal-selector=edit-pass]').type('admin')
    cy.get('[data-drupal-selector=edit-submit]').click()
  })

  it('should have an event content type', () => {
    cy.visit('/node/add/event')
    cy.get('[data-drupal-selector=edit-title]').type('Test Event')
    cy.get('[data-drupal-selector=edit-body-0-value]').type('This is a test event')
    cy.get('[data-drupal-selector=edit-field-event-date-0-value-date]').type('2024-09-03')
    cy.get('[data-drupal-selector=edit-field-event-location-0-value]').type('Test Location')
    cy.get('[data-drupal-selector=edit-submit]').click()
    cy.url().should('contain', '/node/')
  })
})
