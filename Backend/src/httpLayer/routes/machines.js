const express = require('express');
const router = express.Router();
const machineController = require('../controllers/machineController'); 

// Routes de base
router.get('/', machineController.getAllMachines);
router.get('/:id', machineController.getMachine);
router.get('/type/:type', machineController.getMachinesByType);
router.get('/usage/status', machineController.getMachineUsage);
router.post('/:id/assign', machineController.assignMachine);
router.post('/:id/release', machineController.releaseMachine);

module.exports = router;