const FactoryService = require('../../businessLogic/factoryService');
const FactoryRepository = require('../../dataAccess/factoryRepository');
const StorageRepository = require('../../dataAccess/storageRepository');

// Initialisation des dépendances
const factoryRepository = new FactoryRepository();
const storageRepository = new StorageRepository();
const factoryService = new FactoryService(factoryRepository, storageRepository);

module.exports = {
  async getAllFactories(req, res) {
    try {
      const factories = await factoryService.getAllFactories();
      res.json(factories);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getFactoryById(req, res) {
    try {
      const factory = await factoryService.getFactoryById(req.params.id);
      if (!factory) {
        return res.status(404).json({ error: 'Factory not found' });
      }
      res.json(factory);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getFactoriesByType(req, res) {
    try {
      const factories = await factoryService.getFactoriesByType(req.params.type);
      res.json(factories);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async startProduction(req, res) {
    try {
      const result = await factoryService.startProduction(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async stopProduction(req, res) {
    try {
      const result = await factoryService.stopProduction(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async processBatch(req, res) {
    try {
      const { quantity } = req.body;
      const result = await factoryService.processBatch(req.params.id, quantity);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async getFactoryStats(req, res) {
    try {
      const stats = await factoryService.getFactoryStats(req.params.id);
      res.json(stats);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getProductionStatus(req, res) {
    try {
      const status = await factoryService.getProductionStatus(req.params.id);
      res.json(status);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async addInputItem(req, res) {
    try {
      const { item, quantity } = req.body;
      const result = await factoryService.addInputItem(req.params.id, item, quantity);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async removeOutputItem(req, res) {
    try {
      const { item, quantity } = req.body;
      const result = await factoryService.removeOutputItem(req.params.id, item, quantity);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};