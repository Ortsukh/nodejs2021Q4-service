"use strict";
const DBUsers = [];
const DBBoard = [];
let DBTasks = [];
const getAllUsers = () => DBUsers;
const getIndexUser = async (id) => DBUsers.findIndex((user) => user.id === id);
const getUser = async (id) => {
    const index = await getIndexUser(id);
    // DBUsers.filter((user) => user.id === id)[0];
    return DBUsers[index];
};
const createUser = async (user) => {
    console.log(user);
    DBUsers.push(user);
    return user;
};
const updateUser = async (id, user) => {
    const index = await getIndexUser(id);
    if (index === -1) {
        return "not found";
    }
    const userId = DBUsers[index];
    userId.name = user.name;
    userId.login = user.login;
    userId.password = user.password;
    return userId;
};
const deleteUser = async (id) => {
    const userIndex = await getIndexUser(id);
    if (userIndex > -1) {
        DBUsers.splice(userIndex, 1);
    }
    DBTasks.forEach((el) => {
        let tmp;
        if (el.userId === id) {
            tmp = el;
            tmp.userId = null;
        }
    });
};
const getAllBoards = async () => DBBoard;
// const getBoard =  async(id:string) => DBBoard.filter((el) => el.id === id)[0];
const getIndexBoard = async (id) => DBBoard.findIndex((el) => el.id === id);
const getBoard = async (id) => {
    const index = await getIndexBoard(id);
    console.log(index);
    if (index === -1)
        return "not found";
    return DBBoard[index];
};
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
    if (boardIndex === -1) {
        return "Not Found";
    }
    DBBoard.splice(boardIndex, 1);
    DBTasks = DBTasks.filter((task) => task.boardId !== id);
    return true;
};
const getAllTasks = async () => DBTasks.slice(0);
const getIndexTask = async (id) => DBTasks.findIndex((el) => el.id === id);
const getTask = async (id) => {
    const index = await getIndexTask(id);
    if (index === -1)
        return "Not Found";
    return DBTasks[index];
};
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
    if (taskIndex === -1) {
        return "Not Found";
    }
    DBTasks.splice(taskIndex, 1);
    return true;
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
    getTask,
};
