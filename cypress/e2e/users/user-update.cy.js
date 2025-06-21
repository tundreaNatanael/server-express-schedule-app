/// <reference types="cypress" />

describe('API /update/user/:id Endpoint Testing', () => {
  // Define the base URL for your API. Ensure your backend server is running on this address.
  const baseUrl = 'http://localhost:3000/api';

  it('PUT /api/update/user/:id should successfully update a user and return the sent data', () => {
    // Define a user ID to target for the update.
    // In a real scenario, you might first create a user using a POST request
    // or ensure this ID exists in your test database.
    const userIdToUpdate = 123; // Example ID. Replace with an existing user ID if applicable.

    // Define the data to send in the request body for the update.
    const updatedUserData = {
      id: userIdToUpdate, // Include ID in body if your backend expects it, otherwise it's implicit from URL
      firstname: 'Jane',
      lastname: 'Smith',
      email: 'jane.smith@example.com',
      user_type: 'admin',
      status: 'active',
    };

    // Make a PUT request to the /update/user/:id endpoint.
    cy.request({
      method: 'PUT', // Specify the HTTP method
      url: `${baseUrl}/update/user/${userIdToUpdate}`, // Construct the full URL with the user ID
      body: updatedUserData, // The data to send in the request body
    }).should((response) => {
      // Assert the response status is 200 (OK), as the backend explicitly sends 200.
      expect(response.status).to.eq(200);

      // Assert that the response body deeply equals the data that was sent.
      // This is because your backend code `res.status(200).send(req?.body);`
      // simply echoes the request body back.
      expect(response.body).to.deep.eq(updatedUserData);

      // You can also assert individual properties if needed
      expect(response.body).to.have.property('firstname', 'Jane');
      expect(response.body).to.have.property('email', 'jane.smith@example.com');
      expect(response.body).to.have.property('id', userIdToUpdate);
    });
  });

  it('PUT /api/update/user/:id with non-existent ID should return the sent data (backend behavior)', () => {
    // Define a non-existent user ID for this test case.
    const nonExistentUserId = 99999;

    // Define some data to send, even for a non-existent ID.
    const dataToSendForNonExistentUser = {
      id: nonExistentUserId,
      status: 'inactive',
    };

    cy.request({
      method: 'PUT',
      url: `${baseUrl}/update/user/${nonExistentUserId}`,
      body: dataToSendForNonExistentUser,
      failOnStatusCode: false, // Prevent Cypress from failing the test on non-2xx status (though it's 200 here)
    }).should((response) => {
      // IMPORTANT: With the current backend logic (`res.status(200).send(req?.body);`),
      // this test will still receive a 200 status and an echo of the sent body,
      // regardless if the user ID exists or not in a database.
      // A more robust backend would typically return a 404 Not Found for non-existent IDs.

      expect(response.status).to.eq(200); // As per your current backend logic
      expect(response.body).to.deep.eq(dataToSendForNonExistentUser); // Backend echoes the body
    });
  });
});
