const fertilizerService = require('../../businessLogic/fertilizerService');

exports.getAllFertilizers = async (req, res) => {
  try {
    const fertilizers = await fertilizerService.getAllFertilizers();
    res.json(fertilizers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFertilizerById = async (req, res) => {
  try {
    const fertilizer = await fertilizerService.getFertilizerById(req.params.id);
    if (!fertilizer) return res.status(404).json({ error: 'Not found' });
    res.json(fertilizer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createFertilizer = async (req, res) => {
  try {
    const fertilizer = await fertilizerService.createFertilizer(req.body);
    res.status(201).json(fertilizer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateFertilizer = async (req, res) => {
  try {
    const fertilizer = await fertilizerService.updateFertilizer(req.params.id, req.body);
    if (!fertilizer) return res.status(404).json({ error: 'Not found' });
    res.json(fertilizer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteFertilizer = async (req, res) => {
  try {
    const fertilizer = await fertilizerService.deleteFertilizer(req.params.id);
    if (!fertilizer) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 