"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./common/config"));
const app_1 = __importDefault(require("./app"));
const PORT = config_1.default.PORT ?? 4000;
const start = async () => {
    try {
        await app_1.default.listen(PORT);
    }
    catch (error) {
        app_1.default.log.error(error);
        process.exit(1);
    }
};
start();
