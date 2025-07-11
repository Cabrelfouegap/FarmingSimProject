# 🌾 Farming Simulator 

Un simulateur de ferme complet avec architecture N-tier.

## 📋 Fonctionnalités

### 🌱 Cultures (18 types)
- **Cultures de base** (1000 L/ha) : blé, orge, avoine, canola, soja
- **Cultures spécialisées** : raisin, olive, pomme de terre, betterave, coton, maïs, tournesol, canne à sucre, peuplier, légumes, épinard, pois, haricots verts

### 🚜 Machines (32 machines)
- **Machines communes** : 5 tracteurs, 3 remorques, 2 moissonneuses, 2 charrues, 2 fertiliseurs, 2 planteuses
- **Machines spécialisées** : moissonneuses spécialisées (raisin, olive, pomme de terre, etc.) et planteuses spécialisées
- **Remorque semi** : pour le coton

### 🏭 Usines (11 types)
- **Huilerie** : tournesol/olive/canola/riz → huile (×2)
- **Scierie** : peuplier → planches (×2)
- **Usine de wagons** : planches → wagons (×4)
- **Usine de jouets** : planches → jouets (×3)
- **Moulin à grains** : blé/orge/sorgho → farine (×2)
- **Raffinerie de sucre** : betterave/canne à sucre → sucre (×2)
- **Filature** : coton → tissu (×2)
- **Atelier de couture** : tissu → vêtements (×2)
- **Boulangerie** : sucre + farine → gâteau (×6)
- **Usine de chips** : pomme de terre + huile → chips (×6)
- **Cave à vin** : raisin → vin (×2)

### 🐄 Nouvelles entités (extension)
- **Fermes animales** : gestion des animaux (vaches, moutons, poules)
- **Serres** : production sous abri (tomates, fraises, etc.)
- **Réservoirs d'eau** : gestion de l'irrigation
- **Entrepôts** : stockage avancé
- **Fertilisants** : gestion des stocks d'engrais

### ⏱️ Timing selon l'énoncé
- **Actions** : 30 secondes (labour, semis, fertilisation, récolte)
- **Maturation** : 2 minutes après semis
- **Fertilisation** : +50% de rendement

### 💰 Économie
- **Stockage** : 100 000 L maximum
- **Valeur** : 1 L = 1 or
- **Revenus** : suivi automatique des gains

## 🚀 Installation

### Prérequis
- Node.js (version 16+)
- MongoDB (local ou Atlas)
- npm ou yarn

