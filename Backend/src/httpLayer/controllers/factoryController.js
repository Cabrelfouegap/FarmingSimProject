const FactoryService = require('../../businessLogic/factoryService');
const FactoryRepository = require('../../dataAccess/factoryRepository');
const StorageService = require('../../businessLogic/storageService');

class FactoryController {
  constructor() {
    this.factoryService = new FactoryService(
      new FactoryRepository(),
      new StorageService()
    );
  }

  async getAllFactories(req, res) {
    try {
      const factories = await this.factoryService.getAllFactories();
      res.json(factories);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getFactoryById(req, res) {
    try {
      const factory = await this.factoryService.getFactoryById(req.params.id);
      if (!factory) {
        return res.status(404).json({ error: 'Factory not found' });
      }
      res.json(factory);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getFactoriesByType(req, res) {
    try {
      const factories = await this.factoryService.getFactoriesByType(req.params.type);
      res.json(factories);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async startProduction(req, res) {
    try {
      const result = await this.factoryService.startProduction(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async stopProduction(req, res) {
    try {
      const result = await this.factoryService.stopProduction(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async processBatch(req, res) {
    try {
      const { quantity } = req.body;
      const result = await this.factoryService.processBatch(req.params.id, quantity);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getFactoryStats(req, res) {
    try {
      const stats = await this.factoryService.getFactoryStats(req.params.id);
      res.json(stats);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getProductionStatus(req, res) {
    try {
      // À adapter selon ta logique métier réelle
      const status = await this.factoryService.getProductionStatus(req.params.id);
      res.json(status);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async addInputItem(req, res) {
    try {
      const { item, quantity } = req.body;
      const result = await this.factoryService.addInputItem(req.params.id, item, quantity);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async removeOutputItem(req, res) {
    try {
      const { item, quantity } = req.body;
      const result = await this.factoryService.removeOutputItem(req.params.id, item, quantity);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new FactoryController();