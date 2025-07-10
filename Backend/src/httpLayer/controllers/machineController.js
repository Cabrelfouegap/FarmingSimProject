const MachineService = require('../../businessLogic/machineService');
const MachineRepository = require('../../dataAccess/machineRepository');
const EventManager = require('../../businessLogic/eventManager');

// Initialisation des dépendances
const machineRepository = new MachineRepository();
const eventManager = new EventManager();
const machineService = new MachineService(machineRepository, eventManager);

class MachineController {
    async getAllMachines(req, res) {
        try {
            const machines = await machineService.getAllMachines();
            res.json(machines);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getMachine(req, res) {
        try {
            const machine = await machineService.getById(req.params.id);
            if (!machine) {
                return res.status(404).json({ error: 'Machine not found' });
            }
            res.json(machine);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getMachinesByType(req, res) {
        try {
            const machines = await machineService.getMachinesByType(req.params.type);
            res.json(machines);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getMachineUsage(req, res) {
        try {
            const usage = await machineService.getMachineUsage();
            res.json(usage);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async assignMachine(req, res) {
        try {
            const { fieldId } = req.body;
            if (!fieldId) {
                return res.status(400).json({ error: 'fieldId is required' });
            }
            const result = await machineService.assignMachine(req.params.id, fieldId);
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async releaseMachine(req, res) {
        try {
            const result = await machineService.releaseMachine(req.params.id);
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}

// Exportez une instance de la classe
module.exports = new MachineController();