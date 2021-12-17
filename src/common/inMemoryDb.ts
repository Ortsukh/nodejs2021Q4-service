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

const DBUsers: ParamsUser[] = [];
const DBBoard: IBoard[] = [];
let DBTasks: ParamsTask[] = [];

/**
 * Get all userd
 * @returns all users
 */
const getAllUsers = () => DBUsers;

/**
 *
 * @param id current user ID
 * @returns number index of DBuser array
 */
const getIndexUser = async (id: string) =>
  DBUsers.findIndex((user) => user.id === id);
/**
 *
 * @param id current user ID
 * @returns user with current ID or error
 */
const getUser = async (id: string) => {
  const index = await getIndexUser(id);
  return DBUsers[index];
};
/**
 *
 * @param user new user params
 * @returns new user
 */
const createUser = async (user: ParamsUser) => {
  DBUsers.push(user);
  return user;
};
/**
 *
 * @param id current user ID
 * @param user updated user params
 * @returns updated user
 */
const updateUser = async (id: string, user: ParamsUser) => {
  const index = await getIndexUser(id);
  if (index === -1) {
    return 'not found';
  }
  const userId = DBUsers[index] as ParamsUser;
  userId.name = user.name;
  userId.login = user.login;
  userId.password = user.password;
  return userId;
};
/**
 *
 * @param id current user ID
 * @returns void
 */
const deleteUser = async (id: string) => {
  const userIndex = await getIndexUser(id);

  if (userIndex > -1) {
    DBUsers.splice(userIndex, 1);
  }
  DBTasks.forEach((el) => {
    let tmp: ParamsTask;
    if (el.userId === id) {
      tmp = el;
      tmp.userId = null;
    }
  });
};
/**
 * Get all boards
 * @returns all boards
 */
const getAllBoards = async () => DBBoard;

/**
 *
 * @param id current board ID
 * @returns number index of DBBoard array
 */
const getIndexBoard = async (id: string) =>
  DBBoard.findIndex((el) => el.id === id);
/**
 *
 * @param id current board ID
 * @returns board with current ID or string not found
 */
const getBoard = async (id: string) => {
  const index = await getIndexBoard(id);
  if (index === -1) return 'not found';
  return DBBoard[index];
};
/**
 *
 * @param board new board params
 * @returns new board
 */
const createBoard = async (board: IBoard) => {
  DBBoard.push(board);
  return board;
};
/**
 *
 * @param id current board ID
 * @param board updated board params
 * @returns updated board
 */
const updateBoard = async (id: string, board: IBoard) => {
  const boardId = (await getBoard(id)) as IBoard;
  boardId.title = board.title;
  boardId.columns = board.columns;
  return boardId;
};
/**
 *
 * @param id current board ID
 * @returns string "Not Found" or true
 */
const removeBoard = async (id: string) => {
  const boardIndex = await getIndexBoard(id);
  if (boardIndex === -1) {
    return 'Not Found';
  }
  DBBoard.splice(boardIndex, 1);
  DBTasks = DBTasks.filter((task) => task.boardId !== id);
  return true;
};
/**
 * Get all tasks
 * @returns all tasks
 */
const getAllTasks = async () => DBTasks.slice(0);
/**
 *
 * @param id current task ID
 * @returns number index of DBTasks array
 */
const getIndexTask = async (id: string) =>
  DBTasks.findIndex((el) => el.id === id);
/**
 *
 * @param id current task ID
 * @returns task with current ID or string Not Found
 */
const getTask = async (id: string) => {
  const index = await getIndexTask(id);
  if (index === -1) return 'Not Found';
  return DBTasks[index];
};
/**
 *
 * @param task new task params
 * @returns new task
 */
const createTask = async (task: ParamsTask) => {
  DBTasks.push(task);
  return task;
};
/**
 *
 * @param id current task ID
 * @param task updated task params
 * @returns updated task
 */
const updateTask = async (id: string, task: ParamsTask) => {
  const taskdId = (await getTask(id)) as ParamsTask;
  taskdId.order = task.order;
  taskdId.description = task.description;
  taskdId.userId = task.userId;
  taskdId.boardId = task.boardId;
  taskdId.columnId = task.columnId;
  taskdId.title = task.title;
  return taskdId;
};
/**
 *
 * @param id current task ID
 * @returns string "Not Found" or true
 */
const removeTask = async (id: string) => {
  const taskIndex = await getIndexTask(id);
  if (taskIndex === -1) {
    return 'Not Found';
  }
  DBTasks.splice(taskIndex, 1);
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
