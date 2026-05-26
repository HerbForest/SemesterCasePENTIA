## Udfordringer med JSDoc dokumentation af Pinia stores

Under arbejdet med teknisk dokumentation opstod der en udfordring med at generere JSDoc dokumentation fra projektets Pinia stores.

### Problemet

Pinia stores er struktureret som funktioner der returnerer state, actions og getters inde i et `defineStore` callback:

```js
export const useBuyerStore = defineStore('buyer', () => {
    const buyer = ref(null)
    
    const fetchBuyer = async (buyerId) => { ... }
    
    return { buyer, fetchBuyer }
})
```

JSDoc parseren behandler dette som en enkelt eksporteret konstant – `useBuyerStore` – og stopper ved linje 10 hvor `defineStore` callback'en begynder. Funktionerne inde i callback'en betragtes ikke som selvstændige dokumenterbare enheder, da de er defineret som `const` inde i en anonym funktion. Resultatet var at dokumentationen kun viste storen som én konstant med en beskrivelse, mens alle funktioner – `fetchBuyer`, `updateBuyer`, `fetchBuyerByProjectId` – ikke blev dokumenteret individuelt men i stedet fremstod som et screenshot af hele filen.

### Forsøgt løsning

Vi forsøgte at løse problemet ved at tilføje `@memberof` tagget til hver funktion så JSDoc kunne knytte dem til den overordnede store:

```js
/**
 * @memberof useBuyerStore
 * @param {string} buyerId
 */
const fetchBuyer = async (buyerId) => { ... }
```

Dette hjalp delvist men gav ikke den ønskede strukturerede dokumentation.

### Løsningen

Da Pinia stores med setup syntax ikke er naturligt understøttet af JSDoc parseren, valgte vi i stedet at fokusere dokumentationen på projektets utility funktioner i `src/utils` mappen. Disse funktioner er rene JavaScript funktioner eksporteret direkte uden framework afhængigheder, og JSDoc parser dem korrekt som selvstændige dokumenterbare enheder:

```js
// src/utils/initials.js
/**
 * Genererer initialer fra et for- og efternavn
 * @param {string} firstName
 * @param {string} lastName
 * @returns {string}
 */
export const getInitials = (firstName, lastName) => { ... }
```

Dette gav en korrekt og læsbar dokumentation for alle utility funktioner i projektet.


## Udfordringer med unit tests

### Problemet

Da vi skulle skrive unit tests opstod der en udfordring med at finde funktioner der var isolerede nok til at kunne testes. Projektets logik lå primært to steder:

**I Pinia stores** – her var logikken tæt koblet til Firebase via `getDoc`, `getDocs` og `addDoc`. Det betyder at en test af fx `fetchBuyer` ville kræve at vi mockede Firebase, hvilket gør testene komplekse og skrøbelige.

**Som computed værdier i views** – logik som fase status beregning og billedfiltrering lå hardcodet direkte i `<script setup>` blokken som computed værdier:

```js
// BuyerBuildPlanView.vue
const phases = computed(() => {
    const parentTasks = taskStore.tasks.filter(task => task.isParent)
    const activeIndex = parentTasks.findIndex(task => (task.progress ?? 0) < 100)
    return parentTasks.map((task, index) => ({
        status: task.progress === 100 ? 'completed' : index === activeIndex ? 'active' : 'upcoming',
        ...
    }))
})
```

Denne logik var ikke testbar i isolation fordi den var afhængig af Vue's reaktivitetssystem og `taskStore`.

### Løsningen

Løsningen var at refaktorere den logik der var ren JavaScript – uden Vue eller Firebase afhængigheder – og flytte den til separate filer i `src/utils` mappen. En ren JavaScript funktion tager et input og returnerer et output uden side effects, og er derfor nem at teste isoleret.

Et eksempel er `getPhaseStatus` der blev udtrukket fra `BuyerBuildPlanView.vue` til `src/utils/phaseStatus.js`:

```js
export const getPhaseStatus = (tasks) => {
    if (!tasks?.length) return []
    const parentTasks = tasks.filter(task => task.isParent)
    const activeIndex = parentTasks.findIndex(task => (task.progress ?? 0) < 100)
    return parentTasks.map((task, index) => ({
        status: task.progress === 100 ? 'completed' : index === activeIndex ? 'active' : 'upcoming',
        ...
    }))
}
```

Og i viewet blev computed reduceret til én linje:

```js
const phases = computed(() => getPhaseStatus(taskStore.tasks))
```

Dette gjorde det muligt at skrive isolerede unit tests der ikke kræver Firebase eller Vue:

```js
it('markerer kun første ufærdige fase som active', () => {
    const tasks = [
        { id: 1, name: 'Fundament', isParent: true, progress: 100 },
        { id: 2, name: 'Råhus', isParent: true, progress: 50 },
    ]
    const result = getPhaseStatus(tasks)
    expect(result[0].status).toBe('completed')
    expect(result[1].status).toBe('active')
})
```

Samme tilgang blev anvendt for `getInitials`, `getPhasesWithImages` og `buildConversation` der alle blev udtrukket til `src/utils` og forsynet med unit tests.