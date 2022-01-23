import { getRepository } from 'typeorm';

import dotenv from 'dotenv';
import path from 'path';
import ApiError from '../resources/errors/api-error';
import UserEntity from '../entities/user-entity';
import BoardEntity from '../entities/board-entity';
import TaskEntity from '../entities/task-entity';
// import ormConfig from '../common/orm-config';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});
interface ParamsUser {
  id?: string;
  name: string;
  login: string;
  password: string;
}
interface ParamsTask {
  id?: string;
  title: string;
  order: number;
  description?: string;
  userId: string | null;
  boardId: string;
  columnId: string;
}
interface IColumn {
  id?: string;
  title: string;
  order: number;
}
interface IBoard {
  id?: string;
  title: string;
  columns?: IColumn[] | [];
}

// const DBUsers: ParamsUser[] = [];
// const DBBoard: IBoard[] = [];
// const DBTasks: ParamsTask[] = [];

// const getRepository = <T extends BaseEntity>(
//   entity: EntityTarget<T>
// ): Repository<T> => {

  
//   const repo = getRepositorysitory(entity);
//   return repo;
// };
/**
 * Get all userd
 * @returns all users
 */
// const getAllUsers = () => DBUsers;
const getAllUsers = () => {
  const repo = getRepository(UserEntity);
  const users = repo.find({ where: {} });
  return users;
};

/**
 *
 * @param id current user ID
 * @returns user with current ID or error
 */
const getUser = async (id: string) => {
  // const index = await getIndexUser(id);
  // if (index === -1) {
  //   throw new ApiError(404, `the user with id:${id} was not found`);
  // }

  // return DBUsers[index];
  const repo = getRepository(UserEntity);

  const resultUser: ParamsUser | undefined = await repo.findOne(id);
  if (!resultUser) {
    throw new ApiError(404, `the user with id:${id} was not found`);
  }

  return resultUser;
};
/**
 *
 * @param user new user params
 * @returns new user
 */
const createUser = async (user: ParamsUser) => {
  // DBUsers.push(user);
  // return user;
  console.log(UserEntity);
  
  const repo = getRepository(UserEntity);
console.log(repo);

  const newUser = repo.create(user);

  await repo.save(newUser);
  return user;
};
/**
 *
 * @param id current user ID
 * @param user updated user params
 * @returns updated user
 */
const updateUser = async (id: string, newUser: ParamsUser) => {
  // const index = await getIndexUser(id);
  // if (index === -1) {
  //   throw new ApiError(404, `the board with id:${id} was not found`);
  // }
  // const userId = DBUsers[index] as ParamsUser;
  // userId.name = user.name;
  // userId.login = user.login;
  // userId.password = user.password;
  // return userId;
  const repo = getRepository(UserEntity);

  const resultUser: ParamsUser | undefined = await repo.findOne(id);
  if (!resultUser) {
    throw new ApiError(404, `the board with id:${id} was not found`);
  }
  await repo.update(id, newUser);

  const updatedUser = await repo.findOne(id);

  return updatedUser;
};
/**
 *
 * @param id current user ID
 * @returns void
 */
const deleteUser = async (id: string) => {
  // const userIndex = await getIndexUser(id);

  // if (userIndex > -1) {
  //   DBUsers.splice(userIndex, 1);
  // }
  // DBTasks.forEach((el) => {
  //   let tmp: ParamsTask;
  //   if (el.userId === id) {
  //     tmp = el;
  //     tmp.userId = null;
  //   }
  // });
  const repo = getRepository(UserEntity);

  const resultUser: ParamsUser | undefined = await repo.findOne(id);
  if (!resultUser) {
    throw new ApiError(404, `the board with id:${id} was not found`);
  }

  await repo.delete(id);
  const repoTask = getRepository(TaskEntity);
  await repoTask.update({ userId: id }, { userId: null });
  return true;
};
/**
 * Get all boards
 * @returns all boards
 */
// const getAllBoards = async () => DBBoard;
const getAllBoards = async () => {
  const repo = getRepository(BoardEntity);
  const boards = repo.find({ relations: ['columns'] });
  return boards;
};
/**
 *
 * @param id current board ID
 * @returns number index of DBBoard array
 */
// const getIndexBoard = async (id: string) =>
//   DBBoard.findIndex((el) => el.id === id);
/**
 *
 * @param id current board ID
 * @returns board with current ID or string not found
 */
const getBoard = async (id: string) => {
  // const index = await getIndexBoard(id);
  const repo = getRepository(BoardEntity);

  const resultBoard = await repo.findOne(id, { relations: ['columns'] });
  if (!resultBoard) {
    throw new ApiError(404, `the board with id:${id} was not found`);
  }
  return resultBoard;
};
/**
 *
 * @param board new board params
 * @returns new board
 */
