const SimulationEngine = require('../../businessLogic/simulationEngine');
const Manager = require('../../businessLogic/manager');

const simulationEngine = new SimulationEngine();
const manager = new Manager();

class SystemController {
  async getSystemStatus(req, res) {
    try {
      const status = {
        isRunning: simulationEngine.isRunning,
        fieldsInProgress: await simulationEngine.getActiveFields(),
        storageUsage: await manager.storageService.getUsage()
      };
      res.json(status);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async startSimulation(req, res) {
    try {
      await simulationEngine.startSimulation();
      res.json({ message: 'Simulation started' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async stopSimulation(req, res) {
    try {
      simulationEngine.stopSimulation();
      res.json({ message: 'Simulation stopped' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getRevenue(req, res) {
    try {
      const revenue = await manager.calculateRevenue();
      res.json({ revenue });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new SystemController();