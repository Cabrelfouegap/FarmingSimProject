const Fertilizer = require('../models/fertilizer');

exports.getAll = () => Fertilizer.find();
exports.getById = (id) => Fertilizer.findById(id);
exports.create = (data) => Fertilizer.create(data);
exports.update = (id, data) => Fertilizer.findByIdAndUpdate(id, data, { new: true });
exports.delete = (id) => Fertilizer.findByIdAndDelete(id); 