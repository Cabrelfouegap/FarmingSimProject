const AnimalFarm = require('../models/animalFarm');

exports.getAll = () => AnimalFarm.find();
exports.getById = (id) => AnimalFarm.findById(id);
exports.create = (data) => AnimalFarm.create(data);
exports.update = (id, data) => AnimalFarm.findByIdAndUpdate(id, data, { new: true });
exports.delete = (id) => AnimalFarm.findByIdAndDelete(id); 