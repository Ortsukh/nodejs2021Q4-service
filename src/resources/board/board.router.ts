
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
/**
 *
 * @param router module of fastify
 * return void
 */
const boardRouter: FastifyPluginAsync = async (router): Promise<void> => {
   /**
 * Get all tasks
 * @returns all tasks
 */ 
  router.get('/',  async(_, response) => {

    const board = await boardService.getAll();
    if (!board) {
      response.code(404);
    }
    response.code(200)
    response.send(board);
  });
/**
 * 
 * @param id current task ID
 * @returns task with current ID or string Not Found with code
 */
  router.get('/:id', async(request, response) => {
    const params = request.params as IBoard
    try {
      const board = await boardService.get(params.id);

      response.code(200).send(board);
    } catch (error) {
      
      response.code(404).send("Not Found");
    }
 
  });
/**
 * 
 * @param task new task params
 * @returns new task 
 */
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
/**
 * 
 * @param id current task ID
 * @param task updated task params
 * @returns updated task
 */
  router.put('/:id', async(request, response) => {
    const body = request.body as IBoard
    const params = request.params as IBoard
    const board =await boardService.update(params.id, body);
    response.code(200).send(board);
  });
/**
 * 
 * @param id current task ID
 * @returns string "not found" or true
 */
  router.delete('/:id',async(request, response)  => {
    const params = request.params as IBoard
    const result = await boardService.remove(params.id);
    if (typeof result === 'string') {
      response.code(404);
      response.send(result);
    }
     response.code(204);  
  });
  
}
export default boardRouter;
