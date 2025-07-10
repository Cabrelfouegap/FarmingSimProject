const { Field } = require('../models/field');
const { Machine, machineTypes } = require('../models/machine');
const Storage = require('../models/storage');
const Factory = require('../models/factory');

const initializeDB = async () => {
  // 1. Champs (1-99)
  const fields = Array.from({ length: 99 }, (_, i) => ({
    fieldId: i + 1,
    state: 'récolté'
  }));
  await Field.deleteMany({});
  await Field.insertMany(fields);

  // 2. Machines
  const machines = [
    // Communes
    ...Array(5).fill().map((_, i) => ({ machineId: i+1, type: machineTypes.TRACTOR, currentField: 0 })),
    ...Array(3).fill().map((_, i) => ({ machineId: i+6, type: machineTypes.STANDARD_TRAILER, currentField: 0 })),
    ...Array(2).fill().map((_, i) => ({ machineId: i+9, type: machineTypes.HARVESTER, currentField: 0 })),
    ...Array(2).fill().map((_, i) => ({ machineId: i+11, type: machineTypes.PLOW, currentField: 0 })),
    ...Array(2).fill().map((_, i) => ({ machineId: i+13, type: machineTypes.FERTILIZER, currentField: 0 })),
    ...Array(2).fill().map((_, i) => ({ machineId: i+15, type: machineTypes.PLANTER, currentField: 0 })),

    // Spécialisées
    { machineId: 17, type: machineTypes.GRAPE_HARVESTER, currentField: 0 },
    // ... toutes les autres machines spécialisées
    { machineId: 32, type: machineTypes.SEMI_TRAILER, currentField: 0 }
  ];
  await Machine.deleteMany({});
  await Machine.insertMany(machines);

  // 3. Stockage
  await Storage.deleteMany({});
  await Storage.create({ capacity: 100000 });

  // 4. Usines
  const factories = [
    { factoryId: 1, type: 'oil_mill', inputTypes: ['tournesol', 'olive', 'canola'], outputType: 'huile', multiplier: 2 },
    // ... toutes les autres usines
    { factoryId: 11, type: 'wine_cellar', inputTypes: ['raisin'], outputType: 'vin', multiplier: 2 }
  ];
  await Factory.deleteMany({});
  await Factory.insertMany(factories);
};

module.exports = initializeDB;