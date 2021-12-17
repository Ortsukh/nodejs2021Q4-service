import boardRepo from './board.repository';

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
const getAll = () => boardRepo.getAll();
/**
 * 
 * @param id current board ID
 * @returns board with current ID or string Not Found
 */
const get = (id:string) => boardRepo.get(id);
/**
 * 
 * @param board new board params
 * @returns new board 
 */
const create = (board:IBoard) => boardRepo.create(board);
/**
 * 
 * @param id current board ID
 * @param board updated board params
 * @returns updated board
 */
const update = (id:string, board:IBoard) => boardRepo.update(id, board);
/**
 * 
 * @param id current board ID
 * @returns string "not found" or true
 */
const remove = (id:string) => boardRepo.remove(id);

export = { getAll, get, create, update, remove };