const createBoard = async (board: IBoard) => {
  // DBBoard.push(board);
  // return board;
  const repo = getRepository(BoardEntity);

  await repo.save(board);

  return board;
};
/**
 *
 * @param id current board ID
 * @param board updated board params
 * @returns updated board
 */
const updateBoard = async (id: string, newBoard: IBoard) => {
  // const boardId = (await getBoard(id)) as IBoard;
  // boardId.title = board.title;
  // boardId.columns = board.columns;
  // return boardId;
  const repo = getRepository(BoardEntity);

  const resultBoard = await repo.findOne(id);
  if (!resultBoard) {
    throw new ApiError(404, `the board with id:${id} was not found`);
  }
  const updatedBoard = { ...resultBoard, ...newBoard };
  await repo.save(updatedBoard);
  const savedBoard = await repo.findOne(id, { relations: ['columns'] });
  return savedBoard;
};
/**
 *
 * @param id current board ID
 * @returns string "Not Found" or true
 */
const removeBoard = async (id: string) => {
  // const boardIndex = await getIndexBoard(id);
  // if (boardIndex === -1) {
  //   throw new ApiError(404, `the board with id:${id} was not found`);
  // }
  // DBBoard.splice(boardIndex, 1);
  // DBTasks = DBTasks.filter((task) => task.boardId !== id);
  // return true;
  const repo = getRepository(BoardEntity);
  const resultBoard = await repo.findOne(id);
  if (!resultBoard) {
    throw new ApiError(404, `the board with id:${id} was not found`);
  }
  await repo.delete(id);
  const repoTask = getRepository(TaskEntity);

  await repoTask.delete({ boardId: id });

  return true;
};
/**
 * Get all tasks
 * @returns all tasks
 */
// const getAllTasks = async () => DBTasks.slice(0);
const getAllTasks = async (boardId: string) => {
  const repo = getRepository(TaskEntity);

  const resultTasks = await repo.find({ boardId });

  return resultTasks.length === 0 ? null : resultTasks;
};
/**
 *
 * @param id current task ID
 * @returns number index of DBTasks array
 */
// const getIndexTask = async (id: string) =>
//   DBTasks.findIndex((el) => el.id === id);
/**
 *
 * @param id current task ID
 * @returns task with current ID or string Not Found
 */
const getTask = async (taskId: string) => {
  // const index = await getIndexTask(id);
  // if (index === -1) {
  //   throw new ApiError(404, `the task with id:${id} was not found`);

  // }
  // return DBTasks[index];
  const repo = getRepository(TaskEntity);

  const resultTasks = await repo.findOne({ id: taskId });
  if (!resultTasks) {
    throw new ApiError(404, `the task with id:${taskId} was not found`);
  }

  return resultTasks;
};
/**
 *
 * @param task new task params
 * @returns new task
 */
const createTask = async (task: ParamsTask) => {
  // DBTasks.push(task);
  // return task;
  const repo = getRepository(TaskEntity);

  const newTask = repo.create(task);

  await repo.save(newTask);

  return task;
};
/**
 *
 * @param id current task ID
 * @param task updated task params
 * @returns updated task
 */
const updateTask = async (
  boardId: string,
  taskId: string,
  newTask: ParamsTask
) => {
  // const taskdId = (await getTask(id)) as ParamsTask;
  // taskdId.order = task.order;
  // taskdId.description = task.description;
  // taskdId.userId = task.userId;
  // taskdId.boardId = task.boardId;
  // taskdId.columnId = task.columnId;
  // taskdId.title = task.title;
  // return taskdId;
  const repo = getRepository(TaskEntity);

  const resultTask = await repo.findOne({
    boardId,
    id: taskId,
  });
  if (!resultTask) {
    throw new ApiError(404, `the task with id:${taskId} was not found`);
  }

  await repo.update(resultTask.id, newTask);

  const updatedTask = await repo.findOne({ boardId, id: taskId });

  return updatedTask;
};
/**
 *
 * @param id current task ID
 * @returns string "Not Found" or true
 */
const removeTask = async (taskId: string) => {
  // const taskIndex = await getIndexTask(id);
  // if (taskIndex === -1) {
  //   throw new ApiError(404, `the task with id:${id} was not found`);

  // }
  // DBTasks.splice(taskIndex, 1);
  const repo = getRepository(TaskEntity);
  const resultTask = await repo.findOne({ id: taskId });
  if (!resultTask) {
    throw new ApiError(404, `the task with id:${taskId} was not found`);
  }
  await repo.delete({ id: taskId });
  return true;
};

export = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getAllBoards,
  createBoard,
  updateBoard,
  removeBoard,
  getBoard,
  getAllTasks,
  createTask,
  updateTask,
  removeTask,
  getTask,
};
