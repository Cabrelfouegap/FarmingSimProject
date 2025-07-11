const AnimalFarm = require('../models/animalFarm');
const Animal = require('../models/animal');

const animalFarmService = {
  // CRUD
  async getAllAnimalFarms() {
    return AnimalFarm.find();
  },
  async getAnimalFarmById(id) {
    return AnimalFarm.findById(id);
  },
  async createAnimalFarm(data) {
    return AnimalFarm.create(data);
  },
  async updateAnimalFarm(id, data) {
    return AnimalFarm.findByIdAndUpdate(id, data, { new: true });
  },
  async deleteAnimalFarm(id) {
    return AnimalFarm.findByIdAndDelete(id);
  },

  // Métier
  async produce(farmId) {
    // Logique de production (lait, laine, oeufs, fumier)
  },
  async consume(farmId) {
    // Logique de consommation (eau, herbe)
  },
  async checkAnimalStatus(animalId) {
    // Gère le stock d'herbe, état (deficit, mort)
  }
};

module.exports = animalFarmService; 