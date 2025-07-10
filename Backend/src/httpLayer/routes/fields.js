// routes/fields.js
const express = require('express');
const router = express.Router();
const fieldController = require('../controllers/fieldController');

// Routes existantes
router.get('/', fieldController.getAllFields);
router.get('/:id', fieldController.getField);
router.post('/:id/cultivate', fieldController.cultivate);
router.post('/:id/harvest', fieldController.harvest);

// Nouvelles routes
router.get('/state/:state', fieldController.getFieldsByState);
router.post('/batch/assign', fieldController.assignBatch);

module.exports = router;