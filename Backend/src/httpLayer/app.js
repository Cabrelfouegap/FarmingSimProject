const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Import des routes
const fieldRoutes = require('./routes/fields');
const machineRoutes = require('./routes/machines');
const factoryRoutes = require('./routes/factories');
const storageRoutes = require('./routes/storage');
const systemRoutes = require('./routes/system');
const animalFarmRoutes = require('./routes/animalFarms');
const greenhouseRoutes = require('./routes/greenhouses');
const waterRoutes = require('./routes/water');
const warehouseRoutes = require('./routes/warehouses');
const fertilizerRoutes = require('./routes/fertilizers');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/fields', fieldRoutes);
app.use('/api/machines', machineRoutes);
app.use('/api/factories', factoryRoutes);
app.use('/api/storage', storageRoutes);
app.use('/api/system', systemRoutes);
app.use('/api/animalFarms', animalFarmRoutes);
app.use('/api/greenhouses', greenhouseRoutes);
app.use('/api/water', waterRoutes);
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/fertilizers', fertilizerRoutes);

// Route racine
app.get('/', (req, res) => {
  res.json({
    message: 'Farming Simulator API',
    version: '1.0.0',
    endpoints: {
      fields: '/api/fields',
      machines: '/api/machines',
      factories: '/api/factories',
      storage: '/api/storage',
      system: '/api/system'
    }
  });
});

// Gestion d'erreurs globale
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

// Route 404
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl
  });
});

module.exports = app;