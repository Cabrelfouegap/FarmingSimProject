const SimulationEngine = require('../../businessLogic/simulationEngine');
const Manager = require('../../businessLogic/manager');

const simulationEngine = new SimulationEngine();
const manager = new Manager();

module.exports = {
  async getSystemStatus(req, res) {
    try {
      const status = {
        isRunning: simulationEngine.isRunning || false,
        fieldsInProgress: await simulationEngine.getActiveFields?.() || [],
        storageUsage: await manager.storageService?.getUsage?.() || 0,
        timestamp: new Date().toISOString()
      };
      res.json(status);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async startSimulation(req, res) {
    try {
      await simulationEngine.startSimulation?.();
      res.json({ message: 'Simulation started' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async stopSimulation(req, res) {
    try {
      simulationEngine.stopSimulation?.();
      res.json({ message: 'Simulation stopped' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async setSimulationSpeed(req, res) {
    try {
      const { speed } = req.body;
      // Logique pour changer la vitesse (à implémenter)
      res.json({ message: `Simulation speed set to ${speed}` });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getProductionStats(req, res) {
    try {
      const stats = {
        totalFields: 99,
        activeFields: 0,
        totalMachines: 32,
        activeMachines: 0,
        totalFactories: 11,
        activeFactories: 0
      };
      res.json(stats);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getRevenue(req, res) {
    try {
      const revenue = await manager.calculateRevenue?.() || 0;
      res.json({ revenue });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getEquipmentStats(req, res) {
    try {
      const stats = {
        tractors: 5,
        harvesters: 2,
        trailers: 3,
        specializedMachines: 15
      };
      res.json(stats);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async advanceTime(req, res) {
    try {
      const { hours } = req.body;
      // Logique pour avancer le temps (à implémenter)
      res.json({ message: `Time advanced by ${hours} hours` });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getCurrentTime(req, res) {
    try {
      res.json({ 
        currentTime: new Date().toISOString(),
        timestamp: Date.now()
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};