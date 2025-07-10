class StorageService {
    constructor(storageRepository, eventManager) {
        this.storageRepository = storageRepository;
        this.eventManager = eventManager;
        this.capacity = 100000; // 100 000 L selon l'énoncé
    }

    async addItem(itemType, quantity) {
        const storage = await this.storageRepository.get();
        const newUsed = storage.used + quantity;

        if (newUsed > this.capacity) {
            throw new Error('Storage capacity exceeded (100 000 L limit)');
        }

        const itemIndex = storage.items.findIndex(i => i.itemType === itemType);
        
        if (itemIndex >= 0) {
            storage.items[itemIndex].quantity += quantity;
        } else {
            storage.items.push({ itemType, quantity, value: 1 }); // 1 L = 1 or
        }

        storage.used = newUsed;
        storage.totalRevenue += quantity; // 1 L = 1 or selon l'énoncé
        storage.lastUpdated = new Date();
        
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
        storage.lastUpdated = new Date();

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
            capacity: this.capacity,
            used: storage.used,
            remaining: this.capacity - storage.used,
            items: storage.items,
            totalRevenue: storage.totalRevenue,
            isFull: storage.used >= this.capacity
        };
    }

    async hasItem(itemType, quantity = 1) {
        const storage = await this.storageRepository.get();
        const item = storage.items.find(i => i.itemType === itemType);
        return item && item.quantity >= quantity;
    }

    canAdd(quantity) {
        return quantity <= this.capacity;
    }

    async getAvailableSpace() {
        const storage = await this.storageRepository.get();
        return this.capacity - storage.used;
    }

    async isFull() {
        const storage = await this.storageRepository.get();
        return storage.used >= this.capacity;
    }

    async sellItem(itemType, quantity) {
        const storage = await this.storageRepository.get();
        const item = storage.items.find(i => i.itemType === itemType);
        
        if (!item || item.quantity < quantity) {
            throw new Error('Not enough items to sell');
        }

        const revenue = quantity * item.value; // 1 L = 1 or
        
        await this.removeItem(itemType, quantity);
        
        // Mettre à jour les revenus totaux
        storage.totalRevenue += revenue;
        await this.storageRepository.update(storage);
        
        this.eventManager.publish('itemSold', { itemType, quantity, revenue });
        return { revenue, remainingQuantity: item.quantity - quantity };
    }
}

module.exports = StorageService;