import usersRepo from './user.memory.repository';

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
const getAll = () => usersRepo.getAll();
/**
 * 
 * @param id current user ID
 * @returns user with current ID or error
 */
const get = (id:string) => usersRepo.get(id);
/**
 * 
 * @param user new user params
 * @returns new user 
 */
const create = (user:Params) => usersRepo.create(user);
/**
 * 
 * @param id current user ID
 * @param user updated user params
 * @returns updated user
 */
const update = (id:string, user:Params) => usersRepo.update(id, user);
/**
 * 
 * @param id current user ID
 * @returns void
 */
const remove = (id:string) => usersRepo.remove(id);
export default { getAll, get, create, update, remove };
