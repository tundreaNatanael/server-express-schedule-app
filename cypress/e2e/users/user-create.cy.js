/// <reference types="cypress" />

describe('API /create/user Endpoint Testing', () => {
  const baseUrl = 'http://localhost:3000/api';

  it('POST /api/create/user should successfully create a user and return the sent data', () => {
    // Define the user data that will be sent in the request body.
    const newUser = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      user_type: 'customer',
      age: 30,
    };

    // Make a POST request to the /create/user endpoint.
    // cy.request() automatically sets the 'Content-Type' header to 'application/json'
    // when a JavaScript object is passed as the 'body'.
    cy.request({
      method: 'POST', // Specify the HTTP method
      url: `${baseUrl}/create/user`, // Construct the full URL
      body: newUser, // The data to send in the request body
    }).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.deep.eq(newUser);
      expect(response.body).to.have.property('firstname', 'John');
      expect(response.body).to.have.property('email', 'john.doe@example.com');
    });
  });
});
