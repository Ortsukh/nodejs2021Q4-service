import { FastifyPluginAsync } from 'fastify';

import User from './user.model';

import usersService from './user.service';


interface Params {
  id: string;
  name: string;
  login: string;
  password: string;
}
const userRouter: FastifyPluginAsync = async (router): Promise<void> => {
  router.get('/', async (_, response) => {
    const users = await usersService.getAll();
    if (!users) {
      response.code(404);
    }
    console.log(users);
    
    response.send(users);
  });

  router.get('/:id', async (request, response) => {
    const params = request.params as Params;
    const user = await usersService.get(params.id);
    // const user = request.params as Params
    response.code(200);
    response.send(user);
  });

  router.post('/', async (request, response)=> {

    const {login: loginProps, password: passwordProps, name: nameProps} = request.body as Params
    const user = await usersService.create(
      new User({
        login: loginProps,
        password: passwordProps,
        name: nameProps,
      })
    );
   
    
    
    response.code(201).send(User.toResponse(user));
  });

  router.put('/:id',async (request, response) => {
    const params = request.params as Params;
    const body = request.body as Params
    console.log(params);
    
    const user = await usersService.update(params.id, body);
    response.code(200);
    response.send(user);
  });

  router.delete('/:id', async(request, response) => {
    const params = request.params as Params
    await usersService.remove(params.id);
    response.code(204);
    // response.send(users);
  });
};
export default userRouter;
