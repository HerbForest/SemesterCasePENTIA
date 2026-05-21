# Arkitektur

## Overblik

PENTIA er en byggestyring applikation med to portaler: én til **købere** og én til **byggeledere**. Applikationen er bygget med Vue 3 og Firebase.

## Tech Stack

| Teknologi | Formål |
|---|---|
| Vue 3 | UI framework (Composition API) |
| Pinia | State management (stores) |
| Firebase Firestore | Database |
| Firebase Auth | Brugerhåndtering |
| Vue Router | Routing |
| SCSS | Styling med variabler og BEM |

## Portaler

### Køber (/buyer)
Købere kan følge deres byggeproces, se dokumenter, billeder, Gantt diagram og kommunikere med byggeleder.

### Byggeleder (/builder)
Byggeledere kan administrere alle deres projekter, opdatere tasks i Gantt diagrammet og kommunikere med købere.

## Store-lag

Stores er mellemleddet mellem Firestore og views — views kalder aldrig Firestore direkte.

| Store | Ansvar |
|---|---|
| `authStore` | Firebase Auth, login/logout, brugerrolle |
| `projectStore` | Henter og holder projektdata |
| `taskStore` | CRUD på tasks, tasks for ét og alle projekter |
| `progressStore` | Beregner progress baseret på datoer, bygger task-træ |
| `buyerStore` | Henter køberdata |

## Dataflow

```
Firestore → store (fetch) → computed → template
template → brugerhandling → store (set/delete) → Firestore
```

## Routing

```
/login
/buyer
  /home
  /byggeplan
  /beskeder
  /dokumenter
  /profil
  /mere
/builder
  /homepage
  /bygger/:id
  /byggeplan
  /beskeder
  /chat/:id
  /menu
```

## Komponent-hierarki

```
App.vue
├── BuyerLayout.vue
│   ├── BuyerNavbar.vue
│   ├── RouterView (buyer views)
│   └── BuyerBottomNav.vue
└── BuilderLayout.vue
    ├── BuilderNavbar.vue
    ├── RouterView (builder views)
    └── BuilderBottomNav.vue
```

Komponenter er opdelt i:
- `components/cards` — kort komponenter (ButtonCard)
- `components/navigation` — navbar og bottom navigation
- `components/library` — genbrugelige UI komponenter (GanttDiagram, ProgressCircle)
