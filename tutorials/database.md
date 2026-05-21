# Database

Projektet bruger **Firebase Firestore** som database — en NoSQL dokument-database organiseret i collections og documents.

## Struktur

```
projects/
  {projectId}/
    address          string   — projektadresse
    name             string   — projektnavn / kundenavn
    builderId        string   — ref til users/{userId}
    expectedDelivery string   — forventet afleveringsdato
    progress         number   — samlet fremgang i procent

    tasks/
      {taskId}/
        id           number   — unikt task ID
        name         string   — task navn
        startDate    string   — startdato (YYYY-MM-DD)
        endDate      string   — slutdato (YYYY-MM-DD)
        progress     number   — fremgang i procent (0-100)
        isParent     boolean  — true hvis task er en fase
        parentId     number   — ID på parent task (kun child tasks)
        predecessor  number[] — array af task IDs der skal være færdige først
        collapsed    boolean  — om fasen er foldet sammen i Gantt diagrammet

users/
  {userId}/
    role             string   — "buyer" eller "builder"
    firstName        string
    lastName         string
```

## Relationer

- **Tasks er en subcollection** under projects — de har ikke et `projectId` felt, men tilgås via stien `projects/{projectId}/tasks`
- **`builderId`** på et project dokument peger på et dokument i `users` collections
- **`isParent: true`** markerer en fase (overordnet task) — child tasks har `parentId` der peger på deres fase

## Task-træ struktur

Tasks gemmes fladt i Firestore med `parentId` til at definere hierarkiet. I applikationen bygges de om til et træ med `children` arrays til brug i Gantt diagrammet:

```
Fase 1 (isParent: true)
├── Task A (parentId: 1)
└── Task B (parentId: 1, predecessor: [TaskA.id])

Fase 2 (isParent: true, predecessor: [1])
└── Task C (parentId: 2)
```
