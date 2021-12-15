// const DB = require('../../common/inMemoryDb.ts');
import DB from '../../common/inMemoryDb';

interface Params {
  id?: string;
  name: string;
  login: string;
  password: string;
}

const getAll = async () => DB.getAllUsers();

const get = async (id:string)=> {
  const user = DB.getUser(id);

  if (!user){
    throw new Error(`the user with ${id} was not found`);
  }
  return user;
};

const create = async (user:Params) => DB.createUser(user);

const update = async (id:string, user:Params) => DB.updateUser(id, user);

const remove = (id:string) => DB.deleteUser(id);

export = { getAll, get, create, update, remove };
