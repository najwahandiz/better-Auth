# Instructions pour le Développement - Projet Dir-Khir

**Contexte du Projet**

Vous êtes développeur Full-Stack au sein de "L'Agence Digitale du Sud", une agence basée à Agadir spécialisée dans l'innovation sociale. Ce matin, votre Chef de Projet vous convoque pour une réunion d'urgence.

Une association majeure de commerçants et de citoyens marocains souhaite lancer une plateforme pilote nommée "Dir-Khir". Le but est de coordonner l'entraide de proximité dans les quartiers (nettoyage de rues, aide scolaire, dons urgents).

//
Le Problème

L'association doit présenter ce projet à des investisseurs sociaux ce vendredi. Ils ont déjà essayé de gérer cela via des groupes Facebook, mais c'est le chaos total : les demandes se perdent et personne ne sait qui aide qui.

Votre Mission

Votre Lead Developer a déjà préparé le terrain en choisissant une structure solide : Next.js 15 avec Better-Auth pour la sécurité et Drizzle ORM pour la gestion des données.

Il vous confie la responsabilité de livrer le prototype fonctionnel.
📝 Le Cahier des Charges (Roadmap)

"L'investisseur ne veut pas voir de simples maquettes statiques. Il veut voir un utilisateur se connecter, poster un besoin réel et voir un autre citoyen cliquer sur 'Je participe'." — Votre Chef de Projet.
🏗️ Phase 1 : Installation & Authentification

Le "Moul el Café" (le client) insiste sur la sécurité. Utilisez le boilerplate Better-Auth pour configurer l'inscription et la connexion. Personnalisez l'interface pour qu'elle reflète l'identité marocaine (couleurs inspirées de l'artisanat local).

🗄️ Phase 2 : Structure des Données

Définissez le schéma de la base de données. Un "Besoin" doit avoir un titre, une description, une ville (Casablanca, Marrakech, etc.) et être lié à un utilisateur spécifique.

⚡ Phase 3 : Flux de Travail (Vibe Coding vs Logique)

Même si vous utilisez des outils modernes, vous devez maîtriser la logique :

Créez le formulaire de publication avec des Server Actions.
Affichez les besoins sur la page d'accueil sous forme de cartes (Cards) élégantes.
Implémentez la logique de "Compteur de Volontaires".
🌍 Phase 4 : La Touche Finale

Ajoutez un bouton WhatsApp pour chaque annonce afin que l'aide puisse se concrétiser instantanément.

La Page d'Accueil (/) – "Le Fil d'Actions"
C'est la vitrine du projet pour l'investisseur.
Ce qu'on y trouve :
Hero Section : Un message fort (ex: "L'entraide de quartier, de Tanger à Lagouira").
Barre de Filtres : Filtrer par ville (Casablanca, Agadir, etc.) et par catégorie.
Grille de Cartes (Cards) : Chaque carte affiche le titre, la ville, la catégorie, et un badge "Ouvert" ou "Complet".
Le Compteur : Un petit indicateur visuel : "🔥 5 citoyens aident déjà".
Logique : Lecture seule pour les visiteurs, bouton "Je participe" interactif pour les connectés.
Authentification (/login & /register)
Ce qu'on y trouve :
Formulaires épurés (Shadcn UI).
Design inspiré du Maroc (ex: un fond avec un motif de zellige très léger ou des couleurs Terre de Sienne/Vert Émeraude).
Logique : Redirection vers la page d'accueil ou le dashboard après succès
Formulaire de Publication (/proposer-un-besoin)
C'est ici que la mission commence.
Ce qu'on y trouve :
Champs : Titre court, Description détaillée (Textarea), Ville (Select), Catégorie (Select).
Input WhatsApp : Un champ pour entrer son numéro de téléphone.
Logique : Server Action (createNeed) qui vérifie si l'utilisateur est bien connecté avant d'insérer en base de données.
Dashboard Utilisateur (/mon-espace)
Pour prouver que "personne ne se perd".
Ce qu'on y trouve :
Mes Demandes : Liste des besoins que j'ai postés (avec option pour les marquer comme "Résolu").
Mes Engagements : Liste des projets où j'ai cliqué sur "Je participe".
Logique : Requêtes Drizzle filtrées par l'ID de l'utilisateur session.


**La Stack Technologique (Standard 2026)**

Core Framework & Logique
Next.js 15 (App Router) : Utilisation des React Server Components (RSC) pour la performance et du Streaming pour l'expérience utilisateur.
TypeScript : Obligatoire pour un code sans bugs et une auto-complétion parfaite.
Zod : Pour la validation des schémas de données (formulaires et réponses API).
Base de Données & Authentification
PostgreSQL (Neon.tech) : Base de données relationnelle serverless.
Drizzle ORM : Pour des requêtes SQL typées et ultra-rapides.
Better-Auth : Gestion sécurisée des sessions, compatible avec le déploiement sur l'Edge.
3. Interface Utilisateur (UI/UX)
Tailwind CSS : Pour un stylage rapide et responsive.
Shadcn/UI : Bibliothèque de composants accessibles (Buttons, Cards, Forms, Dialogs).
Lucide React : Pour les icônes modernes et légères.
Outils de "Vibe Coding" (Productivité IA)
v0.dev : Pour générer rapidement les squelettes d'interfaces à partir de prompts.
Cursor : L'IDE IA-native pour coder avec le contexte de tout le projet (@Codebase).



**Modalités d'évaluation**
Vous disposez de 25 minutes réparties comme suit :

Démonstration (10 min)

Génération de l'interface utilisateur (UI) via v0 (Landing page & Dashboard).

Flux d'authentification fonctionnel (Better-Auth intégré par l'IA).

