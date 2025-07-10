const express = require('express');
const router = express.Router();
const systemController = require('../controllers/systemController');

// Contrôle simulation
router.get('/status', systemController.getSystemStatus);
router.post('/start', systemController.startSimulation);
router.post('/stop', systemController.stopSimulation);
router.post('/speed', systemController.setSimulationSpeed);

// Statistiques
router.get('/stats/production', systemController.getProductionStats);
router.get('/stats/revenue', systemController.getRevenue);
router.get('/stats/equipment', systemController.getEquipmentStats);

// Gestion temps
router.post('/time/advance', systemController.advanceTime);
router.get('/time/current', systemController.getCurrentTime);

module.exports = router;