"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("./user.model"));
const user_service_1 = __importDefault(require("./user.service"));
const userRouter = async (router) => {
    router.get('/', async (_, response) => {
        const users = await user_service_1.default.getAll();
        if (!users) {
            response.code(404);
        }
        console.log(users);
        response.send(users);
    });
    router.get('/:id', async (request, response) => {
        const params = request.params;
        const user = await user_service_1.default.get(params.id);
        // const user = request.params as Params
        response.code(200);
        response.send(user);
    });
    router.post('/', async (request, response) => {
        const { login: loginProps, password: passwordProps, name: nameProps } = request.body;
        const user = await user_service_1.default.create(new user_model_1.default({
            login: loginProps,
            password: passwordProps,
            name: nameProps,
        }));
        response.code(201).send(user_model_1.default.toResponse(user));
    });
    router.put('/:id', async (request, response) => {
        const params = request.params;
        const body = request.body;
        console.log(params);
        const user = await user_service_1.default.update(params.id, body);
        response.code(200);
        response.send(user);
    });
    router.delete('/:id', async (request, response) => {
        const params = request.params;
        await user_service_1.default.remove(params.id);
        response.code(204);
        // response.send(users);
    });
};
exports.default = userRouter;