Publication d'un besoin "Dir-Khir" (CRUD généré par Cursor).

Interaction dynamique : Incrémentation du compteur de bénévoles.

Adaptation responsive mobile (vérifiée par l'agent).

Mise en situation (15 min)

Explication du workflow "Vibe Coding" (v0 → Cursor).

Rôle du Contexte (@Codebase, @Docs) pour guider l'agent.

Utilisation de l'IA pour connecter Drizzle ORM aux Server Actions.

Démonstration de la résolution de bugs via "Cascade" ou "Auto-Fix".

Justification de l'architecture générée par l'IA (Next.js App Router).


**Critères de performance**
Pertinence du Prompting : Capacité à utiliser des instructions claires dans v0 et Cursor pour obtenir un code fonctionnel du premier coup.

Gestion du Contexte : Utilisation correcte des références (@file, @folder, @docs) pour aider l'IA à comprendre l'architecture du projet.

Débogage Assisté : Rapidité à identifier et corriger une erreur en utilisant les agents (ex: Cascade ou Chat) plutôt que de coder manuellement.

**🛠️ Qualité Technique (Next.js & Backend)**
Intégrité de l'Auth : Système de connexion/déconnexion fluide et sécurisé via Better-Auth.

Fiabilité des Données : Création réussie d'un besoin en base de données via Drizzle ORM (validation du schéma).

Performance UI : Interface fluide, responsive (mobile-first) et respectant les composants de Shadcn UI.

🇲🇦 Impact & Contexte local
Expérience Utilisateur (UX) : L'application répond-elle intuitivement au problème "Dir-Khir" (facilité de publier et d'aider) ?

Finition "Maroc" : Intégration réussie de la localisation (villes du Maroc) et du bouton de contact WhatsApp.


**MA SITUATION :**
- Je suis un développeur frontend débutant
- C'est ma première fois avec Cursor et le "vibe coding"
- J'ai besoin d'être guidé étape par étape
- Le projet doit être présenté aux investisseurs vendredi

**STACK TECHNIQUE DÉJÀ CHOISIE :**
- Next.js 15 (App Router)
- TypeScript
- PostgreSQL + Drizzle ORM
- Better-Auth pour l'authentification
- Tailwind CSS + Shadcn/UI
- v0.dev pour le prototypage


