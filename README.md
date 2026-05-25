# SemesterCasePENTIA

En Vue 3 + Firebase applikation til byggestyring med to portaler: en til byggeledere og en til boligkøbere.

## Dokumentation

API-dokumentationen er genereret med JSDoc og kan ses på GitHub Pages:
[https://herbforest.github.io/SemesterCasePENTIA/](https://herbforest.github.io/SemesterCasePENTIA/)

### Hvorfor ser store-dokumentationen anderledes ud?

Projektets stores er skrevet med **Pinia setup stores** — en funktion der returnerer reactive state og actions via en callback:

```js
export const useTaskStore = defineStore('task', () => {
  const tasks = ref([]);
  const fetchTasks = async (projectId) => { ... };
  return { tasks, fetchTasks };
});
```

JSDoc er et statisk analyseværktøj — det kan kun se kode der er skrevet direkte på modul-niveau. Fordi `tasks`, `fetchTasks` og de andre members er defineret **inde i en callback-funktion**, kan JSDoc ikke finde eller dokumentere dem enkeltvist.

Det betyder at JSDoc kun viser selve store-konstanten (`useTaskStore`), men ikke de individuelle refs og funktioner der returneres fra den.

Utilities og andre funktioner der er skrevet direkte på modul-niveau dokumenteres korrekt med JSDoc.

## Kom i gang

```sh
npm install
npm run dev
```

## Tilgængelige scripts

| Script | Beskrivelse |
|--------|-------------|
| `npm run dev` | Start udviklingsserver |
| `npm run build` | Byg til produktion |
| `npm run lint` | Kør ESLint |
| `npm run docs` | Generer JSDoc dokumentation |
| `npm run test:unit` | Kør unit tests |
| `npx cypress open` | Åbn Cypress E2E test UI |

## E2E Tests

Se [tutorials/e2eTest.md](tutorials/e2eTest.md) for vejledning til at køre end-to-end tests.
