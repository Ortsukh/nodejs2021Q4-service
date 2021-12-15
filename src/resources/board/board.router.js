const Board = require('./board.model');
const boardService = require('./board.service');

function boardRouter(router, opt, done) {
  router.get('/', async  (req, res) => {

  const board = await boardService.getAll();
  if (!board) {

    res.code(404);

  }
  res.send(board);
});

  router.get('/:id', async  (req, res) => {

    try {
        const board = await boardService.get(req.params.id);
        res.code(200).send(board);
    } catch (error) {
        res.code(404).send(error.message)
    }
 
});

  router.post('/', async  (req, res) => {

  const board = await boardService.create(
    new Board({
      title: req.body.title,
      columns: req.body.columns,
    })
  );
  res.code(201).send(board);
});

  router.put('/:id', async  (req, res) => {

  const params = { title: req.body.title, columns: req.body.columns };
  
  const board = await boardService.update(req.params.id, params);
  res.code(200).send(board);
});

  router.delete('/:id', async  (req, res) => {
   
    await boardService.remove(req.params.id);

    res.code(204);  
});
done()
}
module.exports = boardRouter;
