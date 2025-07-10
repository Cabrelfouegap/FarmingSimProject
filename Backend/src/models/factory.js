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
  processingRate: { // en L/second
    type: Number,
    default: 100
  },
  lastProcessed: { 
    type: Date, 
    default: null 
  }
});

factorySchema.methods.canProcess = function(storage) {
  return this.inputTypes.every(input => 
    storage.items.some(item => 
      item.itemType === input && item.quantity >= this.processingRate
    )
  );
};

module.exports = mongoose.model('Factory', factorySchema);