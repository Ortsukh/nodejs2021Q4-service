"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// const DB = require('../../common/inMemoryDb.ts');
const inMemoryDb_1 = __importDefault(require("../../common/inMemoryDb"));
const getAll = async () => inMemoryDb_1.default.getAllTasks();
const get = async (id) => {
    const task = await inMemoryDb_1.default.getTask(id);
    if (task === "Not Found") {
        throw new Error(`the board with ${id} was not found`);
    }
    return task;
    return task;
};
const create = async (task) => inMemoryDb_1.default.createTask(task);
const update = async (id, task) => inMemoryDb_1.default.updateTask(id, task);
const remove = (id) => inMemoryDb_1.default.removeTask(id);
module.exports = { getAll, get, create, update, remove };
