const express = require('express');
const router = express.Router();
const waterController = require('../controllers/waterController');

router.get('/', waterController.getAllWaterReservoirs);
router.get('/:id', waterController.getWaterReservoirById);
router.post('/', waterController.createWaterReservoir);
router.put('/:id', waterController.updateWaterReservoir);
router.delete('/:id', waterController.deleteWaterReservoir);

module.exports = router; 