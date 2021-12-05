const fastify = require('fastify')({
  logger: true
})
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/board/board.router');
const taskRouter = require('./resources/tasks/tasks.router');

fastify.get('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
  })

  fastify.register(userRouter, {prefix:'/users'});
  fastify.register(boardRouter, {prefix:'/boards'});
  fastify.register(taskRouter, {prefix:'/boards/:boardId/tasks'});


module.exports = fastify;
