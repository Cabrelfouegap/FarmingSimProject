const Greenhouse = require('../models/greenhouse');

exports.getAll = () => Greenhouse.find();
exports.getById = (id) => Greenhouse.findById(id);
exports.create = (data) => Greenhouse.create(data);
exports.update = (id, data) => Greenhouse.findByIdAndUpdate(id, data, { new: true });
exports.delete = (id) => Greenhouse.findByIdAndDelete(id); 