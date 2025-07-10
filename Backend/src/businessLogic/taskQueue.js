class TaskQueue {
  constructor() {
    this.queue = [];
    this.pendingTasks = new Map();
  }

  addTask(task) {
    const priority = this.calculatePriority(task);
    this.queue.push({ ...task, priority });
    this.queue.sort((a, b) => b.priority - a.priority);
  }

  calculatePriority(task) {
    let priority = 0;
    // Priorité plus élevée pour les champs prêts à récolter
    if (task.action === 'harvest') priority += 10;
    // Priorité pour les champs fertilisés
    if (task.fieldData.fertilized) priority += 5;
    return priority;
  }

  getNextTask() {
    return this.queue.shift();
  }

  processTask(task, executeFn) {
    this.pendingTasks.set(task.fieldId, task);
    return executeFn(task).finally(() => {
      this.pendingTasks.delete(task.fieldId);
    });
  }
}

module.exports = TaskQueue;