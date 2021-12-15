"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const board_model_1 = __importDefault(require("./board.model"));
const board_service_1 = __importDefault(require("./board.service"));
const boardRouter = async (router) => {
    router.get('/', async (_, response) => {
        const board = await board_service_1.default.getAll();
        if (!board) {
            response.code(404);
        }
        response.code(200);
        response.send(board);
    });
    router.get('/:id', async (request, response) => {
        const params = request.params;
        try {
            const board = await board_service_1.default.get(params.id);
            response.code(200).send(board);
        }
        catch (error) {
            response.code(404).send("Not Found");
        }
    });
    router.post('/', async (request, response) => {
        const body = request.body;
        const board = await board_service_1.default.create(new board_model_1.default({
            title: body.title,
            columns: body.columns,
        }));
        response.code(201).send(board);
    });
    router.put('/:id', async (request, response) => {
        const body = request.body;
        const params = request.params;
        // const params = { title: req.body.title, columns: req.body.columns };
        const board = await board_service_1.default.update(params.id, body);
        response.code(200).send(board);
    });
    router.delete('/:id', async (request, response) => {
        const params = request.params;
        const result = await board_service_1.default.remove(params.id);
        console.log(result);
        if (typeof result === 'string') {
            response.code(404);
            response.send(result);
        }
        response.code(204);
    });
};
exports.default = boardRouter;
