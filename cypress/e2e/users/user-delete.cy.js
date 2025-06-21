/// <reference types="cypress" />

describe('API /delete/user/:id Endpoint Testing', () => {
  // Define the base URL for your API. Ensure your backend server is running on this address.
  const baseUrl = 'http://localhost:3000/api';

  it('DELETE /api/delete/user/:id should successfully delete a user and return the ID', () => {
    // Define a user ID to target for deletion.
    // In a real scenario, you might first create a user using a POST request
    // or ensure this ID exists in your test database before attempting to delete.
    const userIdToDelete = 456; // Example ID. Replace with an existing user ID if applicable.

    // Make a DELETE request to the /delete/user/:id endpoint.
    cy.request({
      method: 'DELETE', // Specify the HTTP method
      url: `${baseUrl}/delete/user/${userIdToDelete}`, // Construct the full URL with the user ID
    }).should((response) => {
      // Assert the response status is 200 (OK), as the backend explicitly sends 200.
      expect(response.status).to.eq(200);

      // Assert that the response body is the string representation of the deleted ID.
      // This is because your backend code `res.status(200).send(req?.params?.id);`
      // explicitly echoes the ID from the URL.
      expect(response.body).to.eq(String(userIdToDelete));

      // You can also assert the type if needed
      expect(typeof response.body).to.eq('string');
    });
  });

  it('DELETE /api/delete/user/:id with non-existent ID should still return the sent ID (backend behavior)', () => {
    // Define a non-existent user ID for this test case.
    const nonExistentUserId = 88888;

    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/delete/user/${nonExistentUserId}`,
      failOnStatusCode: false, // Prevent Cypress from failing the test on non-2xx status (though it's 200 here)
    }).should((response) => {
      // IMPORTANT: With the current backend logic (`res.status(200).send(req?.params?.id);`),
      // this test will still receive a 200 status and an echo of the sent ID,
      // regardless if the user ID actually exists in a database or not.
      // A more robust backend would typically return a 404 Not Found if the user does not exist.

      expect(response.status).to.eq(200); // As per your current backend logic
      expect(response.body).to.eq(String(nonExistentUserId)); // Backend echoes the ID from the URL
    });
  });
});
