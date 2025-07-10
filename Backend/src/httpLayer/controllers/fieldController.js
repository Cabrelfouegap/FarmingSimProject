const FieldService = require('../../businessLogic/fieldService');
const FieldRepository = require('../../dataAccess/fieldRepository');
const MachineService = require('../../businessLogic/machineService');
const MachineRepository = require('../../dataAccess/machineRepository');
const StorageService = require('../../businessLogic/storageService');
const StorageRepository = require('../../dataAccess/storageRepository');
const EventManager = require('../../businessLogic/eventManager');

// Initialisation des dépendances
const fieldRepository = new FieldRepository();
const machineRepository = new MachineRepository();
const storageRepository = new StorageRepository();
const eventManager = new EventManager();
const machineService = new MachineService(machineRepository, eventManager);
const storageService = new StorageService(storageRepository, eventManager);

const fieldService = new FieldService(fieldRepository, machineService, storageService, eventManager);

class FieldController {
  // Nouvelle méthode pour obtenir tous les champs
  async getAllFields(req, res) {
    try {
      const fields = await fieldRepository.getAll();
      res.json(fields);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getField(req, res) {
    try {
      const field = await fieldRepository.getById(parseInt(req.params.id));
      if (!field) {
        return res.status(404).json({ error: 'Field not found' });
      }
      res.json(field);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async cultivate(req, res) {
    try {
      const { action, cropType } = req.body;
      const fieldId = parseInt(req.params.id);
      
      // Validation basique
      if (!action || (action === 'semé' && !cropType)) {
        return res.status(400).json({ error: 'Invalid request data' });
      }

      const field = await fieldService.cultivate(fieldId, action, cropType);
      res.json(field);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async harvest(req, res) {
    try {
      const fieldId = parseInt(req.params.id);
      const field = await fieldService.harvest(fieldId);
      res.json(field);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Nouvelle méthode pour les champs par état
  async getFieldsByState(req, res) {
    try {
      const fields = await fieldRepository.getByState(req.params.state);
      res.json(fields);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Nouvelle méthode pour les lots
  async assignBatch(req, res) {
    try {
      const { fieldIds, batch } = req.body;
      await fieldRepository.assignBatch(fieldIds, batch);
      res.json({ message: 'Batch assigned successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new FieldController();