**Architecture du projet que tu dois suiver :**
src/
├── app/
│   ├── (routes)/
│   │   ├── (auth)/                          # ✅ EXISTE DÉJÀ
│   │   │   ├── signin/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── form.tsx
│   │   │   │   └── validate.ts
│   │   │   ├── signup/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── form.tsx
│   │   │   │   └── validate.ts
│   │   │   └── components/
│   │   │       ├── button-signout.tsx
│   │   │       ├── gender-radio-group.tsx
│   │   │       ├── input-password.tsx
│   │   │       └── input-start-icon.tsx
│   │   │
│   │   ├── (home)/                          # ✅ EXISTE - À MODIFIER
│   │   │   └── page.tsx                     # 🔄 Landing page Dir-Khir
│   │   │
│   │   ├── (dashboard)/                     # 🆕 À CRÉER
│   │   │   └── mon-espace/
│   │   │       ├── page.tsx                 # Dashboard utilisateur
│   │   │       ├── layout.tsx               # Layout dashboard
│   │   │       └── components/
│   │   │           ├── mes-demandes.tsx     # Liste des besoins postés
│   │   │           ├── mes-engagements.tsx  # Liste des participations
│   │   │           └── sidebar.tsx          # Navigation latérale
│   │   │
│   │   └── (besoins)/                       # 🆕 À CRÉER
│   │       ├── proposer-un-besoin/
│   │       │   ├── page.tsx                 # Formulaire création besoin
│   │       │   ├── form.tsx                 # Composant formulaire
│   │       │   ├── validate.ts              # Validation Zod
│   │       │   └── action.ts                # Server Action
│   │       │
│   │       └── [id]/
│   │           └── page.tsx                 # Page détail d'un besoin
│   │
│   ├── api/
│   │   └── auth/[...all]/                   # ✅ EXISTE
│   │       └── route.ts
│   │
│   ├── layout.tsx                           # ✅ EXISTE
│   ├── globals.css                          # ✅ EXISTE - À PERSONNALISER
│   └── favicon.ico
│
├── components/
│   ├── ui/                                  # ✅ EXISTE (Shadcn)
│   │   ├── button.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── card.tsx                         # 🆕 À AJOUTER (Shadcn)
│   │   ├── select.tsx                       # 🆕 À AJOUTER (Shadcn)
│   │   ├── textarea.tsx                     # 🆕 À AJOUTER (Shadcn)
│   │   ├── badge.tsx                        # 🆕 À AJOUTER (Shadcn)
│   │   ├── dialog.tsx                       # 🆕 À AJOUTER (Shadcn)
│   │   ├── avatar.tsx                       # 🆕 À AJOUTER (Shadcn)
│   │   └── skeleton.tsx                     # 🆕 À AJOUTER (Shadcn)
│   │
│   └── shared/                              # 🆕 À CRÉER
│       ├── navbar.tsx                       # Navigation principale
│       ├── footer.tsx                       # Footer du site
│       ├── hero-section.tsx                 # Section héro landing
│       ├── filter-bar.tsx                   # Barre de filtres (ville/catégorie)
│       ├── besoin-card.tsx                  # Carte d'un besoin
│       ├── besoin-grid.tsx                  # Grille de cartes
│       ├── compteur-volontaires.tsx         # Badge "🔥 5 citoyens aident"
│       ├── whatsapp-button.tsx              # Bouton contact WhatsApp
│       └── city-select.tsx                  # Sélecteur de ville marocaine
│
├── db/
│   ├── index.ts                             # ✅ EXISTE
│   └── schema/
│       ├── auth/                            # ✅ EXISTE
│       │   ├── user.ts
│       │   ├── session.ts
│       │   ├── account.ts
│       │   ├── verification.ts
│       │   └── index.ts
│       │
│       ├── besoin/                          # 🆕 À CRÉER
│       │   ├── besoin.ts                    # Table des besoins
│       │   ├── participation.ts             # Table des participations
│       │   └── index.ts
│       │
│       └── index.ts                         # 🔄 À MODIFIER (ajouter besoin)
│
├── lib/
│   ├── auth/                                # ✅ EXISTE
│   │   ├── server.ts
│   │   ├── client.ts
│   │   ├── get-session.ts
│   │   ├── password.ts
│   │   └── usernames.ts
│   │
│   ├── actions/                             # 🆕 À CRÉER
│   │   ├── besoin.ts                        # Server Actions pour besoins
│   │   └── participation.ts                 # Server Actions pour participations
│   │
│   ├── constants/                           # 🆕 À CRÉER
│   │   ├── cities.ts                        # Liste des villes marocaines
│   │   └── categories.ts                    # Catégories de besoins
│   │
│   └── utils.ts                             # ✅ EXISTE
│
├── providers/
│   └── index.tsx                            # ✅ EXISTE
│
└── routes.ts                                # 🔄 À MODIFIER

## Logique métier
- Un besoin appartient à un utilisateur
- Un utilisateur peut participer à plusieurs besoins
- Le compteur s’incrémente quand on clique sur "Je participe"