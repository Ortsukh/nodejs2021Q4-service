"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// const DB = require('../../common/inMemoryDb.ts');
const inMemoryDb_1 = __importDefault(require("../../common/inMemoryDb"));
const getAll = async () => inMemoryDb_1.default.getAllBoards();
const get = async (id) => {
    const board = await inMemoryDb_1.default.getBoard(id);
    console.log(board);
    if (board === "not found") {
        throw new Error(`the board with ${id} was not found`);
    }
    return board;
};
const create = async (board) => inMemoryDb_1.default.createBoard(board);
const update = async (id, board) => inMemoryDb_1.default.updateBoard(id, board);
const remove = (id) => inMemoryDb_1.default.removeBoard(id);
module.exports = { getAll, get, create, update, remove };
