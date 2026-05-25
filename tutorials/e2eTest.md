# End-to-End Tests

End-to-end tests verificerer at hele applikationen fungerer korrekt fra brugerens perspektiv — fra login til interaktion med data. Testene kører i en rigtig browser via Cypress og taler med den rigtige Firebase-database.

## Forudsætninger

Testene kræver en `cypress.env.json` fil i projektets rod med følgende indhold:

```json
{
  "BUILDER_EMAIL": "morten@mileton.dk",
  "BUILDER_PASSWORD": "mortenmileton",
  "BUYER_EMAIL": "maja@mail.dk",
  "BUYER_PASSWORD": "majatest"
}
```

Filen må ikke committes til git — den indeholder følsomme oplysninger.

## Sådan kører du testene

Start dev-serveren i én terminal og Cypress i en anden:

```bash
npm run dev
npx cypress open
```

---

## Testfiler

### auth.cy.js — Login flow

Verificerer at login-siden sender brugere til den rigtige portal baseret på deres rolle.

| Test | Hvad der testes |
|------|-----------------|
| sender builder til builder homepage | Byggeleder logger ind og landes på `/builder/homepage` |
| sender buyer til buyer homepage | Buyer logger ind og landes på `/buyer/home` |

```js
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
```

---

### builder.cy.js — Byggeleder portal

Verificerer at byggelederens arbejdsgange fungerer korrekt.

| Test | Hvad der testes |
|------|-----------------|
| builder kan se projekter på homepage | Projektkort vises på forsiden efter login |
| see gantt diagram | Navigation fra forsiden til et projekt viser Gantt-diagrammet |
| se byggeplan | Navigation til byggeplan-siden fungerer |
| se beskeder | Navigation til beskeder og ind/ud af samtaler fungerer |
| see mere | Navigation til indstillinger fungerer |
| create task | Oprettelse af en ny task i Gantt-diagrammet med navn, startdato og slutdato |
| upload fil | Navigation til upload-siden og upload af en PDF-fil |
| upload billede | Navigation til upload-siden og upload af et billede med beskrivelse |

```js
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
})

it('see gantt diagram', function () {
    cy.visit('http://localhost:5173/builder/homepage')
    cy.get('#app svg.lucide-house').click()
    cy.get('#app a[href="/builder/bygger/4saOtXN8KfOpF3XkAy33"] p.card__text').click()
})

it('se byggeplan', function () {
    cy.visit('http://localhost:5173/builder/homepage')
    cy.get('#app a[href="/builder/byggeplan"]').click()
})

it('se beskeder', function () {
    cy.visit('http://localhost:5173/builder/homepage')
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

it('see mere', function () {
    cy.visit('http://localhost:5173/builder/homepage')
    cy.get('#app a[href="/builder/menu"] span.bottom-nav__label').click()
})

it('create task', function () {
    cy.visit('http://localhost:5173/builder/homepage')
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

it('upload fil', function () {
    cy.visit('http://localhost:5173/builder/homepage')
    cy.get('#app a[href="/builder/bygger/4saOtXN8KfOpF3XkAy33"]').click()
    cy.get('#app a[href="/builder/upload/4saOtXN8KfOpF3XkAy33"] div.card__icon').click()
    cy.get('#app svg.lucide-file-text').click()
    cy.get('input[accept=".pdf,.doc,.docx"]').selectFile('cypress/fixtures/test.pdf', { force: true })
    cy.get('#app div:nth-child(1) > button.upload-card__btn').click()
})

it('upload billede', function () {
    cy.visit('http://localhost:5173/builder/homepage')
    cy.get('#app a[href="/builder/bygger/4saOtXN8KfOpF3XkAy33"]').click()
    cy.get('#app a[href="/builder/upload/4saOtXN8KfOpF3XkAy33"]').click()
    cy.get('#app div:nth-child(2) > select.upload-card__select').select('1')
    cy.get('#app input.upload-card__input-text').click()
    cy.get('#app input.upload-card__input-text').type('det et test billede')
    cy.get('input[accept="image/*"]').selectFile('cypress/fixtures/test.png', { force: true })
    cy.get('#app div:nth-child(2) > button.upload-card__btn').click()
})
```

---

### buyer.cy.js — Køber portal

Verificerer at køberens arbejdsgange fungerer korrekt.

| Test | Hvad der testes |
|------|-----------------|
| homepage | Køber logger ind og ser forsiden |
| buildPlan | Navigation til byggeplan og klik på en færdig fase |
| messages | Navigation til beskedoversigten |
| more | Navigation gennem mere-menuen: dokumenter, kontakt, profil (inkl. redigering), indstillinger og logout |

```js
it('homepage', function () {
    cy.visit('http://localhost:5173/login')
    cy.get('#app input[type="email"]').type('maja@mail.dk')
    cy.get('#app input[type="password"]').type('majatest')
    cy.get('#app button.login__btn').click()
})

it('buildPlan', function () {
    cy.visit('http://localhost:5173/login')
    cy.get('#app input[type="email"]').type('maja@mail.dk')
    cy.get('#app input[type="password"]').type('majatest')
    cy.get('#app button.login__btn').click()
    cy.get('#app svg.buyer-footer__icon.lucide-calendar').click()
    cy.get('#app div.phase-card--completed h3.phase-card__title').click()
})

it('messages', function () {
    cy.visit('http://localhost:5173/login')
    cy.get('#app input[type="email"]').type('maja@mail.dk')
    cy.get('#app input[type="password"]').type('majatest')
    cy.get('#app button.login__btn').click()
    cy.get('#app svg.buyer-footer__icon.lucide-message-circle').click()
})

it('more', function () {
    cy.visit('http://localhost:5173/login')
    cy.get('#app input[type="email"]').type('maja@mail.dk')
    cy.get('#app input[type="password"]').type('majatest')
    cy.get('#app button.login__btn').click()
    cy.get('#app svg.lucide-ellipsis').click()
    cy.get('#app a[href="/buyer/dokumenter"] h3.card__title').click()
    cy.get('#app button.back-button').click()
    cy.get('#app a[href="/buyer/kontakt"] div.card__content').click()
    cy.get('#app button.back-button').click()
    cy.get('#app a[href="/buyer/profil"] h3.card__title').click()
    cy.get('#app button.profile-card__edit-btn').click()
    cy.get('#app div:nth-child(2) > input.profile-card__input').click()
    cy.get('#app div:nth-child(3) > input.profile-card__input').click()
    cy.get('#app button.profile-card__edit-btn').click()
    cy.get('#app button.back-button').click()
    cy.get('#app a[href="/buyer/settings"] p.card__text').click()
    cy.get('#app button.back-button').click()
    cy.get('#app button.logout-btn').click()
})
```

---

## Fixtures

Testene bruger to fixture-filer til filupload:

| Fil | Bruges til |
|-----|-----------|
| `cypress/fixtures/test.pdf` | Dokument-upload test |
| `cypress/fixtures/test.png` | Billede-upload test |
