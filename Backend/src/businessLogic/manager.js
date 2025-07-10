class Manager {
    constructor(
        fieldService,
        machineService,
        storageService,
        factoryService
    ) {
        this.fieldService = fieldService;
        this.machineService = machineService;
        this.storageService = storageService;
        this.factoryService = factoryService;
        this.revenue = 0;
    }

    async dailyCycle() {
        // 1. Récolter les champs prêts
        const fieldsToHarvest = await this.fieldService.getReadyForHarvest();
        await Promise.all(
            fieldsToHarvest.map(f => 
                this.fieldService.harvest(f.fieldId))
        );

        // 2. Traiter les usines
        const factories = await this.factoryService.getAll();
        await Promise.all(
            factories.map(f => 
                this.factoryService.process(f.factoryId))
        );

        // 3. Calculer le revenu
        this.revenue = await this.calculateRevenue();
    }

    async calculateRevenue() {
        const storage = await this.storageService.get();
        return storage.items.reduce(
            (sum, item) => sum + (item.quantity * 1), // 1 or/L
            0
        );
    }
}

module.exports = Manager;