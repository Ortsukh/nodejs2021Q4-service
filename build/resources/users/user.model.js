"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class User {
    constructor(props) {
        this.id = (0, uuid_1.v4)();
        this.name = props.name;
        this.login = props.login;
        this.password = props.password;
    }
    static toResponse(user) {
        const { id, name, login } = user;
        return { id, name, login };
    }
}
exports.default = User;
