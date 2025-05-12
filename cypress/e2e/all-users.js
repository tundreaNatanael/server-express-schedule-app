import { describe, it, expect, cy } from 'chai';

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
