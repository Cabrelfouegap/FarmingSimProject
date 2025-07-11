const greenhouseService = require('../../businessLogic/greenhouseService');

exports.getAllGreenhouses = async (req, res) => {
  try {
    const greenhouses = await greenhouseService.getAllGreenhouses();
    res.json(greenhouses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getGreenhouseById = async (req, res) => {
  try {
    const greenhouse = await greenhouseService.getGreenhouseById(req.params.id);
    if (!greenhouse) return res.status(404).json({ error: 'Not found' });
    res.json(greenhouse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createGreenhouse = async (req, res) => {
  try {
    const greenhouse = await greenhouseService.createGreenhouse(req.body);
    res.status(201).json(greenhouse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateGreenhouse = async (req, res) => {
  try {
    const greenhouse = await greenhouseService.updateGreenhouse(req.params.id, req.body);
    if (!greenhouse) return res.status(404).json({ error: 'Not found' });
    res.json(greenhouse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteGreenhouse = async (req, res) => {
  try {
    const greenhouse = await greenhouseService.deleteGreenhouse(req.params.id);
    if (!greenhouse) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 