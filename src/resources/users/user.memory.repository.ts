// const DB = require('../../common/inMemoryDb.ts');
import DB from '../../common/inMemoryDb';

interface Params {
  id?: string;
  name: string;
  login: string;
  password: string;
}
/**
 * Get all userd
 * @returns all users
 */
const getAll = async () => DB.getAllUsers();
/**
 *
 * @param id current user ID
 * @returns user with current ID or error
 */
const get = async (id: string) => {
  const user = DB.getUser(id);

  if (!user) {
    throw new Error(`the user with ${id} was not found`);
  }
  return user;
};
/**
 *
 * @param user new user params
 * @returns new user
 */
const create = async (user: Params) => DB.createUser(user);
/**
 *
 * @param id current user ID
 * @param user updated user params
 * @returns updated user
 */
const update = async (id: string, user: Params) => DB.updateUser(id, user);
/**
 *
 * @param id current user ID
 * @returns string "not found" or true
 */
const remove = (id: string) => DB.deleteUser(id);

export = { getAll, get, create, update, remove };
