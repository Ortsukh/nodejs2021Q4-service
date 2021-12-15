"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_memory_repository_1 = __importDefault(require("./user.memory.repository"));
const getAll = () => user_memory_repository_1.default.getAll();
const get = (id) => user_memory_repository_1.default.get(id);
const create = (user) => user_memory_repository_1.default.create(user);
const update = (id, user) => user_memory_repository_1.default.update(id, user);
const remove = (id) => user_memory_repository_1.default.remove(id);
exports.default = { getAll, get, create, update, remove };
