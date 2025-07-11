const Warehouse = require('../models/warehouse');

const warehouseService = {
  // CRUD
  async getAllWarehouses() {
    return Warehouse.find();
  },
  async getWarehouseById(id) {
    return Warehouse.findById(id);
  },
  async createWarehouse(data) {
    return Warehouse.create(data);
  },
  async updateWarehouse(id, data) {
    return Warehouse.findByIdAndUpdate(id, data, { new: true });
  },
  async deleteWarehouse(id) {
    return Warehouse.findByIdAndDelete(id);
  }
  // Ajoute ici d'autres méthodes métier si besoin
};

module.exports = warehouseService; 