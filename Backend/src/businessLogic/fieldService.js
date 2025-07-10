const { fieldState } = require('../models/field');
const cropConfig = require('../config/cropConfig');

class FieldService {
    constructor(fieldRepository, machineService, storageService, eventManager) {
        this.fieldRepository = fieldRepository;
        this.machineService = machineService;
        this.storageService = storageService;
        this.eventManager = eventManager;
    }

    async cultivate(fieldId, action, cropType = null) {
        const field = await this.fieldRepository.getById(fieldId);
        this.validateAction(field.state, action, cropType);

        // Acquérir les machines nécessaires
        const requiredMachines = this.getRequiredMachines(action, cropType);
        const machines = await Promise.all(
            requiredMachines.map(type => this.machineService.acquire(type))
        );

        try {
            // Simuler le temps de travail (30s)
            await new Promise(resolve => setTimeout(resolve, 30000));

            const updateData = { state: action, lastActionAt: new Date() };
            
            if (action === fieldState.SOWED) {
                updateData.cropType = cropType;
                // Programmer la maturation (2 minutes)
                setTimeout(() => this.setReadyForHarvest(fieldId), 120000);
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
        if (field.state !== fieldState.READY) {
            throw new Error('Field not ready for harvest');
        }

        const yieldAmount = this.calculateYield(field.cropType, field.fertilized);
        await this.storageService.addItem(field.cropType, yieldAmount);

        const updatedField = await this.fieldRepository.update(fieldId, {
            state: fieldState.HARVESTED,
            cropType: null,
            fertilized: false
        });

        this.eventManager.publish('fieldHarvested', { fieldId, yield: yieldAmount });
        return updatedField;
    }

    // Helpers
    validateAction(currentState, action, cropType) {
        const validTransitions = {
            [fieldState.HARVESTED]: [fieldState.PLOWED],
            [fieldState.PLOWED]: [fieldState.SOWED],
            [fieldState.SOWED]: [fieldState.FERTILIZED, fieldState.READY],
            [fieldState.FERTILIZED]: [fieldState.READY],
            [fieldState.READY]: [fieldState.HARVESTED]
        };

        if (!validTransitions[currentState]?.includes(action)) {
            throw new Error(`Invalid transition: ${currentState} -> ${action}`);
        }

        if (action === fieldState.SOWED && !cropType) {
            throw new Error('Crop type required for sowing');
        }
    }

    getRequiredMachines(action, cropType) {
        const config = cropConfig[cropType];
        switch (action) {
            case fieldState.PLOWED: return ['tractor', 'plow'];
            case fieldState.SOWED: return config.plantingMachines;
            case fieldState.FERTILIZED: return ['tractor', 'fertilizer'];
            case fieldState.HARVESTED: return config.harvestingMachines;
            default: throw new Error(`Unknown action: ${action}`);
        }
    }

    calculateYield(cropType, fertilized) {
        const baseYield = cropConfig[cropType].yield;
        return fertilized ? Math.floor(baseYield * 1.5) : baseYield;
    }

    async setReadyForHarvest(fieldId) {
        const field = await this.fieldRepository.getById(fieldId);
        if (field.state === fieldState.SOWED || field.state === fieldState.FERTILIZED) {
            await this.fieldRepository.update(fieldId, { state: fieldState.READY });
            this.eventManager.publish('fieldReadyForHarvest', { fieldId });
        }
    }
}

module.exports = FieldService;