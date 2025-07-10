const express = require('express');
const router = express.Router();
const storageController = require('../controllers/storageController');

// Routes pour le stockage
router.get('/', storageController.getStorage);
router.get('/stats', storageController.getStorageStats);
router.post('/sell', storageController.sellItem);
router.post('/add', storageController.addItem);
router.post('/remove', storageController.removeItem);

module.exports = router;