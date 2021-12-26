import {fastify,FastifyRequest,FastifyReply}  from 'fastify';
import logger from './logger';

import userRouter from './resources/users/user.router';
import boardRouter from './resources/board/board.router';
import taskRouter from './resources/tasks/tasks.router';
import ApiError from './resources/errors/api-error'

const server =  fastify({ logger: true });

server.setErrorHandler((e: Error, _req: FastifyRequest, res: FastifyReply) => {
    if (e instanceof ApiError) {
      res.status(e.statusCode).send(e);
  }});
  logger(server)
server.log.debug('Example Debug log');
server.log.warn('Example warn log');

server.register(userRouter, { prefix:'/users' });
server.register(boardRouter, { prefix:'/boards' });
server.register(taskRouter, { prefix:'/boards/:boardId/tasks' });

export = server;
