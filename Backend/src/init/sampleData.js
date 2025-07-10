const { Field } = require('../models/field');
const { Machine } = require('../models/machine');
const Storage = require('../models/storage');
const Factory = require('../models/factory');

const initializeSampleData = async () => {
  // Données de test pour le développement
  await Field.create([
    { fieldId: 1, state: 'récolté' },
    { fieldId: 2, state: 'labouré' }
  ]);

  await Machine.create([
    { machineId: 1, type: 'tractor' },
    { machineId: 2, type: 'grape_harvester' }
  ]);

  await Storage.create({
    capacity: 100000,
    used: 0,
    items: []
  });

  await Factory.create({
    factoryId: 1,
    type: 'oil_mill',
    inputTypes: ['olive'],
    outputType: 'huile',
    multiplier: 2
  });
};

module.exports = { initializeSampleData };