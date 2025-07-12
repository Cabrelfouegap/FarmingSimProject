# 🌾 Farming Simulator Backend

Un simulateur de ferme complet, extensible, basé sur une architecture N-tier et un cluster MongoDB (réplica set), prêt pour la production et le développement collaboratif.

---

## 🚀 Démarrage rapide (Docker Compose)

### Prérequis
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Windows/Mac/Linux)
- [Git](https://git-scm.com/)

### Lancer tous les services (MongoDB cluster + backend + mongo-express)

1. Clone le projet :
   ```bash
   git clone <repository-url>
   cd FarmingSimProject
   ```
2. Lance tous les services :
   ```bash
   docker-compose up --build
   ```
3. Le backend est accessible sur : [http://localhost:5000](http://localhost:5000)
4. L’interface Mongo Express : [http://localhost:8081](http://localhost:8081)

---

## 🏗️ Architecture N-Tier

```
FarmingSimProject/
├── Backend/
│   ├── src/
│   │   ├── httpLayer/        # Présentation (Express, routes, contrôleurs)
│   │   ├── businessLogic/    # Métier (services)
│   │   ├── dataAccess/       # Accès données (repositories)
│   │   ├── models/           # Modèles Mongoose
│   │   ├── config/           # Configurations
│   │   └── init/             # Initialisation de la base
│   ├── Dockerfile            # Image backend
│   └── package.json
├── docker-compose.yaml       # Orchestration cluster + backend
└── ...
```

---

## ⚡ Fonctionnalités principales
- 18 cultures, 32 machines, 11 usines
- Fermes animales, serres, réservoirs d’eau, entrepôts, fertilisants
- Simulation temps réel (timing, maturation, fertilisation)
- Stockage, économie, gestion des revenus
- Initialisation automatique de la base (données de démo)
- API RESTful complète (CRUD sur toutes les entités)
- Cluster MongoDB (réplica set, haute disponibilité)
- Prêt pour transactions MongoDB

---

## 📡 Endpoints API principaux

Tous les endpoints sont préfixés par `/api`.

- **Champs** : `GET /api/fields`, `GET /api/fields/state/:state`, `POST /api/fields/batch/assign`
- **Machines** : `GET /api/machines`
- **Usines** : `GET /api/factories`
- **Stockage** : `GET /api/storage`
- **Fermes animales** : `GET /api/animalFarms`
- **Serres** : `GET /api/greenhouses`
- **Réservoirs d’eau** : `GET /api/water`
- **Entrepôts** : `GET /api/warehouses`
- **Fertilisants** : `GET /api/fertilizers`
- **Système** : `GET /api/system/status`, `POST /api/system/start`, `GET /api/system/stats/production`, `GET /api/system/time/current`

> Pour les routes POST/PUT/DELETE, voir le code source ou demander un exemple précis.

---

## 🧪 Tester l’API avec Postman

1. Ouvre Postman
2. Crée une nouvelle collection « FarmingSim API »
3. Ajoute les requêtes suivantes :
   - `GET http://localhost:5000/api/fields`
   - `GET http://localhost:5000/api/machines`
   - `GET http://localhost:5000/api/factories`
   - `GET http://localhost:5000/api/animalFarms`
   - `GET http://localhost:5000/api/greenhouses`
   - `GET http://localhost:5000/api/water`
   - `GET http://localhost:5000/api/warehouses`
   - `GET http://localhost:5000/api/fertilizers`
   - `GET http://localhost:5000/api/system/status`
   - `POST http://localhost:5000/api/system/start`
   - etc.
4. Clique sur « Send » pour chaque requête et observe la réponse JSON.

---

## 🐳 Détails Docker Compose

- **mongo1, mongo2, mongo3** : Cluster MongoDB (réplica set `rs0`)
- **backend** : API Node.js/Express (port 5000)
- **mongo-express** : Interface web MongoDB (port 8081)
- **Réseau dédié** : Communication interne sécurisée

---

## 🛠️ Initialisation automatique des données

À chaque démarrage, la base est initialisée avec :
- 99 champs
- 32 machines
- 1 stockage principal
- 11 usines
- 2 fermes animales
- 2 serres
- 2 réservoirs d’eau
- 2 entrepôts
- 2 fertilisants

---

## 📝 Notes techniques
- **Base de données** : MongoDB cluster (réplica set, transactions prêtes)
- **API** : REST avec Express.js
- **Validation** : Mongoose + middleware Express
- **Gestion d’erreurs** : Middleware global
- **Performance** : Index MongoDB, requêtes optimisées
- **Extensible** : Ajout facile de nouvelles entités (modèle, repo, service, contrôleur, route)

---

## 🎯 Conformité avec l’énoncé

- 18 cultures, 32 machines, 11 usines
- Timing, maturation, fertilisation, stockage, économie
- Architecture N-tier complète
- API REST complète (y compris extensions)
- Gestion d’erreurs robuste
- Cluster MongoDB prêt pour la production

---

**Développé avec ❤️ pour l’architecture N-tier, la simulation et la haute disponibilité**

