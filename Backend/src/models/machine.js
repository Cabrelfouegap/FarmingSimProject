const mongoose = require('mongoose');

const machineTypes = {
  // Communes
  TRACTOR: 'tractor',
  STANDARD_TRAILER: 'standard_trailer',
  HARVESTER: 'harvester',
  PLOW: 'plow',
  FERTILIZER: 'fertilizer',
  PLANTER: 'planter',
  
  // Moissonneuses spécialisées
  GRAPE_HARVESTER: 'grape_harvester',
  OLIVE_HARVESTER: 'olive_harvester',
  POTATO_HARVESTER: 'potato_harvester',
  BEET_HARVESTER: 'beet_harvester',
  COTTON_HARVESTER: 'cotton_harvester',
  SUGARCANE_HARVESTER: 'sugarcane_harvester',
  TREE_HARVESTER: 'tree_harvester',
  SPINACH_HARVESTER: 'spinach_harvester',
  GREENBEAN_HARVESTER: 'greenbean_harvester',
  PEA_HARVESTER: 'pea_harvester',
  VEGETABLE_HARVESTER: 'vegetable_harvester',
  
  // Planteuses spéciales
  TREE_PLANTER: 'tree_planter',
  POTATO_PLANTER: 'potato_planter',
  SUGARCANE_PLANTER: 'sugarcane_planter',
  VEGETABLE_PLANTER: 'vegetable_planter',
  
  // Remorque spéciale
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
      validator: Number.isInteger,
      message: '{VALUE} must be an integer'
    }
  },
  taskEndTime: { 
    type: Date, 
    default: null 
  },
  maintenanceRequired: { 
    type: Boolean, 
    default: false 
  }
});

machineSchema.virtual('isAvailable').get(function() {
  return !this.inUse && !this.maintenanceRequired;
});

module.exports = {
  Machine: mongoose.model('Machine', machineSchema),
  machineTypes
};