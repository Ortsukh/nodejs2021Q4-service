const router = require('express').Router({mergeParams: true});
const Task = require('./tasks.model');
const tasksService = require('./tasks.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll();
  res.json(tasks);
});

router.route('/:id').get(async (req, res) => {
  try {
  const task = await tasksService.get(req.params.id);
  res.status(200).json(task);
    
} catch (error) {
    res.status(404).send(error.message)
}
});

router.route('/').post(async (req, res) => {

 const task = await tasksService.create(
   
    new Task ({
      
      title : req.body.title,
      order : req.body.order,
      description : req.body.description,
      userId : req.body.userId,
      boardId : req.params.boardId,
      columnId : req.body.columnId,
    })
  );
  res.status(201).json(task);
})
router.route('/:id').put(async (req, res) => {
  const params = {title : req.body.title,
    order : req.body.order,
    description : req.body.description,
    userId : req.body.userId,
    boardId : req.body.boardId,
    columnId : req.body.columnId,}
  const task = await tasksService.update(req.params.id,
    params  );
   res.status(200).json(task);
 })
 router.route('/:id').delete(async (req, res) => {
   await tasksService.remove(req.params.id);
  res.sendStatus(204);
});
module.exports = router;
