Cypress.Commands.add("type_ckeditor", (selector, content) => {
  cy.window().then(win => {
    // Log the CKEditor5Instances to ensure it contains instances
    console.log('CKEditor5Instances:', win.Drupal.CKEditor5Instances);

    // Look for instances that match the selector and set the data.
    win.Drupal.CKEditor5Instances.forEach((value, key) => {
      if (value.sourceElement && value.sourceElement.matches(selector)) {
        console.log('Found CKEditor instance with key:', key);
        console.log('Editor instance:', value);

        // Ensure the editor instance has the setData method
        if (typeof value.setData === 'function') {
          // Set the editor content
          value.setData(content);
          console.log('Data set successfully');
        } else {
          console.error('setData method not found on editor instance');
        }
      }
    });
  });
});

Cypress.Commands.add('getIframeBody', (iframeSelector) => {
  cy.get(iframeSelector)
    .its('0.contentDocument.body')
    .should('be.visible')
    .then(cy.wrap);
});

describe('Verify user login and page creation', () => {
  beforeEach(() => cy.visit('/user'))

  it('login page loads', () => {
    cy.title().should('contains', 'Log in')
  })

  it('login page redirected to /user/login', () => {
    cy.url().should('include', '/user/login')
  })

  it('login form exists', () => {
    cy.get('[data-drupal-selector="user-login-form"]').contains('Username')
    cy.get('[data-drupal-selector="user-login-form"]').contains('Password')
    cy.get('[data-drupal-selector="edit-submit"]').contains('Log in')
  })

  it('can login with admin credentials and create a new page', () => {
    // Login
    cy.get('[data-drupal-selector="edit-name"]').type('admin')
    cy.get('[data-drupal-selector="edit-pass"]').type('admin')
    cy.get('[data-drupal-selector="edit-submit"]').click()

    // Verify successful login
    cy.url().should('not.include', '/user/login')
    cy.get('body').should('contain', 'admin')

    // Navigate to add new page
    cy.visit('/node/add/page')

    // Fill in the page details
    cy.get('[data-drupal-selector="edit-title-0-value"]').type('Test Page Title')

    cy.type_ckeditor("#edit-body-0-value", "This is the body of the test page.")

    // Save the page
    cy.get('[data-drupal-selector="edit-submit"]').click()

    // Verify the page was created successfully
    cy.url().should('include', '/test-page-title')
    cy.get('h1').should('contain', 'Test Page Title')
  })
})
