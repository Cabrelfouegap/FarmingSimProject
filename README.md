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
   PORT=uri_Atlas/farmingSim
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

### ⚙️ Système (`/api/system`)
- `GET /status` - Statut du système
- `POST /reset` - Réinitialiser la base de données

## 🏗️ Architecture N-Tier

```
Backend/
├── src/
│   ├── httpLayer/          # Couche présentation
│   │   ├── app.js         # Configuration Express
│   │   ├── controllers/   # Contrôleurs REST
│   │   └── routes/        # Définition des routes
│   ├── businessLogic/     # Couche métier
│   │   ├── fieldService.js
│   │   ├── machineService.js
│   │   ├── factoryService.js
│   │   ├── storageService.js
│   │   └── eventManager.js
│   ├── dataAccess/        # Couche données
│   │   ├── dataAccess.js
│   │   ├── fieldRepository.js
│   │   ├── machineRepository.js
│   │   ├── factoryRepository.js
│   │   └── storageRepository.js
│   ├── models/           # Modèles de données
│   │   ├── field.js
│   │   ├── machine.js
│   │   ├── factory.js
│   │   └── storage.js
│   ├── config/           # Configuration
│   │   ├── cropConfig.js
│   │   └── factoryConfig.js
│   └── init/             # Initialisation
│       └── dbInitialization.js
├── server.js             # Point d'entrée
└── package.json
```

## 🧪 Tests avec Postman

### Exemples de requêtes

1. **Cultiver un champ**
   ```http
   POST /api/fields/1/cultivate
   Content-Type: application/json
   
   {
     "action": "labouré",
     "cropType": "blé"
   }
   ```

2. **Démarrer une usine**
   ```http
   POST /api/factories/1/start
   ```

3. **Vendre des items**
   ```http
   POST /api/storage/sell
   Content-Type: application/json
   
   {
     "itemType": "blé",
     "quantity": 1000
   }
   ```

## 📊 Fonctionnalités avancées

### 🔄 Traitement automatique des usines
- Les usines traitent automatiquement les matières premières
- Pause automatique si le stockage est plein
- Suivi des revenus en temps réel

### 🌱 Système de fertilisation
- Fertilisation optionnelle après semis
- Bonus de +50% sur le rendement
- Gestion des états de champs

### ⏰ Timing réaliste
- Actions de 30 secondes
- Maturation de 2 minutes
- Gestion des machines en temps réel

### 💾 Gestion du stockage
- Capacité limitée à 100 000 L
- Vente automatique avec calcul des revenus
- Prévention des dépassements

## 🛠️ Développement

### Scripts disponibles
```bash
npm run dev      # Mode développement avec nodemon
npm start        # Mode production
npm run init-db  # Réinitialiser la base de données
```

### Variables d'environnement
- `MONGODB_URI` : URI de connexion MongoDB
- `PORT` : Port du serveur (défaut: 5000)

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
✅ **API REST** complète  
✅ **Gestion d'erreurs** robuste  

---

**Développé avec ❤️ pour l'architecture N-tier et les clusters de bases de données**

