class FactoryService {
    constructor(factoryRepository, storageRepository) {
        this.factoryRepository = factoryRepository;
        this.storageRepository = storageRepository;
        this.activeProcesses = new Map();
    }

    async start(factoryId) {
        const factory = await this.factoryRepository.getById(factoryId);
        
        const process = setInterval(async () => {
            try {
                await this.processBatch(factory);
            } catch (err) {
                clearInterval(process);
                this.activeProcesses.delete(factoryId);
            }
        }, 1000); // Traitement chaque seconde

        this.activeProcesses.set(factoryId, process);
    }

    async processBatch(factory) {
        // Vérifier le stock d'entrée
        const hasInput = await this.checkInput(factory);
        if (!hasInput) return;

        // Vérifier l'espace de stockage
        const outputQty = factory.processingRate * factory.multiplier;
        const hasSpace = await this.checkStorageSpace(outputQty);
        if (!hasSpace) return;

        // Effectuer la transformation
        await this.storageRepository.removeItems(
            factory.inputTypes, 
            factory.processingRate
        );
        
        await this.storageRepository.addItem(
            factory.outputType, 
            outputQty
        );
    }
}

module.exports = FactoryService;