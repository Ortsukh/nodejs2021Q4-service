"use strict";
const DBUsers = [];
const DBBoard = [];
let DBTasks = [];
const getAllUsers = () => DBUsers.slice(0);
const getUser = (id) => DBUsers.filter((user) => user.id === id)[0];
const getIndexUser = (id) => DBUsers.findIndex((el) => el.id === id);
const createUser = (user) => {
    DBUsers.push(user);
    return user;
};
const updateUser = (id, user) => {
    const index = getIndexUser(id);
    if (index === -1) {
        return "not found";
    }
    const userId = DBUsers[index];
    userId.name = user.name;
    userId.login = user.login;
    userId.password = user.password;
    return userId;
};
const deleteUser = (id) => {
    const userIndex = getIndexUser(id);
    if (userIndex > -1) {
        DBUsers.splice(userIndex, 1);
    }
    else {
        throw new Error(`the user with ${id} was not found`);
    }
    DBTasks.forEach((el) => {
        let tmp;
        if (el.userId === id) {
            tmp = el;
            tmp.userId = null;
        }
    });
};
const getAllBoards = () => DBBoard.slice(0);
const getBoard = (id) => DBBoard.filter((el) => el.id === id)[0];
const getIndexBoard = (id) => DBBoard.findIndex((el) => el.id === id);
const createBoard = (board) => {
    DBBoard.push(board);
    return board;
};
const updateBoard = (id, board) => {
    const boardId = getBoard(id);
    boardId.title = board.title;
    boardId.columns = board.columns;
    return boardId;
};
const removeBoard = (id) => {
    const boardIndex = getIndexBoard(id);
    if (boardIndex > -1) {
        DBBoard.splice(boardIndex, 1);
    }
    DBTasks = DBTasks.filter((task) => task.boardId !== id);
};
const getAllTasks = () => DBTasks.slice(0);
const getTask = (id) => DBTasks.filter((el) => el.id === id)[0];
const getIndexTask = (id) => DBTasks.findIndex((el) => el.id === id);
const createTask = (task) => {
    DBTasks.push(task);
    return task;
};
const updateTask = (id, task) => {
    const taskdId = getTask(id);
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
    getTask,
};
