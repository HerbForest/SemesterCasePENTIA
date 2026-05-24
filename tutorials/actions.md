# CI/CD Pipeline

CI/CD står for Continuous Integration og Continuous Deployment. Det er en automatiseret proces der sikrer at kode der pushes til GitHub automatisk gennemgår en række tjek og til sidst deployes til produktion.

I projektet er pipelinen sat op med GitHub Actions og konfigureret i `.github/workflows/ci.yml`.

---

## Hvornår kører pipelinen?

Pipelinen trigges automatisk ved:

- `push` til `main` branchen
- `pull_request` mod `main` branchen

```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
```

---

## Pipeline flow

<svg width="100%" viewBox="0 0 680 280" role="img" xmlns="http://www.w3.org/2000/svg">
  <title>CI/CD pipeline flow</title>
  <desc>Flowchart der viser lint, test, build, e2e og deploy jobs i rækkefølge</desc>
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>

  <!-- Push / PR -->
  <rect x="20" y="100" width="90" height="56" rx="8" fill="#F1EFE8" stroke="#B4B2A9" stroke-width="0.5"/>
  <text x="65" y="122" text-anchor="middle" font-size="14" font-weight="500" fill="#2C2C2A">Push / PR</text>
  <text x="65" y="140" text-anchor="middle" font-size="12" fill="#5F5E5A">main branch</text>

  <!-- Arrow -->
  <line x1="110" y1="128" x2="128" y2="128" stroke="#888780" stroke-width="1.5" marker-end="url(#arrow)"/>

  <!-- Lint -->
  <rect x="130" y="100" width="90" height="56" rx="8" fill="#E1F5EE" stroke="#0F6E56" stroke-width="0.5"/>
  <text x="175" y="122" text-anchor="middle" font-size="14" font-weight="500" fill="#085041">Lint</text>
  <text x="175" y="140" text-anchor="middle" font-size="12" fill="#0F6E56">ESLint check</text>

  <!-- Arrow -->
  <line x1="220" y1="128" x2="238" y2="128" stroke="#888780" stroke-width="1.5" marker-end="url(#arrow)"/>

  <!-- Test -->
  <rect x="240" y="100" width="90" height="56" rx="8" fill="#E1F5EE" stroke="#0F6E56" stroke-width="0.5"/>
  <text x="285" y="122" text-anchor="middle" font-size="14" font-weight="500" fill="#085041">Test</text>
  <text x="285" y="140" text-anchor="middle" font-size="12" fill="#0F6E56">Vitest units</text>

  <!-- Arrow -->
  <line x1="330" y1="128" x2="348" y2="128" stroke="#888780" stroke-width="1.5" marker-end="url(#arrow)"/>

  <!-- Build -->
  <rect x="350" y="100" width="90" height="56" rx="8" fill="#EEEDFE" stroke="#534AB7" stroke-width="0.5"/>
  <text x="395" y="122" text-anchor="middle" font-size="14" font-weight="500" fill="#26215C">Build</text>
  <text x="395" y="140" text-anchor="middle" font-size="12" fill="#534AB7">Vite produktion</text>

  <!-- Arrow -->
  <line x1="440" y1="128" x2="458" y2="128" stroke="#888780" stroke-width="1.5" marker-end="url(#arrow)"/>

  <!-- E2E -->
  <rect x="460" y="100" width="90" height="56" rx="8" fill="#EEEDFE" stroke="#534AB7" stroke-width="0.5"/>
  <text x="505" y="122" text-anchor="middle" font-size="14" font-weight="500" fill="#26215C">E2E</text>
  <text x="505" y="140" text-anchor="middle" font-size="12" fill="#534AB7">Cypress tests</text>

  <!-- Arrow -->
  <line x1="550" y1="128" x2="568" y2="128" stroke="#888780" stroke-width="1.5" marker-end="url(#arrow)"/>

  <!-- Deploy -->
  <rect x="570" y="100" width="90" height="56" rx="8" fill="#FAECE7" stroke="#993C1D" stroke-width="0.5"/>
  <text x="615" y="122" text-anchor="middle" font-size="14" font-weight="500" fill="#4A1B0C">Deploy</text>
  <text x="615" y="140" text-anchor="middle" font-size="12" fill="#993C1D">Firebase Hosting</text>

  <!-- Kun main label -->
  <text x="615" y="85" text-anchor="middle" font-size="12" fill="#993C1D">kun main</text>
  <line x1="615" y1="90" x2="615" y2="100" stroke="#993C1D" stroke-width="0.5" stroke-dasharray="3 2"/>

  <!-- Kræver lint + test label -->
  <text x="395" y="175" text-anchor="middle" font-size="12" fill="#534AB7">kræver lint + test</text>
</svg>

Hvert job er afhængigt af det forrige – hvis et job fejler, stoppes resten af pipelinen. Deploy køres kun ved push til `main`, ikke ved pull requests.

---

## Jobs

### 1. Lint
Kører ESLint på alle JavaScript og Vue filer i `src` mappen. Hvis koden indeholder fejl der bryder de definerede regler, stoppes pipelinen her og der deployes ikke.

```yaml
lint:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: 20
        cache: "npm"
    - run: npm ci
    - run: npm run lint
```

### 2. Test
Kører unit tests med Vitest. Jobbet venter på at `lint` er gennemført. Hvis en test fejler stoppes pipelinen.

```yaml
test:
  needs: lint
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: 20
        cache: "npm"
    - run: npm ci
    - run: npm run test
```

### 3. Build
Bygger applikationen med Vite til produktion. Jobbet venter på at både `lint` og `test` er gennemført. Den færdige `dist` mappe uploades som et artifact så efterfølgende jobs kan bruge den.

```yaml
build:
  needs: [lint, test]
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: 20
        cache: "npm"
    - run: npm ci
    - run: npm run build
    - uses: actions/upload-artifact@v4
      with:
        name: dist
        path: dist
```

### 4. E2E
Kører end-to-end tests med Cypress mod den byggede applikation. Jobbet downloader `dist` artifactet og starter en preview server.

```yaml
e2e:
  needs: build
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/download-artifact@v4
      with:
        name: dist
        path: dist
    - uses: cypress-io/github-action@v6
      with:
        start: npm run preview
        wait-on: "http://localhost:4173"
```

### 5. Deploy
Deployer applikationen til Firebase Hosting. Jobbet kører kun ved push til `main` ikke ved pull requests. Det bruger to secrets der er gemt i GitHub repository settings:

- `GITHUB_TOKEN` – automatisk tilgængeligt i GitHub Actions
- `FIREBASE_SERVICE_ACCOUNT` - Firebase service account nøgle

```yaml
deploy:
  needs: e2e
  runs-on: ubuntu-latest
  if: github.ref == 'refs/heads/main'
  steps:
    - uses: actions/checkout@v4
    - uses: actions/download-artifact@v4
      with:
        name: dist
        path: dist
    - uses: FirebaseExtended/action-hosting-deploy@v0
      with:
        repoToken: ${{ secrets.GITHUB_TOKEN }}
        firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
        channelId: live
        projectId: pentiacase-9d786
```

---

## Afhængigheder mellem jobs

| Job | Venter på |
|-----|-----------|
| `lint` | – |
| `test` | `lint` |
| `build` | `lint` + `test` |
| `e2e` | `build` |
| `deploy` | `e2e` (kun main) |