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
/**
 * Get all boards
 * @returns all boards
 */
const getAll = async () => DB.getAllBoards();
/**
 * 
 * @param id current board ID
 * @returns board with current ID or error
 */
const get = async (id:string) => {
  const board = await DB.getBoard(id);
  if (board === "not found"){
    throw new Error(`the board with ${id} was not found`);
  }
  return board;
};
/**
 * 
 * @param board new board params
 * @returns new board 
 */
const create = async (board:IBoard) => DB.createBoard(board);
/**
 * 
 * @param id current board ID
 * @param board updated board params
 * @returns updated board
 */
const update = async (id:string, board:IBoard) => DB.updateBoard(id, board);
/**
 * 
 * @param id current board ID
 * @returns string "not found" or true
 */
const remove = (id:string) => DB.removeBoard(id);

export = { getAll, get, create, update, remove };
