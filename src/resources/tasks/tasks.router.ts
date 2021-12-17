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

/**
 *
 * @param router module of fastify
 * return void
 */
const taskRouter: FastifyPluginAsync = async (router): Promise<void> => {
 /**
   *Get all tasks
   * @returns send all tasks and status code
   */
  router.get('/',async (_, response) => {
    const tasks = await tasksService.getAll();
    if (!tasks) {
      response.code(404);
    }
    response.send(tasks);
  });
  /**
   *Get task for ID
   *@param params.id - current task id
   *@return return task with current id and status code or string Not Found with code
   */
  router.get('/:id', async(request, response) => {
    const params = request.params as ITask
    try {
      const task =await tasksService.get(params.id);
      response.code(200).send(task);
    
    } catch (error) {
      response.code(404).send("Not Found")
    }
  });
/**
   * Create new task
   * @params .body - pararams of new task
   * @param params.boardId - current board id
   * @returns status task, task without password
   */
  router.post('/', async(request, response) => {
    const body = request.body as ITask
    const params = request.params as ITask


    const task =await tasksService.create(
   
      new Task({
      
        title : body.title,
        order : body.order,
        description : body.description,
        userId : body.userId,
        boardId : params.boardId,
        columnId : body.columnId,
      }),
    );
    response.code(201).send(task);
  });
/**
   * Update Task
   * @params .body - pararams of Task
   * @param params.id - current Task id
   * @returns status code and updated Task
   *
   */
  router.put('/:id',async (request, response) => {
    const body = request.body as ITask
    const params = request.params as ITask
    const task =await tasksService.update(params.id,
      body  );
      response.code(200).send(task);
  });
  /**
   * Delete Task
   * @param params.id - current Task id
   * @returns status code or string Not Found with code
   */
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
