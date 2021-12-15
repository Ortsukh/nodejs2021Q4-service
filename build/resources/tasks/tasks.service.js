"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// const tasksRepo = require('./task.repository.ts');
const task_repository_1 = __importDefault(require("./task.repository"));
const getAll = () => task_repository_1.default.getAll();
const get = (id) => task_repository_1.default.get(id);
const create = (task) => task_repository_1.default.create(task);
const update = (id, task) => task_repository_1.default.update(id, task);
const remove = (id) => task_repository_1.default.remove(id);
module.exports = { getAll, get, create, update, remove };
