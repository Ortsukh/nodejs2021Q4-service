const DBUsers = [];
const DBBoard = [];
let DBTasks = [];

const getAllUsers = async () => DBUsers.slice(0);

const getUser = async (id) => DBUsers.filter((el) => el.id === id)[0];

const getIndexUser = async (id) => DBUsers.findIndex((el) => el.id === id);

const createUser = async (user) => {
    DBUsers.push(user);
    return user;
};

const updateUser = async (id, user) => {
    const userId = await getUser(id);
    userId.name = user.name;
    userId.login = user.login;
    userId.password = user.password;
    return userId;
};

const deleteUser = async (id) => {
    const userIndex = await getIndexUser(id);

    if (userIndex > -1) {
        DBUsers.splice(userIndex, 1);
    } else {
        throw new Error(`the user with ${id} was not found`);
    }
    DBTasks.forEach(el => {
        let tmp
        if (el.userId === id) {
            tmp = el;
            tmp.userId = null;
        }
    })
};
const getAllBoards = async () => DBBoard.slice(0);

const getBoard = async (id) => DBBoard.filter((el) => el.id === id)[0];

const getIndexBoard = async (id) => DBBoard.findIndex((el) => el.id === id);

const createBoard = async (board) => {

    DBBoard.push(board);
    return board;
};

const updateBoard = async (id, board) => {
    const boardId = await getBoard(id);
    boardId.title = board.title;
    boardId.columns = board.columns;
    return boardId;
};

const removeBoard = async (id) => {
    const boardIndex = await getIndexBoard(id);

    if (boardIndex > -1) {
        DBBoard.splice(boardIndex, 1);
    }

    DBTasks = DBTasks.filter(task => task.boardId !== id);

};
const getAllTasks = async () => DBTasks.slice(0);

const getTask = async (id) => DBTasks.filter((el) => el.id === id)[0];

const getIndexTask = async (id) => DBTasks.findIndex((el) => el.id === id);

const createTask = async (task) => {
    DBTasks.push(task);
    return task;
};

const updateTask = async (id, task) => {
    const taskdId = await getTask(id);
    taskdId.order = task.order;
    taskdId.description = task.description;
    taskdId.userId = task.userId;
    taskdId.boardId = task.boardId;
    taskdId.columnId = task.columnId;
    taskdId.title = task.title;

    return taskdId;
};

const removeTask = async (id) => {
    const taskIndex = await getIndexTask(id);

    if (taskIndex > -1) {
        DBTasks.splice(taskIndex, 1);
    }

};


module.exports = {
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
    getTask
};
