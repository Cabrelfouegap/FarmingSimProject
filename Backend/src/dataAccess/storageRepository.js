const { Storage } = require('../models/storage');

class StorageRepository {
    async get() {
        return Storage.findOne({});
    }

    async addItem(itemType, quantity) {
        return Storage.findOneAndUpdate(
            {},
            { 
                $inc: { used: quantity },
                $push: { items: { itemType, quantity } }
            },
            { new: true }
        );
    }

    async removeItem(itemType, quantity) {
        return Storage.findOneAndUpdate(
            {},
            { 
                $inc: { used: -quantity },
                $pull: { items: { itemType } }
            },
            { new: true }
        );
    }
}

module.exports = StorageRepository;