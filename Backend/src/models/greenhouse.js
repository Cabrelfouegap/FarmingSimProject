const mongoose = require('mongoose');

const greenhouseSchema = new mongoose.Schema({
  waterConsumption: { type: Number, default: 15 }, // L/s
  productionRate: { type: Number, default: 1500 }, // L/5min
  lastProduction: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Greenhouse', greenhouseSchema); 