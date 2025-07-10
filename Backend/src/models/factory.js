const mongoose = require('mongoose');

const factorySchema = new mongoose.Schema({
  factoryId: { 
    type: Number, 
    required: true, 
    unique: true 
  },
  type: { 
    type: String, 
    required: true,
    enum: [
      'oil_mill', 'sawmill', 'wagon_factory', 'toy_factory', 'grain_mill',
      'sugar_refinery', 'spinnery', 'tailoring_shop', 'bakery', 'chip_factory',
      'wine_cellar'
    ]
  },
  isActive: { 
    type: Boolean, 
    default: false 
  },
  inputTypes: [{ 
    type: String 
  }],
  outputType: { 
    type: String, 
    required: true 
  },
  multiplier: { 
    type: Number, 
    required: true,
    min: 1 
  },
  processingRate: { // en L/seconde
    type: Number,
    default: 100
  },
  requiresEqualQuantities: {
    type: Boolean,
    default: false
  },
  lastProcessed: { 
    type: Date, 
    default: null 
  },
  totalProcessed: {
    type: Number,
    default: 0
  },
  totalRevenue: {
    type: Number,
    default: 0
  }
});

// Index pour optimiser les requêtes
factorySchema.index({ factoryId: 1 });
factorySchema.index({ type: 1 });
factorySchema.index({ isActive: 1 });

module.exports = mongoose.model('Factory', factorySchema);