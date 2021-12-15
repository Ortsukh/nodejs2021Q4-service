import fastify from 'fastify';

import userRouter from './resources/users/user.router';

import boardRouter from './resources/board/board.router';

import taskRouter from './resources/tasks/tasks.router';

const server =  fastify({ logger: true });

// server.get('/', (req, res, next) => {
//   if (req.originalUrl === '/') {
//     res.send('Service is running!');
//     return;
//   }
//   next();
// });

server.register(userRouter, { prefix:'/users' });
server.register(boardRouter, { prefix:'/boards' });
server.register(taskRouter, { prefix:'/boards/:boardId/tasks' });

export = server;
