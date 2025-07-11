const mongoose = require('mongoose');

const animalFarmSchema = new mongoose.Schema({
  parcel: { type: mongoose.Schema.Types.ObjectId, ref: 'Field' },
  animalType: { type: String, enum: ['cow', 'sheep', 'chicken'], required: true },
  animals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }],
  maxAnimals: { type: Number, default: 10 }
});

module.exports = mongoose.model('AnimalFarm', animalFarmSchema); 