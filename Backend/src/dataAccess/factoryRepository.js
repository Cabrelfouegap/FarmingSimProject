const Factory = require('../models/factory');

class FactoryRepository {
  async getAllFactories() {
    return Factory.find({});
  }

  async getFactoryById(factoryId) {
    return Factory.findOne({ factoryId });
  }

  async updateFactory(factoryId, updateData) {
    return Factory.findOneAndUpdate({ factoryId }, updateData, { new: true });
  }

  async setFactoryActive(factoryId, isActive) {
    return this.updateFactory(factoryId, { isActive });
  }

  async getFactoriesByType(type) {
    return Factory.find({ type });
  }
}

module.exports = FactoryRepository;