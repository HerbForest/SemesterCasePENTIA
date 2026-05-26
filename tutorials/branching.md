## Branching strategi

Branching er en funktion i versionskontrolsystemer som Git der gør det muligt at arbejde på kode i isolation fra hovedkodebasen. En branch er en kopi af koden hvor der kan foretages ændringer uden at påvirke den øvrige kodebase. Når ændringerne er klar, merges branchen tilbage ind i hovedgrenen. Branch strategi henviser til de regler og konventioner et team følger for hvordan og hvornår branches oprettes og merges.

### Hvordan bruges branching?

I projektet anvendes **Trunk-Based Development** som branch strategi. I Trunk-Based Development er `main` den primære branch. Der arbejdes i korte feature branches der holdes til mindre afgrænsede features eller views, og som merges tilbage i `main` når featuren er færdig, minimum én gang dagligt når der arbejdes aktivt på projektet.

<svg width="100%" viewBox="0 0 680 520" role="img" xmlns="http://www.w3.org/2000/svg">
  <title>Trunk-Based Development diagram</title>
  <desc>Flowchart der viser hvordan kortlivede feature branches oprettes fra main og merges tilbage dagligt</desc>

  <defs>
    <marker id="arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="#1D9E75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
    <marker id="arrow-purple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="#534AB7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>

  <!-- Main branch line -->
  <line x1="40" y1="100" x2="640" y2="100" stroke="#888780" stroke-width="2.5" stroke-linecap="round"/>

  <!-- Main label -->
  <text x="40" y="70" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#1C1B19">main</text>
  <text x="40" y="88" font-family="system-ui, sans-serif" font-size="12" fill="#666666">Enkelt kilde til sandhed</text>

  <!-- Commit dots on main -->
  <circle cx="100" cy="100" r="7" fill="#888780" opacity="0.5"/>
  <circle cx="260" cy="100" r="7" fill="#888780" opacity="0.5"/>
  <circle cx="440" cy="100" r="7" fill="#888780" opacity="0.5"/>
  <circle cx="600" cy="100" r="7" fill="#888780" opacity="0.3"/>

  <!-- Merge commit rings -->
  <circle cx="260" cy="100" r="12" fill="none" stroke="#1D9E75" stroke-width="2"/>
  <circle cx="440" cy="100" r="12" fill="none" stroke="#534AB7" stroke-width="2"/>

  <!-- Branch 1: hero-card -->
  <path d="M140 100 Q140 200 180 220" fill="none" stroke="#1D9E75" stroke-width="1.5"/>
  <line x1="180" y1="220" x2="230" y2="220" stroke="#1D9E75" stroke-width="1.5"/>
  <path d="M230 220 Q255 220 260 100" fill="none" stroke="#1D9E75" stroke-width="1.5" marker-end="url(#arrow-green)"/>

  <!-- Branch 1 node -->
  <rect x="148" y="198" width="164" height="44" rx="8" fill="#E1F5EE" stroke="#1D9E75" stroke-width="0.5"/>
  <text x="230" y="216" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#085041">hero-card</text>
  <text x="230" y="233" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#0F6E56">1–2 dages arbejde</text>
  <circle cx="200" cy="220" r="5" fill="#1D9E75" opacity="0.7"/>

  <!-- Branch 2: logout-component -->
  <path d="M300 100 Q300 310 340 330" fill="none" stroke="#534AB7" stroke-width="1.5"/>
  <line x1="340" y1="330" x2="410" y2="330" stroke="#534AB7" stroke-width="1.5"/>
  <path d="M410 330 Q435 330 440 100" fill="none" stroke="#534AB7" stroke-width="1.5" marker-end="url(#arrow-purple)"/>

  <!-- Branch 2 node -->
  <rect x="300" y="308" width="180" height="44" rx="8" fill="#EEEDFE" stroke="#534AB7" stroke-width="0.5"/>
  <text x="390" y="326" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#26215C">logout-component</text>
  <text x="390" y="343" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#534AB7">1–2 dages arbejde</text>
  <circle cx="370" cy="330" r="5" fill="#534AB7" opacity="0.7"/>

  <!-- Merge labels -->
  <text x="260" y="68" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#666666">Merge</text>
  <text x="440" y="68" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#666666">Merge</text>

  <!-- Legend box -->
  <rect x="40" y="420" width="600" height="80" rx="8" fill="none" stroke="#CCCCCC" stroke-width="0.5"/>
  <text x="60" y="444" font-family="system-ui, sans-serif" font-size="12" fill="#666666">Arbejdsgang:</text>

  <circle cx="70" cy="466" r="5" fill="#888780" opacity="0.5"/>
  <text x="84" y="471" font-family="system-ui, sans-serif" font-size="12" fill="#444444">1. Opret branch fra main</text>

  <circle cx="230" cy="466" r="5" fill="#1D9E75" opacity="0.8"/>
  <text x="244" y="471" font-family="system-ui, sans-serif" font-size="12" fill="#444444">2. Arbejd på feature</text>

  <circle cx="380" cy="466" r="5" fill="#534AB7" opacity="0.8"/>
  <text x="394" y="471" font-family="system-ui, sans-serif" font-size="12" fill="#444444">3. Merge til main dagligt</text>

  <circle cx="545" cy="466" r="5" fill="none" stroke="#888780" stroke-width="1.5"/>
  <text x="559" y="471" font-family="system-ui, sans-serif" font-size="12" fill="#444444">4. Slet branch</text>
</svg>

**Et eksempel:**

1. En ny branch oprettes til en specifik feature, eksempelvis `BB-homepage`
2. Der arbejdes på featuren i branchen
3. Når featuren er færdig merges branchen ind i `main`
4. Branchen slettes og en ny oprettes til næste feature

Det er valgt ikke at anvende feature toggles i projektet. I stedet holdes branches tilstrækkeligt små og kortlivede til at de kan merges uden at introducere ufærdig funktionalitet i `main`.

### Erfaringer med Trunk-Based Development

Trunk-Based Development har haft en positiv effekt på samarbejdet i projektet. Ved konsekvent at holde branches til mindre features og merge dagligt sikres det at alle teammedlemmer altid arbejder med den nyeste version af kodebasen, hvilket minimerer risikoen for at arbejde oven i hinanden og lave dobbeltarbejde.

Der var indledningsvis en indlæringsperiode hvor strategien skulle indøves. Det blev hurtigt tydeligt at afvigelser fra strategien, eksempelvis ved at arbejde i større og længerelevende branches, resulterede i flere merge konflikter. Dette bekræftede værdien af at holde sig til små og hyppigt mergede branches, og har gjort teamet mere bevidst om at følge strategien konsekvent.