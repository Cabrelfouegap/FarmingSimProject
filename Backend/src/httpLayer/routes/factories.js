const express = require('express');
const router = express.Router();
const factoryController = require('../controllers/factoryController');

// Routes de base
router.get('/', factoryController.getAllFactories);
router.get('/:id', factoryController.getFactoryById);
router.get('/type/:type', factoryController.getFactoriesByType);

// Gestion de la production
router.post('/:id/start', factoryController.startProduction);
router.post('/:id/stop', factoryController.stopProduction);
router.get('/:id/status', factoryController.getProductionStatus);
router.post('/:id/process', factoryController.processBatch);

// Gestion du stock
router.post('/:id/input/add', factoryController.addInputItem);
router.post('/:id/output/remove', factoryController.removeOutputItem);

// Statistiques
router.get('/:id/stats', factoryController.getFactoryStats);

module.exports = router;