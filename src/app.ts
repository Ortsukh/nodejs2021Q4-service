import { fastify, FastifyRequest, FastifyReply } from 'fastify';
import logger from './logger';

import userRouter from './resources/users/user.router';
import boardRouter from './resources/board/board.router';
import taskRouter from './resources/tasks/tasks.router';
import loginRouter from './resources/login/login.router';
import ApiError from './resources/errors/api-error';
import checkAuth from './common/checkauth';

const server = fastify({ logger: true });
server.addHook('onRequest', async (req, res) => {
  const { url } = req;
  if (url !== '/' && url !== '/doc' && url !== '/login') {
    const isAuth = await checkAuth(req);
    if (isAuth) res.send(isAuth);
  }
});
server.setErrorHandler((e: Error, _req: FastifyRequest, res: FastifyReply) => {
  if (e instanceof ApiError) {
    res.status(e.statusCode).send(e);
  }
  res.status(500);
});
logger(server);

server.register(userRouter, { prefix: '/users' });
server.register(boardRouter, { prefix: '/boards' });
server.register(taskRouter, { prefix: '/boards/:boardId/tasks' });
server.register(loginRouter, { prefix: '/login' });

export = server;
