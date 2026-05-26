# Unit Tests

## Hvad er unit tests?

Unit tests er automatiserede tests der tester en enkelt, isoleret funktion eller et stykke logik. Formålet er at sikre at funktionen opfører sig korrekt under forskellige betingelser både de forventede og de uventede. En god unit test er hurtig at køre, nem at forstå og uafhængig af eksterne systemer som databaser eller netværk.

## test strategi

I rojektet er unit tests skrevet til rene JavaScript funktioner der er udtrukket fra Vue komponenter og stores til en dedikeret `utils` mappe. Disse funktioner er valgt fordi de:

- Er uafhængige af Firebase og Vue
- Tager et input og returnerer et output
- Indeholder logik der er værd at isolere og teste

## Testværktøj

Projektet anvender **Vitest** som testframework, konfigureret med `jsdom` environment så tests kan køres i et browserlignende miljø. Tests køres med følgende kommando:

```bash
npm run test
```

## Eksempel: `getInitials`

### Funktion

`getInitials` beregner initialer fra et for- og efternavn. Funktionen bruges flere steder i applikationen bl.a. i `BuyerHeader.vue`, `BuilderSettingsView.vue` og `BuilderChatView.vue`. Da den samme logik var gentaget i fem filer, blev den udtrukket til `src/utils/initials.js` i overensstemmelse med DRY princippet.

```js
export const getInitials = (firstName, lastName) => {
    if (!firstName || !lastName) return ''
    return `${firstName[0]}${lastName[0]}`
}
```

### Overvejelser bag tests

Der er skrevet fem tests der dækker:

- **Happy path** – at funktionen returnerer korrekte initialer når begge navne er gyldige
- **Edge cases** – at funktionen håndterer manglende fornavn, manglende efternavn og begge mangler

Edge cases er vigtige fordi data fra Firebase ikke altid er komplet – hvis en bruger mangler et navn bør funktionen ikke kaste en fejl men returnere en tom streng.

### Tests

```js
import { describe, it, expect } from 'vitest'
import { getInitials } from './initials.js'

describe('getInitials', () => {
    it('returnerer korrekte initialer for et fuldt navn', () => {
        expect(getInitials('Thomas', 'Nørregaard')).toBe('TN')
    })

    it('returnerer korrekte initialer for et andet navn', () => {
        expect(getInitials('Anna', 'Sørensen')).toBe('AS')
    })

    it('returnerer tom streng hvis firstName mangler', () => {
        expect(getInitials('', 'Sørensen')).toBe('')
    })

    it('returnerer tom streng hvis lastName mangler', () => {
        expect(getInitials('Anna', '')).toBe('')
    })

    it('returnerer tom streng hvis begge mangler', () => {
        expect(getInitials('', '')).toBe('')
    })
})
```

### Teststruktur

Hver test følger samme mønster:

- **`describe`**  grupperer alle tests der hører til `getInitials`
- **`it`**  beskriver hvad der testes i et læsbart format
- **`expect`** kalder funktionen med testdata og sammenligner med det forventede resultat via `toBe`

Testdata er hårdkodet direkte i testen der er ingen afhængighed af Firebase eller Vue stores. Dette gør testene hurtige og pålidelige.