# Authentication og adgangskontrol

Applikationen bruger Firebase Authentication til login og Firebase Firestore Security Rules til at styre hvad de to brugerroller må læse og skrive.

## De to roller

| Rolle | Beskrivelse |
|-------|-------------|
| **Byggeleder** | Har et dokument i `/builders` collectionen. Kan uploade filer, oprette og redigere tasks |
| **Køber** | Har et dokument i `/users` collectionen med `role: 'buyer'`. Kan se data men ikke ændre det |

---

## Login flow

Login sker i `LoginView.vue` via `authStore.login()`. Efter succesfuldt login slår applikationen op i `/users/{uid}` for at finde brugerens rolle og sender dem til den rigtige portal:

```js
// LoginView.vue
await authStore.login(email.value, password.value)

const uid = authStore.user.uid
const snap = await getDoc(doc(db, 'users', uid))

if (snap.exists() && snap.data().role === 'byggeleder') {
    router.push('/builder/homepage')
} else {
    router.push('/buyer/home')
}
```

`authStore` bruger Firebase `onAuthStateChanged` til at holde `user` opdateret på tværs af hele applikationen — også ved genindlæsning af siden:

```js
// authStore.js
onAuthStateChanged(auth, (firebaseUser) => {
    user.value = firebaseUser
    loading.value = false
})
```

`loading` er `true` indtil Firebase har bekræftet login-status. Det bruges i `App.vue` til at undgå at vise indhold før auth er klar.

---

## Firestore Security Rules

Reglerne definerer hvad der må læses og skrives i databasen — uanset hvad klientkoden gør.

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isSignedIn() {
      return request.auth != null;
    }

    function isUser(userId) {
      return isSignedIn() && request.auth.uid == userId;
    }

    function isBuilder() {
      return isSignedIn() &&
        exists(/databases/$(database)/documents/builders/$(request.auth.uid));
    }

    match /users/{userId} {
      allow read: if isUser(userId) || isBuilder();
      allow write: if isUser(userId);
    }

    match /builders/{builderId} {
      allow read: if isSignedIn();
      allow write: if isUser(builderId);
    }

    match /projects/{projectId} {
      allow read: if isSignedIn();
      allow write: if false;

      match /tasks/{taskId} {
        allow read: if isSignedIn();
        allow write: if isBuilder();
      }
    }

    match /documents/{documentId} {
      allow read: if isSignedIn();
      allow write: if isBuilder();
    }

    match /images/{imageId} {
      allow read: if isSignedIn();
      allow write: if isBuilder();
    }
  }
}
```

### Hjælpefunktioner

**`isSignedIn()`** — tjekker at der er en aktiv Firebase session. Alle regler kræver minimum dette.

**`isUser(userId)`** — tjekker at den indloggede bruger er den samme som den der forsøger at læse/skrive. Bruges til at sikre at brugere kun kan redigere deres egne data.

**`isBuilder()`** — tjekker at der eksisterer et dokument i `/builders` collectionen med den indloggede brugers UID. Det er selve tilstedeværelsen af dokumentet der giver byggelederrettigheder — ikke et felt i dokumentet.

---

### Rettigheder per collection

| Collection | Læse | Skrive |
|-----------|------|--------|
| `/users/{userId}` | Kun egen bruger, eller byggeleder | Kun egen bruger |
| `/builders/{builderId}` | Alle indloggede | Kun sig selv |
| `/projects/{projectId}` | Alle indloggede | Ingen (kun via Admin SDK) |
| `/projects/{id}/tasks/{taskId}` | Alle indloggede | Kun byggeledere |
| `/documents/{documentId}` | Alle indloggede | Kun byggeledere |
| `/images/{imageId}` | Alle indloggede | Kun byggeledere |

### Vigtige designbeslutninger

**Projekter kan ikke skrives fra klienten** (`write: if false`) — projekter oprettes og administreres kun via Firebase Admin SDK eller Firestore-konsollen. Det forhindrer at nogen kan oprette, ændre eller slette projekter direkte fra appen.

**Byggeleder-rollen styres af databasen, ikke klientkoden** — `isBuilder()` tjekker om et dokument eksisterer i `/builders`. Det betyder at man ikke kan give sig selv byggelederrettigheder ved at manipulere klientkoden, da reglen kører på Firebases servere.

**Køber kan se alt men ændre ingenting** — en indlogget køber kan læse projekter, tasks, dokumenter og billeder, men har ikke skriveadgang til nogen af disse collections.
