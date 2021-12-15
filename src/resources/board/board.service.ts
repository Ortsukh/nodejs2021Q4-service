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

const getAll = () => boardRepo.getAll();

const get = (id:string) => boardRepo.get(id);

const create = (board:IBoard) => boardRepo.create(board);

const update = (id:string, board:IBoard) => boardRepo.update(id, board);

const remove = (id:string) => boardRepo.remove(id);

export = { getAll, get, create, update, remove };