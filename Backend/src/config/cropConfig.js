const { machineTypes } = require('../models/machine');

module.exports = {
  // Rendements en L/hectare et machines requises
  'blé': { yield: 1000, requiredMachines: ['tractor', 'planter', 'harvester', 'standard_trailer'] },
  'raisin': { yield: 1500, requiredMachines: ['tractor', 'planter', 'grape_harvester', 'standard_trailer'] },
  'olive': { yield: 1500, requiredMachines: ['tractor', 'tree_planter', 'olive_harvester', 'standard_trailer'] },
  'pomme de terre': { yield: 5000, requiredMachines: ['tractor', 'potato_planter', 'potato_harvester', 'standard_trailer'] },
  'betterave': { yield: 3500, requiredMachines: ['tractor', 'planter', 'beet_harvester', 'standard_trailer'] },
  'coton': { yield: 750, requiredMachines: ['tractor', 'planter', 'cotton_harvester', 'semi_trailer'] },

  // Durées en millisecondes
  durations: {
    ACTION: 30000,    // 30s pour chaque action
    MATURATION: 120000 // 2min pour maturation
  },

  // Bonus
  FERTILIZATION_BONUS: 0.5 // +50% de rendement
};