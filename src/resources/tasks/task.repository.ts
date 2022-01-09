import DB from '../../common/inMemoryDb';

interface ITask {
  id?: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string;
}
/**
 * Get all tasks
 * @returns all tasks
 */
const getAll = async () => DB.getAllTasks();
/**
 *
 * @param id current task ID
 * @returns task with current ID or error
 */
const get = async (id: string) => {
  const task = await DB.getTask(id);
  return task;
};
/**
 *
 * @param task new task params
 * @returns new task
 */

const create = async (task: ITask) => DB.createTask(task);
/**
 *
 * @param id current task ID
 * @param task updated task params
 * @returns updated task
 */
const update = async (id: string, task: ITask) => DB.updateTask(id, task);
/**
 *
 * @param id current task ID
 * @returns string "Not Found" or true
 */
const remove = (id: string) => DB.removeTask(id);

export = { getAll, get, create, update, remove };
