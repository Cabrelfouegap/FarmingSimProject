const warehouseService = require('../../businessLogic/warehouseService');

exports.getAllWarehouses = async (req, res) => {
  try {
    const warehouses = await warehouseService.getAllWarehouses();
    res.json(warehouses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getWarehouseById = async (req, res) => {
  try {
    const warehouse = await warehouseService.getWarehouseById(req.params.id);
    if (!warehouse) return res.status(404).json({ error: 'Not found' });
    res.json(warehouse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createWarehouse = async (req, res) => {
  try {
    const warehouse = await warehouseService.createWarehouse(req.body);
    res.status(201).json(warehouse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateWarehouse = async (req, res) => {
  try {
    const warehouse = await warehouseService.updateWarehouse(req.params.id, req.body);
    if (!warehouse) return res.status(404).json({ error: 'Not found' });
    res.json(warehouse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteWarehouse = async (req, res) => {
  try {
    const warehouse = await warehouseService.deleteWarehouse(req.params.id);
    if (!warehouse) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 