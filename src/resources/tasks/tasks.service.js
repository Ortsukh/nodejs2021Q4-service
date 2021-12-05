const tasksRepo = require('./task.repository');

const getAll = () => tasksRepo.getAll();

const get = id => tasksRepo.get(id);

const create = task => tasksRepo.create(task);

const update = (id, task) => tasksRepo.update(id, task);

const remove = id => tasksRepo.remove(id);

module.exports = { getAll, get, create, update, remove };
