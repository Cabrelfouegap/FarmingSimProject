const WaterReservoir = require('../models/waterReservoir');

const waterService = {
  // CRUD
  async getAllWaterReservoirs() {
    return WaterReservoir.find();
  },
  async getWaterReservoirById(id) {
    return WaterReservoir.findById(id);
  },
  async createWaterReservoir(data) {
    return WaterReservoir.create(data);
  },
  async updateWaterReservoir(id, data) {
    return WaterReservoir.findByIdAndUpdate(id, data, { new: true });
  },
  async deleteWaterReservoir(id) {
    return WaterReservoir.findByIdAndDelete(id);
  }
  // Ajoute ici d'autres méthodes métier si besoin
};

module.exports = waterService; 