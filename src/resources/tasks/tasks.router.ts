import { FastifyPluginAsync } from 'fastify';

import Task from './tasks.model';

import tasksService from './tasks.service';

interface ITask {
  id : string,
  title : string,
  order : number,
  description : string,
  userId : string | null,
  boardId : string,
  columnId : string,
}


const taskRouter: FastifyPluginAsync = async (router): Promise<void> => {

  router.get('/',async (_, response) => {
    const tasks = await tasksService.getAll();
    if (!tasks) {

      response.code(404);

    }
    response.send(tasks);
  });

  router.get('/:id', async(request, response) => {
    const params = request.params as ITask
    try {
      const task =await tasksService.get(params.id);
      response.code(200).send(task);
    
    } catch (error) {
      response.code(404)
    }
  });

  router.post('/', async(request, response) => {
    const body = request.body as ITask

    const task =await tasksService.create(
   
      new Task({
      
        title : body.title,
        order : body.order,
        description : body.description,
        userId : body.userId,
        boardId : body.boardId,
        columnId : body.columnId,
      }),
    );
    response.code(201).send(task);
  });

  router.put('/:id',async (request, response) => {
    const body = request.body as ITask
    const params = request.params as ITask
    // const params = { title : req.body.title,
    //   order : req.body.order,
    //   description : req.body.description,
    //   userId : req.body.userId,
    //   boardId : req.body.boardId,
    //   columnId : req.body.columnId };
    const task =await tasksService.update(params.id,
      body  );
      response.code(200).send(task);
  });
  router.delete('/:id',async(request, response) => {
    const params = request.params as ITask
   
    await tasksService.remove(params.id);
    response.code(204);
  });
  
}
export default  taskRouter;
