const mongoose = require('mongoose');

const fieldStates = {
  HARVESTED: 'récolté',
  PLOWED: 'labouré', 
  SOWED: 'semé',
  FERTILIZED: 'fertilisé',
  READY: 'prêt à récolter'
};

const fieldSchema = new mongoose.Schema({
  fieldId: {
    type: Number,
    required: true,
    unique: true,
    min: 1,
    max: 99
  },
  state: {
    type: String,
    required: true,
    enum: Object.values(fieldStates),
    default: fieldStates.HARVESTED
  },
  cropType: {
    type: String,
    default: null
  },
  fertilized: {
    type: Boolean,
    default: false
  },
  batch: {
    type: String,
    default: null
  },
  lastActionAt: {
    type: Date,
    default: null
  },
  plantedAt: {
    type: Date,
    default: null
  },
  readyForHarvestAt: {
    type: Date,
    default: null
  }
});

// Index pour optimiser les requêtes
fieldSchema.index({ fieldId: 1 });
fieldSchema.index({ state: 1 });
fieldSchema.index({ batch: 1 });

module.exports = {
  Field: mongoose.model('Field', fieldSchema),
  fieldStates
};