
import { FastifyPluginAsync } from 'fastify';

import Board from './board.model';

import boardService from './board.service';

interface IColumn {
  id: string;
  title: string;
  order: number;
}
 interface IBoard {
  id: string;
  title: string;
  columns?: IColumn[];
}

const boardRouter: FastifyPluginAsync = async (router): Promise<void> => {
  router.get('/',  async(_, response) => {

    const board = await boardService.getAll();
    if (!board) {

      response.code(404);

    }
    console.log(board);
    response.code(200)
    response.send(board);
  });

  router.get('/:id', async(request, response) => {
    const params = request.params as IBoard
    try {
      const board =await boardService.get(params.id);
      response.code(200).send(board);
    } catch (error) {
      response.code(404);
    }
 
  });

  router.post('/', async(request, response) => {
    const body = request.body as IBoard
    const board = await boardService.create(
      new Board({
        title: body.title,
        columns: body.columns,
      }),
    );
    response.code(201).send(board);
  });

  router.put('/:id', async(request, response) => {
    const body = request.body as IBoard
    const params = request.params as IBoard

    // const params = { title: req.body.title, columns: req.body.columns };
  
    const board =await boardService.update(params.id, body);
    response.code(200).send(board);
  });

  router.delete('/:id',async(request, response)  => {
    const params = request.params as IBoard
   
    await boardService.remove(params.id);

     response.code(204);  
  });
  
}
export default boardRouter;
