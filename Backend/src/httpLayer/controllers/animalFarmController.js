const animalFarmService = require('../../businessLogic/animalFarmService');

exports.getAllAnimalFarms = async (req, res) => {
  try {
    const farms = await animalFarmService.getAllAnimalFarms();
    res.json(farms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAnimalFarmById = async (req, res) => {
  try {
    const farm = await animalFarmService.getAnimalFarmById(req.params.id);
    if (!farm) return res.status(404).json({ error: 'Not found' });
    res.json(farm);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createAnimalFarm = async (req, res) => {
  try {
    const farm = await animalFarmService.createAnimalFarm(req.body);
    res.status(201).json(farm);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateAnimalFarm = async (req, res) => {
  try {
    const farm = await animalFarmService.updateAnimalFarm(req.params.id, req.body);
    if (!farm) return res.status(404).json({ error: 'Not found' });
    res.json(farm);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteAnimalFarm = async (req, res) => {
  try {
    const farm = await animalFarmService.deleteAnimalFarm(req.params.id);
    if (!farm) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 