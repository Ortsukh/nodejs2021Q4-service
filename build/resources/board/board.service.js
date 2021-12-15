"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const board_repository_1 = __importDefault(require("./board.repository"));
const getAll = () => board_repository_1.default.getAll();
const get = (id) => board_repository_1.default.get(id);
const create = (board) => board_repository_1.default.create(board);
const update = (id, board) => board_repository_1.default.update(id, board);
const remove = (id) => board_repository_1.default.remove(id);
module.exports = { getAll, get, create, update, remove };
