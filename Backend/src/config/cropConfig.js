const cropConfig = {
  // Cultures de base (1000 L/ha)
  blé: {
    yield: 1000,
    plantingMachines: ['tractor', 'planter'],
    harvestingMachines: ['harvester', 'trailer']
  },
  orge: {
    yield: 1000,
    plantingMachines: ['tractor', 'planter'],
    harvestingMachines: ['harvester', 'trailer']
  },
  avoine: {
    yield: 1000,
    plantingMachines: ['tractor', 'planter'],
    harvestingMachines: ['harvester', 'trailer']
  },
  canola: {
    yield: 1000,
    plantingMachines: ['tractor', 'planter'],
    harvestingMachines: ['harvester', 'trailer']
  },
  soja: {
    yield: 1000,
    plantingMachines: ['tractor', 'planter'],
    harvestingMachines: ['harvester', 'trailer']
  },

  // Cultures spécialisées
  raisin: {
    yield: 1500,
    plantingMachines: ['tractor', 'planter'],
    harvestingMachines: ['grape_harvester', 'trailer']
  },
  olive: {
    yield: 1500,
    plantingMachines: ['tractor', 'tree_planter'],
    harvestingMachines: ['olive_harvester', 'trailer']
  },
  pomme_de_terre: {
    yield: 5000,
    plantingMachines: ['tractor', 'potato_planter'],
    harvestingMachines: ['potato_harvester', 'trailer']
  },
  betterave: {
    yield: 3500,
    plantingMachines: ['tractor', 'planter'],
    harvestingMachines: ['beet_harvester', 'trailer']
  },
  coton: {
    yield: 750,
    plantingMachines: ['tractor', 'planter'],
    harvestingMachines: ['cotton_harvester', 'semi_trailer']
  },
  maïs: {
    yield: 3000,
    plantingMachines: ['tractor', 'planter'],
    harvestingMachines: ['harvester', 'trailer']
  },
  tournesol: {
    yield: 3000,
    plantingMachines: ['tractor', 'planter'],
    harvestingMachines: ['harvester', 'trailer']
  },
  canne_à_sucre: {
    yield: 5000,
    plantingMachines: ['tractor', 'sugarcane_planter'],
    harvestingMachines: ['sugarcane_harvester', 'trailer']
  },
  peuplier: {
    yield: 1500,
    plantingMachines: ['tractor', 'tree_planter'],
    harvestingMachines: ['tree_harvester', 'trailer']
  },
  légumes: {
    yield: 2500,
    plantingMachines: ['tractor', 'vegetable_planter'],
    harvestingMachines: ['vegetable_harvester', 'trailer']
  },
  épinard: {
    yield: 3000,
    plantingMachines: ['tractor', 'planter'],
    harvestingMachines: ['spinach_harvester', 'trailer']
  },
  pois: {
    yield: 7500,
    plantingMachines: ['tractor', 'planter'],
    harvestingMachines: ['pea_harvester', 'trailer']
  },
  haricots_verts: {
    yield: 7500,
    plantingMachines: ['tractor', 'planter'],
    harvestingMachines: ['bean_harvester', 'trailer']
  }
};

module.exports = cropConfig;