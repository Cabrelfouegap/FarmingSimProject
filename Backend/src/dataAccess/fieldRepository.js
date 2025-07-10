const { Field } = require('../models/field');

class FieldRepository {
    async getAll() {
        return Field.find({});
    }

    async getById(fieldId) {
        return Field.findOne({ fieldId });
    }

    async getByState(state) {
        return Field.find({ state });
    }

    async update(fieldId, updateData) {
        return Field.findOneAndUpdate({ fieldId }, updateData, { new: true });
    }

    async assignBatch(fieldIds, batch) {
        return Field.updateMany(
            { fieldId: { $in: fieldIds } },
            { $set: { batch } }
        );
    }
}

module.exports = FieldRepository;