const express = require('express');
const router = express.Router();
const greenhouseController = require('../controllers/greenhouseController');

router.get('/', greenhouseController.getAllGreenhouses);
router.get('/:id', greenhouseController.getGreenhouseById);
router.post('/', greenhouseController.createGreenhouse);
router.put('/:id', greenhouseController.updateGreenhouse);
router.delete('/:id', greenhouseController.deleteGreenhouse);

module.exports = router; 