const mongoose = require('mongoose');

const machineTypes = {
  // Machines communes
  TRACTOR: 'tractor',
  STANDARD_TRAILER: 'trailer',
  HARVESTER: 'harvester',
  PLOW: 'plow',
  FERTILIZER: 'fertilizer',
  PLANTER: 'planter',
  
  // Machines spécialisées - Moissonneuses
  GRAPE_HARVESTER: 'grape_harvester',
  OLIVE_HARVESTER: 'olive_harvester',
  POTATO_HARVESTER: 'potato_harvester',
  BEET_HARVESTER: 'beet_harvester',
  COTTON_HARVESTER: 'cotton_harvester',
  SUGARCANE_HARVESTER: 'sugarcane_harvester',
  TREE_HARVESTER: 'tree_harvester',
  VEGETABLE_HARVESTER: 'vegetable_harvester',
  SPINACH_HARVESTER: 'spinach_harvester',
  PEA_HARVESTER: 'pea_harvester',
  BEAN_HARVESTER: 'bean_harvester',
  
  // Machines spécialisées - Planteuses
  TREE_PLANTER: 'tree_planter',
  POTATO_PLANTER: 'potato_planter',
  SUGARCANE_PLANTER: 'sugarcane_planter',
  VEGETABLE_PLANTER: 'vegetable_planter',
  
  // Remorque semi
  SEMI_TRAILER: 'semi_trailer'
};

const machineSchema = new mongoose.Schema({
  machineId: {
    type: Number,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true,
    enum: Object.values(machineTypes)
  },
  inUse: {
    type: Boolean,
    default: false
  },
  currentField: {
    type: Number,
    default: null,
    validate: {
      validator: function(v) {
        return v === null || (Number.isInteger(v) && v >= 1 && v <= 99);
      },
      message: 'currentField must be null or an integer between 1 and 99'
    }
  },
  taskEndTime: {
    type: Date,
    default: null
  },
  lastMaintenance: {
    type: Date,
    default: Date.now
  }
});

// Index pour optimiser les requêtes
machineSchema.index({ machineId: 1 });
machineSchema.index({ type: 1 });
machineSchema.index({ inUse: 1 });

module.exports = {
  Machine: mongoose.model('Machine', machineSchema),
  machineTypes
};