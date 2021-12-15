"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tasks_model_1 = __importDefault(require("./tasks.model"));
const tasks_service_1 = __importDefault(require("./tasks.service"));
const taskRouter = async (router) => {
    router.get('/', async (_, response) => {
        const tasks = await tasks_service_1.default.getAll();
        if (!tasks) {
            response.code(404);
        }
        response.send(tasks);
    });
    router.get('/:id', async (request, response) => {
        const params = request.params;
        try {
            const task = await tasks_service_1.default.get(params.id);
            response.code(200).send(task);
        }
        catch (error) {
            response.code(404).send("Not Found");
        }
    });
    router.post('/', async (request, response) => {
        const body = request.body;
        const params = request.params;
        const task = await tasks_service_1.default.create(new tasks_model_1.default({
            title: body.title,
            order: body.order,
            description: body.description,
            userId: body.userId,
            boardId: params.boardId,
            columnId: body.columnId,
        }));
        response.code(201).send(task);
    });
    router.put('/:id', async (request, response) => {
        const body = request.body;
        const params = request.params;
        const task = await tasks_service_1.default.update(params.id, body);
        response.code(200).send(task);
    });
    router.delete('/:id', async (request, response) => {
        const params = request.params;
        const result = await tasks_service_1.default.remove(params.id);
        if (typeof result === 'string') {
            response.code(404);
            response.send(result);
        }
        else {
            response.code(204);
        }
    });
};
exports.default = taskRouter;
