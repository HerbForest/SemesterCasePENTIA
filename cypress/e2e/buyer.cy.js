describe('Buyer funktionalitet', () => {
	beforeEach(() => {
		cy.visit('/login')
		cy.get('input[type="email"]').type(Cypress.env('BUYER_EMAIL'))
		cy.get('input[type="password"]').type(Cypress.env('BUYER_PASSWORD'))
		cy.get('button.login__btn').click()
		cy.url({ timeout: 10000 }).should('include', '/buyer/home')
	})

	it('homepage', () => {
		cy.get('.buyer-hero__title').should('exist')
	})

	it('buildPlan', () => {
		cy.get('a[href="/buyer/byggeplan"]').first().click()
		cy.get('div.phase-card--completed h3.phase-card__title').click()
	})

	it('messages', () => {
		cy.get('a[href="/buyer/beskeder"]').first().click()
	})

	it('more', () => {
		cy.visit('/buyer/mere')
		cy.get('a.card[href="/buyer/dokumenter"]').click()
		cy.get('button.back-button').click()
		cy.get('a.card[href="/buyer/kontakt"]').click()
		cy.get('button.back-button').click()
		cy.get('a.card[href="/buyer/profil"]').click()
		cy.get('button.profile-card__edit-btn').click()
		cy.get('div:nth-child(2) > input.profile-card__input').click()
		cy.get('div:nth-child(3) > input.profile-card__input').click()
		cy.get('button.profile-card__edit-btn').click()
		cy.get('button.back-button').click()
		cy.get('a.card[href="/buyer/settings"]').click()
		cy.get('button.back-button').click()
		cy.get('button.logout-btn').click()
	})
})
