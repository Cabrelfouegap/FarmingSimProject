const factoryConfig = {
  oil_mill: {
    inputTypes: ['tournesol', 'olive', 'canola', 'riz'],
    outputType: 'huile',
    multiplier: 2,
    processingRate: 100 // L/seconde
  },
  sawmill: {
    inputTypes: ['peuplier'],
    outputType: 'planches',
    multiplier: 2,
    processingRate: 100
  },
  wagon_factory: {
    inputTypes: ['planches'],
    outputType: 'wagons',
    multiplier: 4,
    processingRate: 100
  },
  toy_factory: {
    inputTypes: ['planches'],
    outputType: 'jouets',
    multiplier: 3,
    processingRate: 100
  },
  grain_mill: {
    inputTypes: ['blé', 'orge', 'sorgho'],
    outputType: 'farine',
    multiplier: 2,
    processingRate: 100
  },
  sugar_refinery: {
    inputTypes: ['betterave', 'canne_à_sucre'],
    outputType: 'sucre',
    multiplier: 2,
    processingRate: 100
  },
  spinnery: {
    inputTypes: ['coton'],
    outputType: 'tissu',
    multiplier: 2,
    processingRate: 100
  },
  tailoring_shop: {
    inputTypes: ['tissu'],
    outputType: 'vêtements',
    multiplier: 2,
    processingRate: 100
  },
  bakery: {
    inputTypes: ['sucre', 'farine'],
    outputType: 'gâteau',
    multiplier: 6,
    processingRate: 100,
    requiresEqualQuantities: true
  },
  chip_factory: {
    inputTypes: ['pomme_de_terre', 'huile'],
    outputType: 'chips',
    multiplier: 6,
    processingRate: 100,
    requiresEqualQuantities: true
  },
  wine_cellar: {
    inputTypes: ['raisin'],
    outputType: 'vin',
    multiplier: 2,
    processingRate: 100
  }
};

module.exports = factoryConfig; 