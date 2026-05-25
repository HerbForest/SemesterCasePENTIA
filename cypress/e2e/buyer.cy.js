describe('Builder funktionalitet', () => {
	beforeEach(() => {
		cy.visit('/login')
		cy.get('input[type='email']').type(Cypress.env('BUYER_EMAIL')),
			cy.get('input[type='password']').type(Cypress.env('BUYER_PASSWORD'))
		cy.get('button.login__btn').click()
		cy.url().should('include', '/buyer/home')
	})
});

it('homepage', function () {
	cy.visit('http://localhost:5173/login')


	cy.get('#app input[type='email']').click();
	cy.get('#app input[type='email']').type('maja@mail.dk');
	cy.get('#app input[type='password']').type('majatest');
	cy.get('#app button.login__btn').click();
});

it('buildPlan', function () {
	cy.visit('http://localhost:5173/login')

	cy.get('#app input[type='email']').click();
	cy.get('#app input[type='email']').type('maja@mail.dk');
	cy.get('#app input[type='password']').type('majatest');
	cy.get('#app button.login__btn').click();
	cy.get('#app svg.buyer-footer__icon.lucide-calendar').click();
	cy.get('#app div.phase-card--completed h3.phase-card__title').click();
});

it('messages', function () {
	cy.visit('http://localhost:5173/login')

	cy.get('#app input[type='email']').click();
	cy.get('#app input[type='email']').type('maja@mail.dk');
	cy.get('#app input[type='password']').type('majatest');
	cy.get('#app button.login__btn').click();
	cy.get('#app svg.buyer-footer__icon.lucide-message-circle').click();
});

it('more', function () {
	cy.visit('http://localhost:5173/login')

	cy.get('#app input[type='email']').click();
	cy.get('#app input[type='email']').type('maja@mail.dk');
	cy.get('#app input[type='password']').type('majatest');
	cy.get('#app button.login__btn').click();
	cy.get('#app svg.lucide-ellipsis').click();
	cy.get('#app a[href=' / buyer / dokumenter'] h3.card__title').click();
	cy.get('#app button.back-button').click();
	cy.get('#app a[href=' / buyer / kontakt'] div.card__content').click();
	cy.get('#app button.back-button').click();
	cy.get('#app a[href=' / buyer / profil'] h3.card__title').click();
	cy.get('#app button.profile-card__edit-btn').click();
	cy.get('#app div:nth-child(2) > input.profile-card__input').click();
	cy.get('#app div:nth-child(3) > input.profile-card__input').click();
	cy.get('#app button.profile-card__edit-btn').click();
	cy.get('#app button.back-button').click();
	cy.get('#app a[href=' / buyer / settings'] p.card__text').click();
	cy.get('#app button.back-button').click();
	cy.get('#app button.logout-btn').click();
});
