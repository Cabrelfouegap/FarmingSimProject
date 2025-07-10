const mongoose = require('mongoose');

const storageSchema = new mongoose.Schema({
  capacity: {
    type: Number,
    default: 100000, // 100 000 L selon l'énoncé
    required: true
  },
  used: {
    type: Number,
    default: 0,
    min: 0,
    max: 100000
  },
  items: [{
    itemType: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 0
    },
    value: {
      type: Number,
      default: 1 // 1 L = 1 or selon l'énoncé
    }
  }],
  totalRevenue: {
    type: Number,
    default: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Méthodes utilitaires
storageSchema.methods.getAvailableSpace = function() {
  return this.capacity - this.used;
};

storageSchema.methods.isFull = function() {
  return this.used >= this.capacity;
};

storageSchema.methods.canAdd = function(quantity) {
  return this.used + quantity <= this.capacity;
};

storageSchema.methods.getTotalValue = function() {
  return this.items.reduce((total, item) => {
    return total + (item.quantity * item.value);
  }, 0);
};

// Index pour optimiser les requêtes
storageSchema.index({ used: 1 });
storageSchema.index({ 'items.itemType': 1 });

module.exports = mongoose.model('Storage', storageSchema);