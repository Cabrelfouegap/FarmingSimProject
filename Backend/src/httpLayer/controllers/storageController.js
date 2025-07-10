class StorageController {
    constructor(storageService) {
        this.storageService = storageService;
    }

    async getStock(req, res) {
        try {
            const stock = await this.storageService.getStock();
            res.json(stock);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async sellItem(req, res) {
        try {
            const { itemType, quantity } = req.body;
            await this.storageService.removeItem(itemType, quantity);
            const stock = await this.storageService.getStock();
            res.json({ 
                message: `Sold ${quantity}L of ${itemType}`,
                revenue: quantity * 1, // 1 or/L
                stock 
            });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}

module.exports = StorageController;