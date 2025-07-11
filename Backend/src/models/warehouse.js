const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
  capacity: { type: Number, default: 50000 },
  used: { type: Number, default: 0 },
  products: [{ type: String }]
});

module.exports = mongoose.model('Warehouse', warehouseSchema); 