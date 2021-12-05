
const Task = require('./tasks.model');
const tasksService = require('./tasks.service');

function taskRouter(router, opt, done) {
  router.get('/', async  (req, res) => {
  const tasks = await tasksService.getAll();
  if (!tasks) {

    res.code(404);

  }
  res.send(tasks);
});


  router.get('/:id', async  (req, res) => {
  try {
  const task = await tasksService.get(req.params.id);
  res.code(200).send(task);
    
} catch (error) {
    res.code(404).send(error.message)
}
});

  router.post('/', async  (req, res) => {

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
  res.code(201).send(task);
})

  router.put('/:id', async  (req, res) => {


  const params = {title : req.body.title,
    order : req.body.order,
    description : req.body.description,
    userId : req.body.userId,
    boardId : req.body.boardId,
    columnId : req.body.columnId,}
  const task = await tasksService.update(req.params.id,
    params  );
   res.code(200).send(task);
 })
  router.delete('/:id', async  (req, res) => {
   
   await tasksService.remove(req.params.id);
  res.code(204);
});
done()
}
module.exports = taskRouter;
