import { writable } from 'svelte/store';
import { getTasks, deleteTask, postTask, putTask } from './../../service/api';

/**
 * This is the model of a task
 */
class Task {

    /**
     * @param {string} id 
     * @param {string} title 
     * @param {string} description 
     */
    constructor(id, title) {
        this.id = id;
        this.title = title;
        this.description = '';
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

/**
 * Maps a task object to a Task class.
 * @param {object} task 
 */
function mapTask(task) {
    const newTask = new Task(task.id, task.title);
    newTask.completed = task.completed;
    newTask.description = task.description;
    newTask.dueDate = task.dueDate;
    newTask.completedAt = task.completedAt;
    return newTask;
};

const TaskRepository = writable([]);

TaskRepository.all = () => {
    return getTasks()
    .then(tasks => {
        tasks = tasks.map(mapTask);
        TaskRepository.set(tasks);
    })
    .catch(() => {
        throw new Error('Could not get tasks');
    });
};

/**
 * @param {Task} task
 */
TaskRepository.add = (task) => {
    return postTask(task)
    .then((task) => {
        TaskRepository.update(tasks => {
            tasks.push(mapTask(task));
            return tasks;
        });
        return task;
    }).catch(() => {
        throw new Error('Task could not be created');
    });
};

/**
 * @param {Task} task
 */
TaskRepository.save = (task) => {
    return putTask(task)
    .then((task) => {
        TaskRepository.update(tasks => {
            const index = tasks.indexOf(task);
            if (index !== -1) {
                tasks[index] = task;
            }
            return tasks;
        });
        return task;
    })
    .catch(() => {
        throw new Error('Task could not be updated');
    });
};

/**
 * @param {Task} task
 */
TaskRepository.delete = (task) => {
    return deleteTask(task)
    .then(() => {
        TaskRepository.update(tasks => {
            return tasks.filter(inTask => task.id !== inTask.id);
        });
    })
    .catch(() => {
        throw new Error('Task could not be deleted');
    })
};

export {
    TaskRepository,
    Task
};