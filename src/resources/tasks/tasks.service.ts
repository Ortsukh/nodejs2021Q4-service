// const tasksRepo = require('./task.repository.ts');
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
const getAll = () => tasksRepo.getAll();

const get = (id:string) => tasksRepo.get(id);

const create = (task:ITask) => tasksRepo.create(task);

const update = (id:string, task:ITask) => tasksRepo.update(id, task);

const remove = (id:string) => tasksRepo.remove(id);
export = { getAll, get, create, update, remove };
