const Fertilizer = require('../models/fertilizer');

const fertilizerService = {
  // CRUD
  async getAllFertilizers() {
    return Fertilizer.find();
  },
  async getFertilizerById(id) {
    return Fertilizer.findById(id);
  },
  async createFertilizer(data) {
    return Fertilizer.create(data);
  },
  async updateFertilizer(id, data) {
    return Fertilizer.findByIdAndUpdate(id, data, { new: true });
  },
  async deleteFertilizer(id) {
    return Fertilizer.findByIdAndDelete(id);
  }
  // Ajoute ici d'autres méthodes métier si besoin
};

module.exports = fertilizerService; 