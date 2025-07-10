const StorageService = require('../../businessLogic/storageService');
const StorageRepository = require('../../dataAccess/storageRepository');
const EventManager = require('../../businessLogic/eventManager');

// Initialisation des dépendances
const storageRepository = new StorageRepository();
const eventManager = new EventManager();
const storageService = new StorageService(storageRepository, eventManager);

module.exports = {
  async getStorage(req, res) {
    try {
      const storage = await storageService.getStock();
      res.json(storage);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async sellItem(req, res) {
    try {
      const { itemType, quantity } = req.body;
      if (!itemType || !quantity) {
        return res.status(400).json({ error: 'itemType and quantity are required' });
      }

      const result = await storageService.sellItem(itemType, quantity);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async addItem(req, res) {
    try {
      const { itemType, quantity } = req.body;
      if (!itemType || !quantity) {
        return res.status(400).json({ error: 'itemType and quantity are required' });
      }

      const result = await storageService.addItem(itemType, quantity);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async removeItem(req, res) {
    try {
      const { itemType, quantity } = req.body;
      if (!itemType || !quantity) {
        return res.status(400).json({ error: 'itemType and quantity are required' });
      }

      const result = await storageService.removeItem(itemType, quantity);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async getStorageStats(req, res) {
    try {
      const storage = await storageService.getStock();
      const stats = {
        capacity: storage.capacity,
        used: storage.used,
        remaining: storage.remaining,
        totalRevenue: storage.totalRevenue,
        isFull: storage.isFull,
        itemCount: storage.items.length,
        totalItems: storage.items.reduce((sum, item) => sum + item.quantity, 0)
      };
      res.json(stats);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};