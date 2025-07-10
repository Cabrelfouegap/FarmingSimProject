const { Machine } = require('../models/machine');

class MachineRepository {
    async getAll() {
        return Machine.find({});
    }

    async getById(machineId) {
        return Machine.findOne({ machineId });
    }

    async getByType(type) {
        return Machine.find({ type });
    }

    async getAvailableByType(type) {
        return Machine.find({ type, inUse: false });
    }

    async update(machineId, updateData) {
        return Machine.findOneAndUpdate({ machineId }, updateData, { new: true });
    }
}

module.exports = MachineRepository;