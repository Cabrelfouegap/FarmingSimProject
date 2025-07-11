const mongoose = require('mongoose');

const waterReservoirSchema = new mongoose.Schema({
  capacity: { type: Number, default: 20000 },
  currentLevel: { type: Number, default: 20000 },
  lastRefill: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WaterReservoir', waterReservoirSchema); 