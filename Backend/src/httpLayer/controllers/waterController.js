const waterService = require('../../businessLogic/waterService');

exports.getAllWaterReservoirs = async (req, res) => {
  try {
    const reservoirs = await waterService.getAllWaterReservoirs();
    res.json(reservoirs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getWaterReservoirById = async (req, res) => {
  try {
    const reservoir = await waterService.getWaterReservoirById(req.params.id);
    if (!reservoir) return res.status(404).json({ error: 'Not found' });
    res.json(reservoir);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createWaterReservoir = async (req, res) => {
  try {
    const reservoir = await waterService.createWaterReservoir(req.body);
    res.status(201).json(reservoir);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateWaterReservoir = async (req, res) => {
  try {
    const reservoir = await waterService.updateWaterReservoir(req.params.id, req.body);
    if (!reservoir) return res.status(404).json({ error: 'Not found' });
    res.json(reservoir);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteWaterReservoir = async (req, res) => {
  try {
    const reservoir = await waterService.deleteWaterReservoir(req.params.id);
    if (!reservoir) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 