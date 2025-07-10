const express = require('express');
const router = express.Router();
const factoryController = require('../controllers/factoryController');

// Gestion usines
router.get('/', factoryController.getAllFactories);
router.get('/:id', factoryController.getFactoryById);
router.get('/type/:type', factoryController.getFactoriesByType);

// Production
router.post('/:id/start', factoryController.startProduction);
router.post('/:id/stop', factoryController.stopProduction);
router.get('/:id/status', factoryController.getProductionStatus);

// Transformation
router.post('/:id/process', factoryController.processBatch);

module.exports = router;