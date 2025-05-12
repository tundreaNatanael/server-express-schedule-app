/// <reference types="cypress" />

describe('API /user/:id Endpoint Testing', () => {
    const baseUrl = 'http://localhost:3000/api';

    it('GET /api/user/:id should return a specific user', () => {
        const userId = 1; // Replace with an existing user ID for testing

        cy.request(`${baseUrl}/user/${userId}`).should((response) => {
            // Assert the response status is 200
            expect(response.status).to.eq(200);

            // Assert the response body contains the user object
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('id', userId);
            expect(response.body).to.have.property('firstname');
            expect(response.body).to.have.property('lastname');
            expect(response.body).to.have.property('user_type');
        });
    });

    it('GET /api/user/:id with non-existent ID should return an error', () => {
        const invalidUserId = 9999; // Replace with a non-existent user ID

        cy.request({
            url: `${baseUrl}/user/${invalidUserId}`,
            failOnStatusCode: false, // Prevent Cypress from failing the test on non-2xx status
        }).should((response) => {
            // Assert the response status is 404 or appropriate error code
            expect(response.status).to.eq(404);

            // Optionally, check the error message
            expect(response.body).to.have.property('error');
        });
    });
});
