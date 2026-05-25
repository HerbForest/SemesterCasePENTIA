describe('Builder funktionalitet', () => {
	beforeEach(() => {
		cy.visit('/login')
		cy.get('input[type="email"]').type(Cypress.env('BUILDER_EMAIL'))
		cy.get('input[type="password"]').type(Cypress.env('BUILDER_PASSWORD'))
		cy.get('button.login__btn').click()
		cy.url({ timeout: 10000 }).should('include', '/builder/homepage')
	})

	it('builder kan se projekter på homepage', () => {
		cy.get('.card').should('have.length.greaterThan', 0)
	})

	it('see gantt diagram', () => {
		cy.get('#app a[href="/builder/bygger/4saOtXN8KfOpF3XkAy33"] p.card__text').click()
	})

	it('se byggeplan', () => {
		cy.get('#app a[href="/builder/byggeplan"]').click()
	})

	it('se beskeder', () => {
		cy.get('#app a[href="/builder/beskeder"]').click()
		cy.get('#app a[href="/builder/chat/4saOtXN8KfOpF3XkAy33"] p.conversation-card__address').click()
		cy.get('#app button.back-button').click()
		cy.get('#app a[href="/builder/chat/GpYIGq4PW2zUg9SL8yEa"] p.conversation-card__name').click()
		cy.get('#app button.back-button').click()
		cy.get('#app a[href="/builder/chat/IPBfXR6JaAnIm5weYGvm"] p.conversation-card__address').click()
		cy.get('#app button.back-button').click()
		cy.get('#app a[href="/builder/chat/XlB1Qpkao26YsmZHreAK"]').click()
		cy.get('#app button.back-button').click()
		cy.get('#app a[href="/builder/chat/lJtciAEwnrI6CE0zB8ys"] p.conversation-card__address').click()
	})

	it('see mere', () => {
		cy.get('#app a[href="/builder/menu"] span.bottom-nav__label').click()
	})

	it('create task', () => {
		cy.get('#app a[href="/builder/bygger/4saOtXN8KfOpF3XkAy33"] p.card__text').click()
		cy.get('#app button[title="Add Requirement/Task"]').click()
		cy.get('#task-name').click()
		cy.get('#task-name').type('tesk task')
		cy.get('#task-parent').select('1')
		cy.get('#task-start-date input.el-input__inner-input').click()
		cy.get('div.is-today div.el-date-table__cell-inner').first().click()
		cy.get('button.el-date-picker-btn').first().click()
		cy.get('#task-end-date input.el-input__inner-input').click()
		cy.get('.el-date-table__cell:not(.is-other-month) .el-date-table__cell-inner').last().click()
		cy.get('button.el-date-picker-btn').first().click()
		cy.get('button.gantt-btn-primary').click()
	})

	it('upload fil', () => {
		cy.get('#app a[href="/builder/bygger/4saOtXN8KfOpF3XkAy33"]').click()
		cy.get('#app a[href="/builder/upload/4saOtXN8KfOpF3XkAy33"] div.card__icon').click()
		cy.get('input[accept=".pdf,.doc,.docx"]').selectFile('cypress/fixtures/test.pdf', { force: true })
		cy.get('.upload-card__section').first().find('button.upload-card__btn').click()
	})

	it('upload billede', () => {
		cy.get('#app a[href="/builder/bygger/4saOtXN8KfOpF3XkAy33"]').click()
		cy.get('#app a[href="/builder/upload/4saOtXN8KfOpF3XkAy33"]').click()
		cy.get('.upload-card__section').last().find('select.upload-card__select').select('1')
		cy.get('#app input.upload-card__input-text').type('det et test billede')
		cy.get('input[accept="image/*"]').selectFile('cypress/fixtures/test.png', { force: true })
		cy.get('.upload-card__section').last().find('button.upload-card__btn').click()
	})
})
