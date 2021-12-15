

interface ParamsUser {
  id?: string;
  name: string;
  login: string;
  password: string;
}
interface ParamsTask {
  id ?: string,
  title : string,
  order : number,
  description ?: string,
  userId : string | null,
  boardId : string,
  columnId : string,
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

const DBUsers:ParamsUser[] = []
const DBBoard:IBoard[] = [];
let DBTasks:ParamsTask[] = [];
 
const getAllUsers = () => DBUsers;



const getIndexUser = async (id:string) => DBUsers.findIndex((user) => user.id === id);
const getUser = async (id:string) =>{
  const index = await getIndexUser(id)
  // DBUsers.filter((user) => user.id === id)[0];
  return DBUsers[index]
} 
const createUser = async  (user:ParamsUser) => {
  console.log(user);
  
  DBUsers.push(user);
  return user;
};

const updateUser = async (id:string, user:ParamsUser) => {
  const index = await getIndexUser(id)
  if(index === -1){
    return "not found"
  }
  const userId =  DBUsers[index] as ParamsUser;
  userId.name = user.name;
  userId.login = user.login;
  userId.password = user.password;
  return userId;
};

const deleteUser = async (id:string) => {
  const userIndex = await getIndexUser(id);

  if (userIndex > -1) {
    DBUsers.splice(userIndex, 1);
  } 
  DBTasks.forEach((el) => {
    let tmp:ParamsTask ;
    if (el.userId === id) {
      tmp = el;
      tmp.userId = null;
    }
  });
  
};
const getAllBoards =  async () => DBBoard;

// const getBoard =  async(id:string) => DBBoard.filter((el) => el.id === id)[0];

const getIndexBoard = async (id:string) => DBBoard.findIndex((el) => el.id === id);
const getBoard = async (id:string) =>{
  const index = await getIndexBoard(id)
  console.log(index);
  
  if(index === -1) return "not found"
  return DBBoard[index]
} 
const createBoard =  async(board:IBoard) => {

  DBBoard.push(board);
  return board;
};

const updateBoard =  async(id:string, board:IBoard) => {
  const boardId = await getBoard(id) as IBoard;
  boardId.title = board.title;
  boardId.columns = board.columns;
  return boardId;
};

const removeBoard = async (id:string) => {
  const boardIndex = await getIndexBoard(id);
  if(boardIndex === -1){
    return "Not Found"
  }
  
  DBBoard.splice(boardIndex, 1);
  
  
  
  DBTasks = DBTasks.filter((task) => task.boardId !== id);
  return true

};
const getAllTasks =  async() => DBTasks.slice(0);



const getIndexTask = async (id:string) => DBTasks.findIndex((el) => el.id === id);
const getTask = async  (id:string) =>{
 
    const index = await getIndexTask(id)
    if(index === -1) return "Not Found"
   
    return DBTasks[index]
  
} 
const createTask = async (task:ParamsTask) => {
  DBTasks.push(task);
  return task;
};

const updateTask = async (id:string, task:ParamsTask) => {
  const taskdId = await getTask(id) as ParamsTask;
  taskdId.order = task.order;
  taskdId.description = task.description;
  taskdId.userId = task.userId;
  taskdId.boardId = task.boardId;
  taskdId.columnId = task.columnId;
  taskdId.title = task.title;

  return taskdId;
};

const removeTask = async  (id:string) => {
  const taskIndex = await getIndexTask(id);
  if(taskIndex === -1){
    return "Not Found"
  }
    DBTasks.splice(taskIndex, 1);
    return true
  

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
