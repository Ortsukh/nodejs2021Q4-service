// const DB = require('../../common/inMemoryDb.ts');
import DB from '../../common/inMemoryDb';


interface IColumn {
  id: string;
  title: string;
  order: number;
}
 interface IBoard {
  id?: string;
  title: string;
  columns?: IColumn[];
}

const getAll = async () => DB.getAllBoards();

const get = async (id:string) => {
  const board = await DB.getBoard(id);
 
  if (!board){
    throw new Error(`the board with ${id} was not found`);
  }
  return board;
};

const create = async (board:IBoard) => DB.createBoard(board);

const update = async (id:string, board:IBoard) => DB.updateBoard(id, board);

const remove = (id:string) => DB.removeBoard(id);

export = { getAll, get, create, update, remove };
