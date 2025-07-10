const { Field } = require('../models/field');
const { Machine, machineTypes } = require('../models/machine');
const Storage = require('../models/storage');
const Factory = require('../models/factory');
const factoryConfig = require('../config/factoryConfig');

const initializeDB = async () => {
  console.log('Initialisation de la base de données...');

  // 1. Champs (1-99)
  const fields = Array.from({ length: 99 }, (_, i) => ({
    fieldId: i + 1,
    state: 'récolté'
  }));
  await Field.deleteMany({});
  await Field.insertMany(fields);
  console.log('✅ 99 champs créés');

  // 2. Machines selon l'énoncé
  const machines = [
    // Machines communes
    ...Array(5).fill().map((_, i) => ({ machineId: i+1, type: machineTypes.TRACTOR, currentField: null })),
    ...Array(3).fill().map((_, i) => ({ machineId: i+6, type: machineTypes.STANDARD_TRAILER, currentField: null })),
    ...Array(2).fill().map((_, i) => ({ machineId: i+9, type: machineTypes.HARVESTER, currentField: null })),
    ...Array(2).fill().map((_, i) => ({ machineId: i+11, type: machineTypes.PLOW, currentField: null })),
    ...Array(2).fill().map((_, i) => ({ machineId: i+13, type: machineTypes.FERTILIZER, currentField: null })),
    ...Array(2).fill().map((_, i) => ({ machineId: i+15, type: machineTypes.PLANTER, currentField: null })),

    // Machines spécialisées - Moissonneuses (1 de chaque)
    { machineId: 17, type: machineTypes.GRAPE_HARVESTER, currentField: null },
    { machineId: 18, type: machineTypes.OLIVE_HARVESTER, currentField: null },
    { machineId: 19, type: machineTypes.POTATO_HARVESTER, currentField: null },
    { machineId: 20, type: machineTypes.BEET_HARVESTER, currentField: null },
    { machineId: 21, type: machineTypes.COTTON_HARVESTER, currentField: null },
    { machineId: 22, type: machineTypes.SUGARCANE_HARVESTER, currentField: null },
    { machineId: 23, type: machineTypes.TREE_HARVESTER, currentField: null },
    { machineId: 24, type: machineTypes.VEGETABLE_HARVESTER, currentField: null },
    { machineId: 25, type: machineTypes.SPINACH_HARVESTER, currentField: null },
    { machineId: 26, type: machineTypes.PEA_HARVESTER, currentField: null },
    { machineId: 27, type: machineTypes.BEAN_HARVESTER, currentField: null },

    // Machines spécialisées - Planteuses (1 de chaque)
    { machineId: 28, type: machineTypes.TREE_PLANTER, currentField: null },
    { machineId: 29, type: machineTypes.POTATO_PLANTER, currentField: null },
    { machineId: 30, type: machineTypes.SUGARCANE_PLANTER, currentField: null },
    { machineId: 31, type: machineTypes.VEGETABLE_PLANTER, currentField: null },

    // Remorque semi
    { machineId: 32, type: machineTypes.SEMI_TRAILER, currentField: null }
  ];
  await Machine.deleteMany({});
  await Machine.insertMany(machines);
  console.log('✅ 32 machines créées');

  // 3. Stockage
  await Storage.deleteMany({});
  await Storage.create({ 
    capacity: 100000,
    used: 0,
    items: [],
    totalRevenue: 0
  });
  console.log('✅ Stockage créé (100 000 L)');

  // 4. Usines selon l'énoncé
  const factories = Object.entries(factoryConfig).map(([type, config], index) => ({
    factoryId: index + 1,
    type: type,
    inputTypes: config.inputTypes,
    outputType: config.outputType,
    multiplier: config.multiplier,
    processingRate: config.processingRate,
    requiresEqualQuantities: config.requiresEqualQuantities || false,
    isActive: false,
    totalProcessed: 0,
    totalRevenue: 0
  }));

  await Factory.deleteMany({});
  await Factory.insertMany(factories);
  console.log('✅ 11 usines créées');

  console.log('🎉 Initialisation terminée avec succès !');
};

module.exports = initializeDB;