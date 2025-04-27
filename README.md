# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

--
# Pokédex Starter - Jamelallal

Bienvenue dans le projet **Pokédex Starter - Jamelallal** ! 🌟

Ce projet est une application web full-stack permettant de :

- Créer, modifier et consulter des Pokémons
- Ressusciter des Pokémon supprimés dans un "Cimtrex Pokédex"
- Poster des messages amusants dans un mini réseau social interne nommé **Pokétalk**
- S'enregistrer et se connecter en toute sécurité

---

## 📚 Structure du projet

Le projet est divisé en deux dossiers principaux :

- `pokedex-api-jamelallal/` : le backend (API REST avec Node.js + Express + MongoDB)
- `pokedex-starter-jamelallal/` : le frontend (React.js + Vite)

---

## 🛠️ Instructions d'installation

### 1. Cloner le projet

```bash
git clone https://github.com/zkerkeb-class/pokedex-starter-Jamelallal.git
cd pokedex-starter-Jamelallal
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer l'environnement

Créer un fichier `.env` :

```env
VITE_API_URL=http://localhost:3000
```

*(Adaptez l'URL si votre API tourne ailleurs.)*

### 4. Lancer le projet

```bash
npm run dev
```

Le site sera accessible sur : [http://localhost:5173](http://localhost:5173)

---

## 📚 Fonctionnalités principales

### Frontend

- **Page d'accueil** :
  - Recherche de Pokémons
  - Filtrage par type
  - Pagination

- **Créer / Modifier / Supprimer un Pokémon** :
  - Formulaire complet pour créer ou éditer un Pokémon
  - Suppression d'un Pokémon avec déplacement dans le **Cimtrex Pokédex**

- **Cimtrex Pokédex** :
  - Choisir 3 Pokémon morts pour ressusciter un **nouveau Pokémon spectral**
  - Pokémon créés de manière **aléatoire** pour ajouter de la difficulté et du fun

- **Pokétalk** :
  - Poster des messages courts
  - Liker / Disliker des posts
  - Supprimer ses propres posts
  - Trier les posts par :
    - Date
    - Popularité
    - Nom du Pokémon
    - Auteur
  - Rechercher dans les posts
  - Pagination

- **Login / Register** :
  - Connexion sécurisée via JWT
  - Inscription sécurisée

---

## 📚 Documentation de l'API utilisée

L'API REST backend est documentée dans le projet :  
[**Lien vers l'API Pokédex - Jamelallal**](https://github.com/zkerkeb-class/pokedex-api-Jamelallal)

### Authentification

| Méthode | URL                  | Description                      |
|:-------:|:---------------------:|:--------------------------------:|
| POST    | /api/users/register   | Inscription d'un nouvel utilisateur |
| POST    | /api/users/login      | Connexion d'un utilisateur       |

### Pokémon

| Méthode | URL                   | Description                       |
|:-------:|:----------------------:|:---------------------------------:|
| GET     | /api/pokemons          | Liste de tous les Pokémons        |
| POST    | /api/pokemons          | Création d'un nouveau Pokémon     |
| PUT     | /api/pokemons/:id      | Modifier un Pokémon existant      |
| DELETE  | /api/pokemons/:id      | Supprimer un Pokémon existant     |

---

## 🎥 Vidéo de démonstration

▶️ [Voir la démo sur YouTube](https://youtube.com)





