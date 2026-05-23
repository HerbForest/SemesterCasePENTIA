Linting

Linting er en statisk kodeanalyse der automatisk gennemgår koden og markerer fejl, uhensigtsmæssige mønstre og stilmæssige afvigelser uden at koden behøver at blive kørt. Det sikrer en ensartet kodekvalitet på tværs af projektet og hjælper med at opdage fejl tidligt i udviklingsprocessen.
I dette projekt anvendes ESLint som linting værktøj, konfigureret til at analysere JavaScript og Vue filer i src mappen. ESLint er integreret direkte i editoren, hvilket betyder at fejl og advarsler vises løbende mens der kodes. Som en del af den personlige arbejdsgang køres linting manuelt efter hvert færdiggjort komponent eller view, så fejl rettes inden koden merges til main.
Følgende regler er konfigureret i projektet:
vue/no-unused-vars – markerer en fejl hvis variabler er defineret men ikke anvendt i Vue komponenter
quotes – kræver at der anvendes enkelt anførselstegn konsekvent i hele kodebasen
indent – advarer hvis der ikke er anvendt tab-indrykning
semi – kræver at alle sætninger afsluttes med semikolon
Udover den manuelle linting er ESLint integreret i projektets CI/CD pipeline. Ved et deployment til Firebase Hosting køres linting automatisk, og hvis koden indeholder fejl der bryder de definerede regler, blokeres deploymentet. Dette sikrer at kode der ikke overholder projektets standarder aldrig når produktionsmiljøet.
