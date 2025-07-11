const WaterReservoir = require('../models/waterReservoir');

exports.getAll = () => WaterReservoir.find();
exports.getById = (id) => WaterReservoir.findById(id);
exports.create = (data) => WaterReservoir.create(data);
exports.update = (id, data) => WaterReservoir.findByIdAndUpdate(id, data, { new: true });
exports.delete = (id) => WaterReservoir.findByIdAndDelete(id); 