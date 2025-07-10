const { fieldStates } = require('../models/field');
const cropConfig = require('../config/cropConfig');

class FieldService {
    constructor(fieldRepository, machineService, storageService, eventManager) {
        this.fieldRepository = fieldRepository;
        this.machineService = machineService;
        this.storageService = storageService;
        this.eventManager = eventManager;
        
        // Constantes selon l'énoncé
        this.ACTION_DURATION = 30000; // 30 secondes
        this.MATURATION_DURATION = 120000; // 2 minutes
        this.FERTILIZATION_BONUS = 0.5; // +50%
    }

    async cultivate(fieldId, action, cropType = null) {
        const field = await this.fieldRepository.getById(fieldId);
        if (!field) {
            throw new Error('Field not found');
        }

        this.validateAction(field.state, action, cropType);

        // Acquérir les machines nécessaires
        const requiredMachines = this.getRequiredMachines(action, cropType);
        const machines = await Promise.all(
            requiredMachines.map(type => this.machineService.acquire(type))
        );

        try {
            // Simuler le temps de travail (30 secondes selon l'énoncé)
            await new Promise(resolve => setTimeout(resolve, this.ACTION_DURATION));

            const updateData = { 
                state: action, 
                lastActionAt: new Date() 
            };
            
            if (action === fieldStates.SOWED) {
                updateData.cropType = cropType;
                updateData.plantedAt = new Date();
                // Programmer la maturation (2 minutes selon l'énoncé)
                setTimeout(() => this.setReadyForHarvest(fieldId), this.MATURATION_DURATION);
            }

            const updatedField = await this.fieldRepository.update(fieldId, updateData);
            this.eventManager.publish('fieldUpdated', updatedField);
            return updatedField;
        } finally {
            machines.forEach(m => this.machineService.release(m.machineId));
        }
    }

    async harvest(fieldId) {
        const field = await this.fieldRepository.getById(fieldId);
        if (!field) {
            throw new Error('Field not found');
        }
        
        if (field.state !== fieldStates.READY) {
            throw new Error('Field not ready for harvest');
        }

        // Calculer le rendement selon l'énoncé
        const baseYield = this.calculateYield(field.cropType, field.fertilized);
        
        // Vérifier la capacité de stockage
        if (!this.storageService.canAdd(baseYield)) {
            throw new Error('Storage capacity exceeded');
        }

        // Ajouter au stockage
        await this.storageService.addItem(field.cropType, baseYield);

        // Mettre à jour le champ
        const updatedField = await this.fieldRepository.update(fieldId, {
            state: fieldStates.HARVESTED,
            cropType: null,
            fertilized: false,
            readyForHarvestAt: null
        });

        this.eventManager.publish('fieldHarvested', { 
            fieldId, 
            yield: baseYield,
            revenue: baseYield // 1 L = 1 or selon l'énoncé
        });
        
        return updatedField;
    }

    // Helpers
    validateAction(currentState, action, cropType) {
        const validTransitions = {
            [fieldStates.HARVESTED]: [fieldStates.PLOWED],
            [fieldStates.PLOWED]: [fieldStates.SOWED],
            [fieldStates.SOWED]: [fieldStates.FERTILIZED, fieldStates.READY],
            [fieldStates.FERTILIZED]: [fieldStates.READY],
            [fieldStates.READY]: [fieldStates.HARVESTED]
        };

        if (!validTransitions[currentState]?.includes(action)) {
            throw new Error(`Invalid transition: ${currentState} -> ${action}`);
        }

        if (action === fieldStates.SOWED && !cropType) {
            throw new Error('Crop type required for sowing');
        }

        if (action === fieldStates.SOWED && !cropConfig[cropType]) {
            throw new Error(`Unknown crop type: ${cropType}`);
        }
    }

    getRequiredMachines(action, cropType) {
        if (!cropType || !cropConfig[cropType]) {
            throw new Error(`Unknown crop type: ${cropType}`);
        }

        const config = cropConfig[cropType];
        switch (action) {
            case fieldStates.PLOWED: 
                return ['tractor', 'plow'];
            case fieldStates.SOWED: 
                return config.plantingMachines;
            case fieldStates.FERTILIZED: 
                return ['tractor', 'fertilizer'];
            case fieldStates.READY: 
                return config.harvestingMachines;
            default: 
                throw new Error(`Unknown action: ${action}`);
        }
    }

    calculateYield(cropType, fertilized) {
        if (!cropConfig[cropType]) {
            throw new Error(`Unknown crop type: ${cropType}`);
        }
        
        const baseYield = cropConfig[cropType].yield;
        return fertilized ? Math.floor(baseYield * (1 + this.FERTILIZATION_BONUS)) : baseYield;
    }

    async setReadyForHarvest(fieldId) {
        const field = await this.fieldRepository.getById(fieldId);
        if (field && (field.state === fieldStates.SOWED || field.state === fieldStates.FERTILIZED)) {
            await this.fieldRepository.update(fieldId, { 
                state: fieldStates.READY,
                readyForHarvestAt: new Date()
            });
            this.eventManager.publish('fieldReadyForHarvest', { fieldId });
        }
    }

    async fertilize(fieldId) {
        const field = await this.fieldRepository.getById(fieldId);
        if (!field) {
            throw new Error('Field not found');
        }

        if (field.state !== fieldStates.SOWED) {
            throw new Error('Field must be sown before fertilizing');
        }

        return this.cultivate(fieldId, fieldStates.FERTILIZED);
    }
}

module.exports = FieldService;