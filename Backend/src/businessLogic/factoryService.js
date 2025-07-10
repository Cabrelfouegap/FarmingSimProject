const factoryConfig = require('../config/factoryConfig');

class FactoryService {
    constructor(factoryRepository, storageRepository) {
        this.factoryRepository = factoryRepository;
        this.storageRepository = storageRepository;
        this.activeProcesses = new Map();
    }

    async getAllFactories() {
        return this.factoryRepository.getAllFactories();
    }

    async getFactoryById(id) {
        return this.factoryRepository.getFactoryById(Number(id));
    }

    async getFactoriesByType(type) {
        return this.factoryRepository.getFactoriesByType(type);
    }

    async startProduction(factoryId) {
        const factory = await this.factoryRepository.getFactoryById(factoryId);
        if (!factory) {
            throw new Error('Factory not found');
        }

        if (factory.isActive) {
            throw new Error('Factory is already active');
        }

        // Vérifier si on peut démarrer (stock d'entrée disponible)
        const canStart = await this.checkInputAvailability(factory);
        if (!canStart) {
            throw new Error('Insufficient input materials');
        }

        // Démarrer la production
        await this.factoryRepository.setFactoryActive(factoryId, true);
        
        // Démarrer le processus automatique
        this.startAutomaticProcessing(factoryId);
        
        return { message: `Factory ${factoryId} started production` };
    }

    async stopProduction(factoryId) {
        const factory = await this.factoryRepository.getFactoryById(factoryId);
        if (!factory) {
            throw new Error('Factory not found');
        }

        // Arrêter le processus automatique
        this.stopAutomaticProcessing(factoryId);
        
        // Mettre à jour l'état
        await this.factoryRepository.setFactoryActive(factoryId, false);
        
        return { message: `Factory ${factoryId} stopped production` };
    }

    async processBatch(factoryId, quantity = null) {
        const factory = await this.factoryRepository.getFactoryById(factoryId);
        if (!factory) {
            throw new Error('Factory not found');
        }

        return await this.processFactoryBatch(factory, quantity);
    }

    async getFactoryStats(factoryId) {
        const factory = await this.factoryRepository.getFactoryById(factoryId);
        if (!factory) {
            throw new Error('Factory not found');
        }

        return {
            factoryId: factory.factoryId,
            type: factory.type,
            isActive: factory.isActive,
            totalProcessed: factory.totalProcessed,
            totalRevenue: factory.totalRevenue,
            lastProcessed: factory.lastProcessed,
            multiplier: factory.multiplier,
            processingRate: factory.processingRate
        };
    }

    async getProductionStatus(factoryId) {
        const factory = await this.factoryRepository.getFactoryById(factoryId);
        if (!factory) {
            throw new Error('Factory not found');
        }

        const canProcess = await this.checkInputAvailability(factory);
        const storage = await this.storageRepository.get();
        const canOutput = !storage.isFull();

        return {
            factoryId: factory.factoryId,
            isActive: factory.isActive,
            canProcess,
            canOutput,
            storageFull: storage.isFull(),
            lastProcessed: factory.lastProcessed
        };
    }

    async addInputItem(factoryId, item, quantity) {
        // Cette méthode ajoute des items au stockage général
        return await this.storageRepository.addItem(item, quantity);
    }

    async removeOutputItem(factoryId, item, quantity) {
        // Cette méthode retire des items du stockage général
        return await this.storageRepository.removeItem(item, quantity);
    }

    // Méthodes privées
    async startAutomaticProcessing(factoryId) {
        const factory = await this.factoryRepository.getFactoryById(factoryId);
        if (!factory) return;

        const process = setInterval(async () => {
            try {
                await this.processFactoryBatch(factory);
            } catch (err) {
                console.error(`Factory ${factoryId} processing error:`, err.message);
                // Arrêter automatiquement si erreur
                clearInterval(process);
                this.activeProcesses.delete(factoryId);
                await this.factoryRepository.setFactoryActive(factoryId, false);
            }
        }, 1000); // Traitement chaque seconde selon l'énoncé

        this.activeProcesses.set(factoryId, process);
    }

    stopAutomaticProcessing(factoryId) {
        const process = this.activeProcesses.get(factoryId);
        if (process) {
            clearInterval(process);
            this.activeProcesses.delete(factoryId);
        }
    }

    async processFactoryBatch(factory, quantity = null) {
        // Vérifier le stock d'entrée
        const hasInput = await this.checkInputAvailability(factory);
        if (!hasInput) {
            throw new Error('Insufficient input materials');
        }

        // Vérifier l'espace de stockage pour la sortie
        const outputQty = quantity || factory.processingRate;
        const hasSpace = await this.checkStorageSpace(outputQty * factory.multiplier);
        if (!hasSpace) {
            throw new Error('Storage full - cannot output processed items');
        }

        // Consommer les intrants
        await this.consumeInputs(factory, outputQty);

        // Produire les extrants
        const producedQty = outputQty * factory.multiplier;
        await this.storageRepository.addItem(factory.outputType, producedQty);

        // Mettre à jour les statistiques de l'usine
        await this.factoryRepository.updateFactory(factory.factoryId, {
            lastProcessed: new Date(),
            totalProcessed: factory.totalProcessed + outputQty,
            totalRevenue: factory.totalRevenue + producedQty // 1 L = 1 or
        });

        return {
            message: `Processed ${outputQty} → ${producedQty} ${factory.outputType}`,
            inputConsumed: outputQty,
            outputProduced: producedQty,
            revenue: producedQty
        };
    }

    async checkInputAvailability(factory) {
        const storage = await this.storageRepository.get();
        
        if (factory.requiresEqualQuantities) {
            // Pour les usines qui nécessitent des quantités égales (bakery, chip_factory)
            const quantities = factory.inputTypes.map(inputType => {
                const item = storage.items.find(i => i.itemType === inputType);
                return item ? item.quantity : 0;
            });
            const minQuantity = Math.min(...quantities);
            return minQuantity >= factory.processingRate;
        } else {
            // Pour les usines normales
            return factory.inputTypes.every(inputType => {
                const item = storage.items.find(i => i.itemType === inputType);
                return item && item.quantity >= factory.processingRate;
            });
        }
    }

    async checkStorageSpace(quantity) {
        const storage = await this.storageRepository.get();
        return storage.used + quantity <= storage.capacity;
    }

    async consumeInputs(factory, quantity) {
        if (factory.requiresEqualQuantities) {
            // Consommer des quantités égales de chaque intrant
            for (const inputType of factory.inputTypes) {
                await this.storageRepository.removeItem(inputType, quantity);
            }
        } else {
            // Consommer la quantité de traitement de chaque intrant
            for (const inputType of factory.inputTypes) {
                await this.storageRepository.removeItem(inputType, factory.processingRate);
            }
        }
    }
}

module.exports = FactoryService;