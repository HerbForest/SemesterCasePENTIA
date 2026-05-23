## Refactoring

Refactoring er processen med at omstrukturere eksisterende kode uden at ændre dens funktionalitet. Formålet er at gøre koden mere læsbar, vedligeholdbar og i overensstemmelse med best practices.

---

### Code Smells i den originale `BuyerHeroCard`

Den originale komponent indeholdt flere klassiske code smells:

#### Hardcoded data
Adresse og progress var hardcodet direkte i komponenten som konstanter:

```js
const builderAdress = 'Skrænthen 7, Vejle'
const buildingProgress = '63%'
```

Dette er et eksempel på *Magic Values* – værdier der er skrevet direkte ind i koden i stedet for at komme fra en datakilde. Det gør komponenten ubrugelig i andre sammenhænge.

#### For meget ansvar (Single Responsibility Principle)
Komponenten kendte til routing, hardcodet data og billeder på én gang. En komponent bør have ét ansvar – i dette tilfælde at vise et hero card.

#### Forkert navigation
`goToProject` navigerede til `/byggeri` som ikke eksisterer i routeren – en fejl der ikke opdages ved kompilering men kun ved kørsel.

#### Lokale billeder
Billederne var hardcodet som lokale filer:

```js
const images = ['/images/house1.jpg', '/images/house2.jpg', '/images/house3.jpg']
```

Dette er ikke skalerbart og ikke koblet til det rigtige projekt.

---

### Refactoring resultatet

Efter refactoring følger komponenten *Separation of Concerns* princippet:

- **Viewet** (`BuyerHomePageView.vue`) kender til stores og forbereder data
- **Komponenten** (`BuyerHeroCard.vue`) er "dum" og modtager data via props

```js
// Viewet henter og forbereder data
const projectImages = computed(() =>
    Object.values(imageStore.imagesByPhase)
        .flat()
        .map(img => img.downloadUrl)
)

// Komponenten modtager kun props
defineProps({
    images: { type: Array, default: () => [] },
    address: { type: String, default: '' },
    progress: { type: Number, default: 0 }
})
```

Dette gør komponenten genanvendelig, testbar og nem at vedligeholde.

---

## DRY – Don't Repeat Yourself

DRY princippet handler om at undgå at den samme logik eksisterer flere steder i kodebasen. Når logik er gentaget, betyder en ændring at man skal huske at opdatere alle steder – hvilket øger risikoen for fejl og inkonsistens.

Et konkret eksempel fra vores projekt er beregningen af brugerinitialer. Før refactoring var denne logik gentaget i seks forskellige filer:

```js
// Gentaget i BuyerHeader.vue, BuyerProfileView.vue,
// BuilderSettingsView.vue, BuilderChatView.vue osv.
const initials = computed(() => {
    if (!store.user) return ''
    return `${store.user.firstName[0]}${store.user.lastName[0]}`
})
```

Efter refactoring blev logikken samlet i én fil – `src/utils/initials.js`:

```js
export const getInitials = (firstName, lastName) => {
    if (!firstName || !lastName) return ''
    return `${firstName[0]}${lastName[0]}`
}
```

Alle seks filer importerer nu den samme funktion i stedet for at have deres egen implementering. Hvis beregningen af initialer skal ændres – fx til at inkludere tre bogstaver – skal det kun ændres ét sted