"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("./user.model"));
const user_service_1 = __importDefault(require("./user.service"));
const userRouter = async (router) => {
    router.get('/', (_, response) => {
        const users = user_service_1.default.getAll();
        if (!users) {
            response.code(404);
        }
        response.send(users);
    });
    router.get('/:id', (request, response) => {
        // const user = usersService.get(request.params.id);
        const user = request.params;
        response.code(200);
        response.send(user_model_1.default.toResponse(user));
    });
    router.post('/', (request, response) => {
        const { login: loginProps, password: passwordProps, name: nameProps } = request.body;
        const user = user_service_1.default.create(new user_model_1.default({
            login: loginProps,
            password: passwordProps,
            name: nameProps,
        }));
        response.code(201);
        response.send(user);
    });
    router.put('/:id', (request, response) => {
        const params = request.params;
        const user = user_service_1.default.update(params.id, params);
        response.code(200);
        response.send(user);
    });
    router.delete('/:id', (request, response) => {
        const params = request.params;
        const users = user_service_1.default.remove(params.id);
        response.code(204);
        response.send(users);
    });
};
exports.default = userRouter;
