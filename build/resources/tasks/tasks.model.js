"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Task {
    constructor(props) {
        this.id = (0, uuid_1.v4)();
        this.title = props.title;
        this.order = props.order;
        this.description = props.description;
        this.userId = props.userId;
        this.boardId = props.boardId;
        this.columnId = props.columnId;
    }
}
exports.default = Task;
