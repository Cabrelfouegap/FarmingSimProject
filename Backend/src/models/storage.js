const mongoose = require('mongoose');

const storageSchema = new mongoose.Schema({
  capacity: {
    type: Number,
    default: 100000, // 100,000 L
    min: 0
  },
  used: {
    type: Number,
    default: 0,
    min: 0
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
    valuePerUnit: {
      type: Number,
      default: 1 // 1 or/L par défaut
    }
  }]
});

storageSchema.methods.addItem = function(itemType, quantity, value = 1) {
  if (this.used + quantity > this.capacity) {
    throw new Error('Storage capacity exceeded');
  }

  const existingItem = this.items.find(item => item.itemType === itemType);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    this.items.push({ itemType, quantity, valuePerUnit: value });
  }

  this.used += quantity;
};

storageSchema.methods.removeItem = function(itemType, quantity) {
  const itemIndex = this.items.findIndex(item => item.itemType === itemType);
  if (itemIndex === -1 || this.items[itemIndex].quantity < quantity) {
    throw new Error('Not enough items in storage');
  }

  this.items[itemIndex].quantity -= quantity;
  this.used -= quantity;

  if (this.items[itemIndex].quantity === 0) {
    this.items.splice(itemIndex, 1);
  }
};

module.exports = mongoose.model('Storage', storageSchema);