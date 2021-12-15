"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tasks_model_1 = __importDefault(require("./tasks.model"));
const tasks_service_1 = __importDefault(require("./tasks.service"));
const taskRouter = async (router) => {
    router.get('/', (_, response) => {
        const tasks = tasks_service_1.default.getAll();
        if (!tasks) {
            response.code(404);
        }
        response.send(tasks);
    });
    router.get('/:id', (request, response) => {
        const params = request.params;
        try {
            const task = tasks_service_1.default.get(params.id);
            response.code(200).send(task);
        }
        catch (error) {
            response.code(404);
        }
    });
    router.post('/', (request, response) => {
        const body = request.body;
        const task = tasks_service_1.default.create(new tasks_model_1.default({
            title: body.title,
            order: body.order,
            description: body.description,
            userId: body.userId,
            boardId: body.boardId,
            columnId: body.columnId,
        }));
        response.code(201).send(task);
    });
    router.put('/:id', (request, response) => {
        const body = request.body;
        const params = request.params;
        // const params = { title : req.body.title,
        //   order : req.body.order,
        //   description : req.body.description,
        //   userId : req.body.userId,
        //   boardId : req.body.boardId,
        //   columnId : req.body.columnId };
        const task = tasks_service_1.default.update(params.id, body);
        response.code(200).send(task);
    });
    router.delete('/:id', (request, response) => {
        const params = request.params;
        tasks_service_1.default.remove(params.id);
        response.code(204);
    });
};
exports.default = taskRouter;
