// const DB = require('../../common/inMemoryDb.ts');
import DB from '../../common/inMemoryDb';

const getAll = async () => DB.getAllTasks();
interface ITask {
  id ?: string,
  title : string,
  order : number,
  description : string,
  userId : string | null,
  boardId : string,
  columnId : string,
}
const get = async (id:string) => {
  const task = DB.getTask(id);

  if (!task){
    throw new Error(`the task with ${id} was not found`);
  }
  return task;
};

const create = async (task:ITask) => DB.createTask(task);

const update = async (id:string, task:ITask) => DB.updateTask(id, task);

const remove = (id:string) => DB.removeTask(id);

export = { getAll, get, create, update, remove };
