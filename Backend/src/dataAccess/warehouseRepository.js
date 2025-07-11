const Warehouse = require('../models/warehouse');

exports.getAll = () => Warehouse.find();
exports.getById = (id) => Warehouse.findById(id);
exports.create = (data) => Warehouse.create(data);
exports.update = (id, data) => Warehouse.findByIdAndUpdate(id, data, { new: true });
exports.delete = (id) => Warehouse.findByIdAndDelete(id); 