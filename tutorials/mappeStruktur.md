src/
├── App.vue                          # Rod komponent – håndterer auth og data hentning
├── main.js                          # Applikationens entry point
│
├── assets/
│   ├── scss/
│   │   ├── _variables.scss          # Globale SCSS variabler
│   │   └── main.scss                # Global styling
│   └── *.jpg                        # Statiske billeder
│
├── components/
│   ├── BuyerHeroCard.vue            # Hero slideshow komponent til bygherre forsiden
│   ├── MessageInput.vue             # Besked input felt
│   ├── buttons/
│   │   ├── LogoutButton.vue         # Log ud knap med variant prop (outline/filled)
│   │   ├── ReturnButton.vue         # Tilbage knap
│   │   ├── RoundButtons.vue
│   │   ├── SlideButtons.vue
│   │   └── SqaureButtons.vue
│   ├── cards/
│   │   ├── ButtonCard.vue           # Genbrugelig card med RouterLink support
│   │   ├── ConversationCard.vue     # Samtale oversigt kort
│   │   ├── DocumentCard.vue         # Dokument kort med download og slet
│   │   ├── MessageCard.vue          # Besked kort med initialer avatar
│   │   ├── PhaseProgressCard.vue    # Fase kort med completed/active/upcoming styling
│   │   ├── ProfileCard.vue          # Profil kort med redigering
│   │   ├── TextCard.vue             # Generisk tekst card
│   │   └── UploadCard.vue           # Upload kort til dokument og billede upload
│   ├── library/
│   │   ├── GanttDiagram.vue         # Gantt diagram komponent
│   │   └── ProgressCircle.vue       # Cirkulær progress indikator
│   └── navigation/
│       ├── BuilderButtomNav.vue     # Byggeleder bottom navigation
│       ├── BuilderNavbar.vue        # Byggeleder navbar
│       ├── BuyerFooter.vue          # Bygherre footer navigation
│       └── BuyerHeader.vue          # Bygherre header med initialer avatar
│
├── composables/
│   └── useStorage.js                # Firebase Storage – upload og slet filer
│
├── config/
│   └── firebase.js                  # Firebase konfiguration og eksport
│
├── layout/
│   ├── BuilderLayout.vue            # Layout wrapper til byggeleder flow
│   └── BuyerLayout.vue              # Layout wrapper til bygherre flow
│
├── router/
│   └── index.js                     # Vue Router konfiguration og routes
│
├── services/
│   ├── firestore.js                 # Firestore hjælpefunktioner
│   └── seed*.js                     # Seed scripts til testdata
│
├── stores/
│   ├── authStore.js                 # Firebase Auth – login, logout, auth state
│   ├── builderStore.js              # Byggeleder data fra Firestore
│   ├── buyerStore.js                # Bygherre data fra Firestore
│   ├── documentStore.js             # Dokumenter fra Firestore
│   ├── imageStore.js                # Billeder fra Firestore grupperet efter fase
│   ├── progressStore.js             # Beregning af projekt og fase progress
│   ├── projectStore.js              # Projekt data fra Firestore
│   └── taskStore.js                 # Tasks/faser fra Firestore
│
├── utils/
│   ├── BuilderConversation.js       # Bygger samtale objekt til ConversationCard
│   ├── initials.js                  # Beregner initialer fra for- og efternavn
│   ├── initials.test.js             # Unit tests for getInitials
│   ├── phaseStatus.js               # Beregner fase status (completed/active/upcoming)
│   ├── phaseStatus.test.js          # Unit tests for getPhaseStatus
│   ├── phasesWithImages.js          # Filtrerer faser der har billeder
│   └── phasesWithImages.test.js     # Unit tests for getPhasesWithImages
│
└── views/
    ├── LoginView.vue                # Login side
    ├── builderViews/
    │   ├── BuilderBuildPlanView.vue      # Byggeplan oversigt
    │   ├── BuilderChatView.vue           # Chat med bygherre
    │   ├── BuilderDocumentView.vue       # Dokumenter for et projekt
    │   ├── BuilderHomePageView.vue       # Byggeleder forside
    │   ├── BuilderImageFolderView.vue    # Billedmapper med fase filter
    │   ├── BuilderMessengerView.vue      # Samtale oversigt
    │   ├── BuilderSettingsView.vue       # Indstillinger og profil
    │   ├── BuilderUploadView.vue         # Upload dokumenter og billeder
    │   └── BuildLeadersBuildPageView.vue # Projekt dashboard
    └── buyerViews/
        ├── BuyerBuilderContactView.vue   # Kontakt byggeleder
        ├── BuyerBuildPlanView.vue        # Byggeplan med fase progress
        ├── BuyerDocumentView.vue         # Kontrakter og tillægsaftaler
        ├── BuyerHomePageView.vue         # Bygherre forside
        ├── BuyerMessageView.vue          # Beskeder med byggeleder
        ├── BuyerMorePageView.vue         # Mere side
        ├── BuyerProfileView.vue          # Profil side
        └── BuyerSettingsView.vue         # Indstillinger