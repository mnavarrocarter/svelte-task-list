/**
 * This is the model of a task
 */
class Task {

    /**
     * @param {string} id 
     * @param {string} title 
     * @param {string} description 
     */
    constructor(id, title, description = '') {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = false;
        this.completedAt = '';
        this.dueDate = '';
    }

    /**
     * Marks a task as completed
     */
    toggleCompleted() {
        if (this.completed === true) {
            this.completed = false;
            this.completedAt = '';
            return;
        }
        this.completed = true;
        this.completedAt = new Date().toISOString();
    }

    /**
     * @param {Date} date 
     */
    setDueDate(date) {
        this.dueDate = date.toISOString();
    }
}

module.exports = Task;
