// const router = require('express').Router();

const User = require('./user.model');
const usersService = require('./user.service');


function userRouter(router, opt, done) {
  router.get('/', async  (req, res) => {

  const users = await usersService.getAll();
  if (!users) {

    res.code(404);

  }
  res.send(users.map(User.toResponse));
});


  router.get('/:id', async  (req, res) => {

  const user = await usersService.get(req.params.id);
  res.code(200).send(User.toResponse(user));
});


  router.post('/', async  (req, res) => {
  
 const user = await usersService.create(
    new User ({
      login: req.body.login,
      password: req.body.login,
      name: req.body.name
    })
  );
  res.code(201).send(User.toResponse(user));
})

  router.put('/:id', async  (req, res) => {

  const params = {login: req.body.login,
    password: req.body.password,
    name: req.body.name}
  const user = await usersService.update(req.params.id,
    params  );
   res.code(200).send(User.toResponse(user));
 })

  router.delete('/:id', async  (req, res) => {

  const users = await usersService.remove(req.params.id);
  res.code(204).send(users);
});
done()
}
module.exports = userRouter;
