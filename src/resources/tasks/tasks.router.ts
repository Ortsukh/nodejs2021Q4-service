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
      response.code(404).send("Not Found")
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
    const task =await tasksService.update(params.id,
      body  );
      response.code(200).send(task);
  });
  router.delete('/:id',async(request, response) => {
    const params = request.params as ITask
   
   const result = await tasksService.remove(params.id);
    if (typeof result === 'string') {
      response.code(404);
      response.send(result);
    }else {response.code(204);}
    
  });
  
}
export default  taskRouter;
