import usersRepo from './user.memory.repository';

interface Params {
    id?: string;
    name: string;
    login: string;
    password: string;
  }

const getAll = ()=> usersRepo.getAll();

const get = (id:string) => usersRepo.get(id);

const create = (user:Params) => usersRepo.create(user);

const update = (id:string, user:Params) => usersRepo.update(id, user);

const remove = (id:string) => usersRepo.remove(id);
export default { getAll, get, create, update, remove };