### Configuration
1. **Cloner le projet**
   ```bash
   git clone <repository-url>
   cd FarmingSimProject/Backend
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configuration de l'environnement**
   Créer un fichier `.env` :
   ```env
   MONGODB_URI=
   PORT=5000
   ```

4. **Démarrer le serveur**
   ```bash
   # Mode développement
   npm run dev
   
   # Mode production
   npm start
   ```

## 📡 API Endpoints

### 🌾 Champs (`/api/fields`)
- `GET /` - Liste tous les champs
- `GET /:id` - Détails d'un champ
- `POST /:id/cultivate` - Cultiver un champ
- `POST /:id/harvest` - Récolter un champ
- `POST /:id/fertilize` - Fertiliser un champ

### 🚜 Machines (`/api/machines`)
- `GET /` - Liste toutes les machines
- `GET /:id` - Détails d'une machine
- `GET /type/:type` - Machines par type
- `POST /:id/acquire` - Acquérir une machine
- `POST /:id/release` - Libérer une machine

### 🏭 Usines (`/api/factories`)
- `GET /` - Liste toutes les usines
- `GET /:id` - Détails d'une usine
- `GET /type/:type` - Usines par type
- `POST /:id/start` - Démarrer la production
- `POST /:id/stop` - Arrêter la production
- `GET /:id/status` - Statut de production
- `POST /:id/process` - Traiter un lot

### 📦 Stockage (`/api/storage`)
- `GET /` - État du stockage
- `GET /stats` - Statistiques du stockage
- `POST /sell` - Vendre des items
- `POST /add` - Ajouter des items
- `POST /remove` - Retirer des items

### 🐄 Fermes animales (`/api/animalFarms`)
- `GET /` - Liste toutes les fermes animales
- `GET /:id` - Détails d'une ferme animale
- `POST /` - Créer une ferme animale
- `PUT /:id` - Modifier une ferme animale
- `DELETE /:id` - Supprimer une ferme animale

### 🌱 Serres (`/api/greenhouses`)
- `GET /` - Liste toutes les serres
- `GET /:id` - Détails d'une serre
- `POST /` - Créer une serre
- `PUT /:id` - Modifier une serre
- `DELETE /:id` - Supprimer une serre

### 💧 Réservoirs d'eau (`/api/water`)
- `GET /` - Liste tous les réservoirs
- `GET /:id` - Détails d'un réservoir
- `POST /` - Créer un réservoir
- `PUT /:id` - Modifier un réservoir
- `DELETE /:id` - Supprimer un réservoir

### 🏬 Entrepôts (`/api/warehouses`)
- `GET /` - Liste tous les entrepôts
- `GET /:id` - Détails d'un entrepôt
- `POST /` - Créer un entrepôt
- `PUT /:id` - Modifier un entrepôt
- `DELETE /:id` - Supprimer un entrepôt

### 🧪 Fertilisants (`/api/fertilizers`)
- `GET /` - Liste tous les fertilisants
- `GET /:id` - Détails d'un fertilisant
- `POST /` - Créer un fertilisant
- `PUT /:id` - Modifier un fertilisant
- `DELETE /:id` - Supprimer un fertilisant

### ⚙️ Système (`/api/system`)
- `GET /status` - Statut du système
- `POST /reset` - Réinitialiser la base de données

## 🏗️ Architecture N-Tier

```
FarmingSimProject/
├── Backend/
│   ├── src/
│   │   ├── httpLayer/          # Couche présentation
│   │   │   ├── app.js         # Configuration Express
│   │   │   ├── controllers/   # Contrôleurs REST
│   │   │   └── routes/        # Définition des routes
│   │   ├── businessLogic/     # Couche métier
│   │   │   ├── fieldService.js
│   │   │   ├── machineService.js
│   │   │   ├── factoryService.js
│   │   │   ├── storageService.js
│   │   │   ├── animalFarmService.js
│   │   │   ├── greenhouseService.js
│   │   │   ├── waterService.js
│   │   │   ├── warehouseService.js
│   │   │   ├── fertilizerService.js
│   │   │   └── eventManager.js
│   │   ├── dataAccess/        # Couche données
│   │   │   ├── dataAccess.js
│   │   │   ├── fieldRepository.js
│   │   │   ├── machineRepository.js
│   │   │   ├── factoryRepository.js
│   │   │   ├── storageRepository.js
│   │   │   ├── animalFarmRepository.js
│   │   │   ├── greenhouseRepository.js
│   │   │   ├── waterReservoirRepository.js
│   │   │   ├── warehouseRepository.js
│   │   │   └── fertilizerRepository.js
│   │   ├── models/           # Modèles de données
│   │   │   ├── field.js
│   │   │   ├── machine.js
│   │   │   ├── factory.js
│   │   │   ├── storage.js
│   │   │   ├── animalFarm.js
│   │   │   ├── greenhouse.js
│   │   │   ├── waterReservoir.js
│   │   │   ├── warehouse.js
│   │   │   ├── fertilizer.js
│   │   │   └── animal.js
│   │   ├── config/           # Configuration
│   │   │   ├── cropConfig.js
│   │   │   └── factoryConfig.js
│   │   └── init/             # Initialisation
│   │       └── dbInitialization.js
│   ├── server.js             # Point d'entrée
│   └── package.json
├── Frontend/
└── README.md
```

## 🧪 Tests avec Postman ou PowerShell

### Exemples de requêtes CRUD (toutes entités)

#### Créer
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/warehouses" -Method Post -ContentType "application/json" -Body '{"capacity":12345,"used":0,"products":[]}'
```
#### Modifier
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/warehouses/<ID>" -Method Put -ContentType "application/json" -Body '{"used":9999}'
```
#### Supprimer
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/warehouses/<ID>" -Method Delete
```

## 🛠️ Initialisation automatique des données

À chaque démarrage, la base est initialisée avec :
- 99 champs
- 32 machines
- 1 stockage principal
- 11 usines
- 2 fermes animales (vaches, moutons)
- 2 serres (ex : tomates, fraises)
- 2 réservoirs d'eau
- 2 entrepôts
- 2 fertilisants

## 📝 Extension & migration

- **Architecture extensible** : chaque nouvelle entité suit le schéma N-tier (modèle, repository, service, controller, route)
- **Migration automatique** : l'initialisation de la base prend en compte toutes les entités, anciennes et nouvelles
- **Endpoints REST** : tous les endpoints CRUD sont disponibles pour chaque entité

## 📝 Notes techniques

- **Base de données** : MongoDB avec Mongoose
- **API** : REST avec Express.js
- **Architecture** : N-tier avec séparation des responsabilités
- **Validation** : Validation des données côté serveur
- **Gestion d'erreurs** : Middleware global de gestion d'erreurs
- **Performance** : Index MongoDB pour optimiser les requêtes

## 🎯 Conformité avec l'énoncé

✅ **18 cultures** avec rendements spécifiques  
✅ **32 machines** (communes + spécialisées)  
✅ **11 usines** avec multiplicateurs corrects  
✅ **Timing** : 30s actions, 2min maturation  
✅ **Fertilisation** : +50% de rendement  
✅ **Stockage** : 100 000 L maximum  
✅ **Économie** : 1 L = 1 or  
✅ **Architecture N-tier** complète  
✅ **API REST** complète (y compris extensions)  
✅ **Gestion d'erreurs** robuste  

---

**Développé avec ❤️ pour l'architecture N-tier et les clusters de bases de données**

