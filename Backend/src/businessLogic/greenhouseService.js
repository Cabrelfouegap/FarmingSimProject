const Greenhouse = require('../models/greenhouse');

const greenhouseService = {
  // CRUD
  async getAllGreenhouses() {
    return Greenhouse.find();
  },
  async getGreenhouseById(id) {
    return Greenhouse.findById(id);
  },
  async createGreenhouse(data) {
    return Greenhouse.create(data);
  },
  async updateGreenhouse(id, data) {
    return Greenhouse.findByIdAndUpdate(id, data, { new: true });
  },
  async deleteGreenhouse(id) {
    return Greenhouse.findByIdAndDelete(id);
  }
  // Ajoute ici d'autres méthodes métier si besoin
};

module.exports = greenhouseService; 