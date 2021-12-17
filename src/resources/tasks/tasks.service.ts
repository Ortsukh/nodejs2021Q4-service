import tasksRepo from './task.repository';

interface ITask {
    id ?: string,
    title : string,
    order : number,
    description : string,
    userId : string | null,
    boardId : string,
    columnId : string,
  }
 /**
 * Get all tasks
 * @returns all tasks
 */ 
const getAll = () => tasksRepo.getAll();
/**
 * 
 * @param id current task ID
 * @returns task with current ID or string Not Found
 */
const get = (id:string) => tasksRepo.get(id);
/**
 * 
 * @param task new task params
 * @returns new task 
 */
const create = (task:ITask) => tasksRepo.create(task);
/**
 * 
 * @param id current task ID
 * @param task updated task params
 * @returns updated task
 */
const update = (id:string, task:ITask) => tasksRepo.update(id, task);
/**
 * 
 * @param id current task ID
 * @returns string "Not Found" or true
 */
const remove = (id:string) => tasksRepo.remove(id);
export = { getAll, get, create, update, remove };
