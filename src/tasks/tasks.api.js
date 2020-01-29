import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
});

function getTasks() {
    return client.get('/tasks')
    .then(resp => resp.data)
}

function getTask(id) {
    return client.get(`/tasks/${id}`)
    .then(resp => resp.data)
}

function postTask(task) {
    return client.post('/tasks', task)
    .then(resp => resp.data)
}

function deleteTask(task) {
    return client.delete(`/tasks/${task.id}`);
}

function putTask(task) {
    return client.put(`/tasks/${task.id}`, task);
}

export default {
    getTasks,
    getTask,
    postTask,
    deleteTask,
    putTask
};
