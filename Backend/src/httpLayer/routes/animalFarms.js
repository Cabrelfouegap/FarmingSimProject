const express = require('express');
const router = express.Router();
const animalFarmController = require('../controllers/animalFarmController');

router.get('/', animalFarmController.getAllAnimalFarms);
router.get('/:id', animalFarmController.getAnimalFarmById);
router.post('/', animalFarmController.createAnimalFarm);
router.put('/:id', animalFarmController.updateAnimalFarm);
router.delete('/:id', animalFarmController.deleteAnimalFarm);

module.exports = router; 