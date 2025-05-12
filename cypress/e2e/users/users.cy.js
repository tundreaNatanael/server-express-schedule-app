/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('API /users Endpoint Testing', () => {
  const baseUrl = 'http://localhost:3000/api';

  it('GET /api/users should return all users', () => {
    cy.request(`${baseUrl}/users`).should((response) => {
      // Assert the response status is 200
      expect(response.status).to.eq(200);

      // Assert the response body contains an array
      expect(response.body).to.be.an('array');

      // Optionally, check if the array contains a user
      if (response.body.length > 0) {
        const user = response.body[0];
        expect(user).to.have.property('id');
        expect(user).to.have.property('firstname');
        expect(user).to.have.property('lastname');
        expect(user).to.have.property('user_type');
      }
    });
  });
});
