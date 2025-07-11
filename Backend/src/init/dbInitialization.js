const { Field } = require('../models/field');
const { Machine, machineTypes } = require('../models/machine');
const Storage = require('../models/storage');
const Factory = require('../models/factory');
const factoryConfig = require('../config/factoryConfig');
const AnimalFarm = require('../models/animalFarm');
const Greenhouse = require('../models/greenhouse');
const WaterReservoir = require('../models/waterReservoir');
const Warehouse = require('../models/warehouse');
const Fertilizer = require('../models/fertilizer');

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

  // 5. AnimalFarms
  await AnimalFarm.deleteMany({});
  await AnimalFarm.insertMany([
    { animalType: 'cow', maxAnimals: 50, animals: [] },
    { animalType: 'sheep', maxAnimals: 40, animals: [] }
  ]);
  console.log('✅ Fermes animales créées');

  // 6. Greenhouses
  await Greenhouse.deleteMany({});
  await Greenhouse.insertMany([
    { name: 'Serre tomates', cropType: 'tomate', capacity: 1000, currentLevel: 500 },
    { name: 'Serre fraises', cropType: 'fraise', capacity: 800, currentLevel: 400 }
  ]);
  console.log('✅ Serres créées');

  // 7. WaterReservoirs
  await WaterReservoir.deleteMany({});
  await WaterReservoir.insertMany([
    { capacity: 20000, currentLevel: 15000 },
    { capacity: 30000, currentLevel: 25000 }
  ]);
  console.log('✅ Réservoirs d\'eau créés');

  // 8. Warehouses
  await Warehouse.deleteMany({});
  await Warehouse.insertMany([
    { capacity: 50000, used: 10000 },
    { capacity: 75000, used: 20000 }
  ]);
  console.log('✅ Entrepôts créés');

  // 9. Fertilizers
  await Fertilizer.deleteMany({});
  await Fertilizer.insertMany([
    { type: 'azote', quantity: 1000 },
    { type: 'phosphore', quantity: 800 }
  ]);
  console.log('✅ Fertilisants créés');

  console.log('🎉 Initialisation terminée avec succès !');
};

module.exports = initializeDB;