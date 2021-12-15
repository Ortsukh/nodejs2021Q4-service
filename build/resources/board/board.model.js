"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
function initColumns(columns) {
    if (Array.isArray(columns) && columns !== undefined) {
        return columns.map((column) => {
            const id = (0, uuid_1.v4)();
            const newColumn = { ...column, id };
            return newColumn;
        });
    }
    return [];
}
class Board {
    constructor(props) {
        this.id = (0, uuid_1.v4)();
        this.title = props.title;
        this.columns = initColumns(props.columns);
    }
}
exports.default = Board;
