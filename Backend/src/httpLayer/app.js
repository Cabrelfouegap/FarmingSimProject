const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('../dataAccess/dataAccess'); // Connexion à MongoDB
const initializeDB = require('../init/dbInitialization');
const fieldRoutes = require('./routes/fields');
const machineRoutes = require('./routes/machines');
const storageRoutes = require('./routes/storage');
const factoryRoutes = require('./routes/factories');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Base de données
initializeDB();

// Routes
app.use('/api/fields', fieldRoutes);
app.use('/api/machines', machineRoutes);
app.use('/api/storage', storageRoutes);
app.use('/api/factories', factoryRoutes);

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;