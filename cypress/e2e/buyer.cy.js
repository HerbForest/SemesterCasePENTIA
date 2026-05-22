describe('Builder funktionalitet', () => {
    beforeEach(() => {
        cy.visit('/login')
        cy.get('input[type="email"]').type(Cypress.env('BUYER_EMAIL'))
        cy.get('input[type="password"]').type(Cypress.env('BUYER_PASSWORD'))
        cy.get('button.login__btn').click()
        cy.url().should('include', '/buyer/home')
    })
});

it('homepage', function() {});
