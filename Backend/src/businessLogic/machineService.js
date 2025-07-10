class MachineService {
    constructor(machineRepository, eventManager) {
        this.machineRepository = machineRepository;
        this.eventManager = eventManager;
        this.waitingQueues = new Map();
    }

    async acquire(machineType) {
        // Trouver une machine disponible
        let machine = (await this.machineRepository.getAvailableByType(machineType))[0];
        
        if (!machine) {
            // Mettre en file d'attente si aucune disponible
            await new Promise(resolve => {
                if (!this.waitingQueues.has(machineType)) {
                    this.waitingQueues.set(machineType, []);
                }
                this.waitingQueues.get(machineType).push(resolve);
            });
            machine = (await this.machineRepository.getAvailableByType(machineType))[0];
        }

        // Réserver la machine
        const updated = await this.machineRepository.update(machine.machineId, {
            inUse: true,
            currentField: null,
            taskEndTime: null
        });

        this.eventManager.publish('machineAcquired', updated);
        return updated;
    }

    async release(machineId) {
        const machine = await this.machineRepository.getById(machineId);
        const updated = await this.machineRepository.update(machineId, {
            inUse: false,
            currentField: null,
            taskEndTime: null
        });

        // Notifier la file d'attente
        if (this.waitingQueues.has(machine.type) && 
            this.waitingQueues.get(machine.type).length > 0) {
            const resolve = this.waitingQueues.get(machine.type).shift();
            resolve();
        }

        this.eventManager.publish('machineReleased', updated);
        return updated;
    }

    async getAvailableMachines() {
        return this.machineRepository.getByType().filter(m => !m.inUse);
    }

    async getMachineUsage() {
        const machines = await this.machineRepository.getAll();
        return {
            total: machines.length,
            inUse: machines.filter(m => m.inUse).length,
            byType: machines.reduce((acc, m) => {
                acc[m.type] = acc[m.type] || { total: 0, inUse: 0 };
                acc[m.type].total++;
                if (m.inUse) acc[m.type].inUse++;
                return acc;
            }, {})
        };
    }

    async getAllMachines() {
        return this.machineRepository.getAll();
    }

    async getById(machineId) {
        return this.machineRepository.getById(machineId);
    }

    async getMachinesByType(type) {
        return this.machineRepository.getByType(type);
    }
}

module.exports = MachineService;