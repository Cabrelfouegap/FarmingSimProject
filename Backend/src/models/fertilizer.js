const mongoose = require('mongoose');

const fertilizerSchema = new mongoose.Schema({
  quantity: { type: Number, default: 0 }
});

module.exports = mongoose.model('Fertilizer', fertilizerSchema); 