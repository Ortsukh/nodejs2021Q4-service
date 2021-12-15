const DB = require("../../common/inMemoryDb");

const getAll = async () => DB.getAllTasks();

const get = async id => {
 const task = await DB.getTask(id);

 if(!task){
   throw new Error(`the task with ${id} was not found`)
 }
 return task;
}

const create = async task => DB.createTask(task);

const update = async (id, task) => DB.updateTask(id, task)

const remove = id => DB.removeTask(id);

module.exports = { getAll, get, create, update, remove};
