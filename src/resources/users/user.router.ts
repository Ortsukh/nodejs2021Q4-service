import { FastifyPluginAsync } from 'fastify';

import bcrypt from 'bcrypt';
import User from './user.model';

import usersService from './user.service';


interface Params {
  id: string;
  name: string;
  login: string;
  password: string;
}

/**
 *
 * @param router module of fastify
 * return void
 */
const userRouter: FastifyPluginAsync = async (router): Promise<void> => {
  /**
   *Get all users
   * @returns send all users and status code
   */
  router.get('/', async (_, response) => {
    const users = await usersService.getAll();
    response.send(users);
  });

  /**
   *Get user for ID
   *@param params.id - current user id
   *@return return user with current id and status code
   */
  router.get('/:id', async (request, response) => {
    const params = request.params as Params;

    try{
    const user = await usersService.get(params.id);
    response.code(200);
    response.send(user);
  }
    catch(error){
      response.code(404).send("Not Found");
    }
   
  });

  /**
   * Create new User
   * @params .body - pararams of new user
   * @returns status code, user without password
   */
  router.post('/', async (request, response) => {
    const {
      login: loginProps,
      password: passwordProps,
      name: nameProps,
    } = request.body as Params;
    const hashPassword = await bcrypt.hash(passwordProps, 3);

    /**
     * add new user
     * @returns new user
     */
    const user = await usersService.create(


      new User({
        login: loginProps,
        password: hashPassword,
        name: nameProps,
      })
    );
    response.code(201).send(User.toResponse(user));
  });

  /**
   * Update user
   * @params .body - pararams of user
   * @param params.id - current user id
   * @returns status code and updated user
   *
   */
  router.put('/:id', async (request, response) => {
    const params = request.params as Params;
    const body = request.body as Params;

    const user = await usersService.update(params.id, body);
    response.code(200);
    response.send(user);
  });
  /**
   * Delete User
   * @param params.id - current user id
   * @returns status code
   */
  router.delete('/:id', async (request, response) => {
    const params = request.params as Params;
    await usersService.remove(params.id);
    response.code(204);
  });
};
export default userRouter;
