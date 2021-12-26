import fastify from 'fastify';
import logger from './logger';

import userRouter from './resources/users/user.router';

import boardRouter from './resources/board/board.router';

import taskRouter from './resources/tasks/tasks.router';

const server =  fastify({ logger: true });
// const filePath = "../req.log"


  logger(server)
server.log.debug('Example Debug log');
server.log.warn('Example warn log');

server.register(userRouter, { prefix:'/users' });
server.register(boardRouter, { prefix:'/boards' });
server.register(taskRouter, { prefix:'/boards/:boardId/tasks' });

export = server;
