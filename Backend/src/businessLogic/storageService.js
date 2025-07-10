class StorageService {
    constructor(storageRepository, eventManager) {
        this.storageRepository = storageRepository;
        this.eventManager = eventManager;
        this.capacity = 100000; // 100,000 L
    }

    async addItem(itemType, quantity) {
        const storage = await this.storageRepository.get();
        const newUsed = storage.used + quantity;

        if (newUsed > this.capacity) {
            throw new Error('Storage capacity exceeded');
        }

        const itemIndex = storage.items.findIndex(i => i.itemType === itemType);
        
        if (itemIndex >= 0) {
            storage.items[itemIndex].quantity += quantity;
        } else {
            storage.items.push({ itemType, quantity });
        }

        storage.used = newUsed;
        const updated = await this.storageRepository.update(storage);
        this.eventManager.publish('storageUpdated', updated);
        
        if (newUsed >= this.capacity) {
            this.eventManager.publish('storageFull');
        }

        return updated;
    }

    async removeItem(itemType, quantity) {
        const storage = await this.storageRepository.get();
        const itemIndex = storage.items.findIndex(i => i.itemType === itemType);

        if (itemIndex === -1 || storage.items[itemIndex].quantity < quantity) {
            throw new Error('Not enough items in storage');
        }

        storage.items[itemIndex].quantity -= quantity;
        storage.used -= quantity;

        if (storage.items[itemIndex].quantity === 0) {
            storage.items.splice(itemIndex, 1);
        }

        const updated = await this.storageRepository.update(storage);
        this.eventManager.publish('storageUpdated', updated);
        return updated;
    }

    async getStock() {
        const storage = await this.storageRepository.get();
        return {
            used: storage.used,
            remaining: this.capacity - storage.used,
            items: storage.items
        };
    }

    async hasItem(itemType, quantity = 1) {
        const storage = await this.storageRepository.get();
        const item = storage.items.find(i => i.itemType === itemType);
        return item && item.quantity >= quantity;
    }
}

module.exports = StorageService;