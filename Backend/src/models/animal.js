const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  type: { type: String, enum: ['cow', 'sheep', 'chicken'], required: true },
  grassStock: { type: Number, default: 10 }, // L d'herbe
  status: { type: String, enum: ['alive', 'deficit', 'dead'], default: 'alive' }
});

module.exports = mongoose.model('Animal', animalSchema); 