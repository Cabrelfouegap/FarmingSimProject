const mongoose = require('mongoose');

const fieldState = {
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
    enum: Object.values(fieldState),
    default: fieldState.HARVESTED
  },
  cropType: { 
    type: String,
    enum: [
      'blé', 'orge', 'avoine', 'canola', 'soja',
      'raisin', 'olive', 'pomme de terre', 'betterave', 'coton',
      'maïs', 'tournesol', 'canne à sucre', 'peuplier', 'légumes',
      'épinard', 'pois', 'haricots verts', null
    ],
    default: null
  },
  batch: { type: String, default: null },
  fertilized: { type: Boolean, default: false },
  readyAt: { type: Date, default: null },
  lastActionAt: { type: Date, default: null }
});

fieldSchema.virtual('isProcessing').get(function() {
  return this.lastActionAt && 
         Date.now() - this.lastActionAt < 30000; // 30 secondes pour chaque action
});

module.exports = {
  Field: mongoose.model('Field', fieldSchema),
  fieldState
};