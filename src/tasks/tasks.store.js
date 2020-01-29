import { writable } from 'svelte/store';
import Task from './task';
import api from './tasks.api';
import uuid from 'uuid';

// We initialize the task store
const tasks = writable([]);

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
}

/**
 * Creates a task instance
 * @param {string} title
 * @param {string} description
 * @return {Task}
 */
tasks.create = (title, description = '') => {
    return new Task(uuid.v4(), title, description);
};

tasks.all = () => {
    return api.getTasks()
    .then(apiTasks => {
        const mappedTasks = apiTasks.map(mapTask);
        tasks.set(mappedTasks);
    })
    .catch(() => {
        throw new Error('Could not get tasks');
    });
};

/**
 * @param {Task} task
 */
tasks.add = (task) => {
    return api.postTask(task)
    .then((task) => {
        tasks.update(updatedTasks => {
            updatedTasks.push(mapTask(task));
            return updatedTasks;
        });
        return task;
    }).catch(() => {
        throw new Error('Task could not be created');
    });
};

/**
 * @param {Task} task
 */
tasks.save = (task) => {
    return api.putTask(task)
    .then((task) => {
        tasks.update(updatedTasks => {
            const index = updatedTasks.indexOf(task);
            if (index !== -1) {
                updatedTasks[index] = task;
            }
            return updatedTasks;
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
tasks.delete = (task) => {
    return api.deleteTask(task)
    .then(() => {
        tasks.update(updatedTasks => {
            return updatedTasks.filter(inTask => task.id !== inTask.id);
        });
    })
    .catch(() => {
        throw new Error('Task could not be deleted');
    })
};

export default tasks;
