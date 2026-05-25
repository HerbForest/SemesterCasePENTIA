describe('Login flow', () => {
	beforeEach(() => {
		cy.visit('/login')
	})

	it('sender builder til builder homepage', () => {
		cy.get('input[type="email"]').type(Cypress.env('BUILDER_EMAIL'))
		cy.get('input[type="password"]').type(Cypress.env('BUILDER_PASSWORD'))
		cy.get('button.login__btn').click()
		cy.url().should('include', '/builder/homepage')
	})

	it('sender buyer til buyer homepage', () => {
		cy.get('input[type="email"]').type(Cypress.env('BUYER_EMAIL'))
		cy.get('input[type="password"]').type(Cypress.env('BUYER_PASSWORD'))
		cy.get('button.login__btn').click()
		cy.url().should('include', '/buyer/home')
	})
})
