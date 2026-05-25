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

## Testfiler

### auth.cy.js — Login flow

Verificerer at login-siden sender brugere til den rigtige portal baseret på deres rolle.

| Test | Hvad der testes |
|------|-----------------|
| sender builder til builder homepage | Byggeleder logger ind og landes på `/builder/homepage` |
| sender buyer til buyer homepage | buyer logger ind og landes på `/buyer/home` |

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

---

### buyer.cy.js — Køber portal

Verificerer at køberens arbejdsgange fungerer korrekt.

| Test | Hvad der testes |
|------|-----------------|
| homepage | Køber logger ind og ser forsiden |
| buildPlan | Navigation til byggeplan og klik på en færdig fase |
| messages | Navigation til beskedoversigten |
| more | Navigation gennem mere-menuen: dokumenter, kontakt, profil (inkl. redigering), indstillinger og logout |

---

## Fixtures

Testene bruger to fixture-filer til filupload:

| Fil | Bruges til |
|-----|-----------|
| `cypress/fixtures/test.pdf` | Dokument-upload test |
| `cypress/fixtures/test.png` | Billede-upload test |
