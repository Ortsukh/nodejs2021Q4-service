"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// const DB = require('../../common/inMemoryDb.ts');
const inMemoryDb_1 = __importDefault(require("../../common/inMemoryDb"));
const getAll = async () => inMemoryDb_1.default.getAllUsers();
const get = async (id) => {
    const user = inMemoryDb_1.default.getUser(id);
    if (!user) {
        throw new Error(`the user with ${id} was not found`);
    }
    return user;
};
const create = async (user) => inMemoryDb_1.default.createUser(user);
const update = async (id, user) => inMemoryDb_1.default.updateUser(id, user);
const remove = (id) => inMemoryDb_1.default.deleteUser(id);
module.exports = { getAll, get, create, update, remove };
