const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.get(req.params.id);
  res.status(200).json(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
  
 const user = await usersService.create(
    new User ({
      login: req.body.login,
      password: req.body.login,
      name: req.body.name
    })
  );
  res.status(201).json(User.toResponse(user));
})
router.route('/:id').put(async (req, res) => {
  const params = {login: req.body.login,
    password: req.body.password,
    name: req.body.name}
  const user = await usersService.update(req.params.id,
    params  );
   res.status(200).json(User.toResponse(user));
 })
 router.route('/:id').delete(async (req, res) => {
  const users = await usersService.remove(req.params.id);
  res.status(204).json(users);
});
module.exports = router;
