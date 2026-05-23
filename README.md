# Ski Location Frontend

Application frontend de location de logements développée avec Svelte et Vite.

## Description du projet

Cette application permet de :

- consulter une liste de logements
- chercher des logements par ville ou nom
- voir le détail d'un logement
- réserver un logement
- ajouter un nouveau logement
- modifier un logement existant
- supprimer un logement
- gérer l’inscription et la connexion d’un utilisateur

Le projet est conçu comme une interface cliente pour un backend REST, via des appels `fetch` vers des routes `/api`.

## Technologies utilisées

- Svelte 5
- Vite
- Tailwind CSS
- PostCSS
- `svelte-spa-router` pour les routes client

## Structure du projet

```
src/
  App.svelte           # structure globale, header, footer, routes
  main.js              # point d'entrée de l'application
  app.css              # styles globaux
  pages/
    Liste.svelte       # page d'accueil et de recherche des logements
    Detail.svelte      # page de détail et réservation d'un logement
    AjouterLogement.svelte  # page de création de logement
    ModifierLogement.svelte # page d'édition de logement
    Login.svelte       # page de connexion
    Register.svelte    # page d'inscription
    NotFound.svelte    # page 404
  components/
    LogementCard.svelte # carte affichant un logement dans la liste
```

## Routes et pages

- `/` : liste des logements
- `#/logements/add` : formulaire d'ajout d'un logement
- `#/logements/:id` : page de détail d'un logement
- `#/logements/edit/:id` : formulaire de modification d'un logement
- `#/connexion` : page de connexion
- `#/inscription` : page d'inscription

## Fonctionnalités principales

### Liste des logements

- récupération des logements depuis `/api/logements`
- affichage en grille responsive
- recherche client par `ville` ou `nom`
- suppression d'un logement via `DELETE /api/logements/:id`

### Détail du logement

- récupération du logement par identifiant
- affichage du titre, de la ville, du prix, de la description et de l'image
- réservation via un modal
- envoi d'une requête `POST /api/reservations`
- bouton permettant de modifier le logement

### Ajout et modification

- formulaire de création d'un logement
- formulaire de modification pré-rempli avec les données du logement
- envoi de données JSON vers le backend
- `POST /api/logements` pour créer
- `PUT /api/logements/:id` pour mettre à jour

## API attendue

Le frontend consomme les routes suivantes :

- `GET /api/logements`
- `POST /api/logements`
- `GET /api/logements/:id`
- `PUT /api/logements/:id`
- `DELETE /api/logements/:id`
- `POST /api/auth/login`
- `POST /api/users`
- `POST /api/reservations`

## Instructions d'installation

1. Installer les dépendances :

```bash
npm install
```

2. Lancer le serveur de développement :

```bash
npm run dev
```

3. Ouvrir le navigateur sur l’URL indiquée par Vite.

## Commandes utiles

- `npm run dev` : lance le serveur de développement
- `npm run build` : construit l'application pour la production
- `npm run preview` : prévisualise le build de production

## Points d'attention

- la navigation utilise `svelte-spa-router`
- la logique métier est gérée via des composants Svelte et `fetch`
- le stylying est assuré par Tailwind CSS
- l'application suppose la présence d'un backend REST pour fonctionner correctement

## Remarques

Ce projet est une application frontend complète pour la gestion de locations de logements. Il met en œuvre un cycle classique CRUD (Create, Read, Update, Delete) ainsi qu'un système de réservation et d'authentification.
