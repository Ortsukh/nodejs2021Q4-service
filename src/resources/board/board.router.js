const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
  const board = await boardService.getAll();
  res.json(board);
});

router.route('/:id').get(async (req, res) => {
    try {
        const board = await boardService.get(req.params.id);
        res.status(200).json(board);
    } catch (error) {
        res.status(404).send(error.message)
    }
 
});

router.route('/').post(async (req, res) => {
  const board = await boardService.create(
    new Board({
      title: req.body.title,
      columns: req.body.columns,
    })
  );
  res.status(201).json(board);
});
router.route('/:id').put(async (req, res) => {
  const params = { title: req.body.title, columns: req.body.columns };
  
  const board = await boardService.update(req.params.id, params);
  res.status(200).json(board);
});
router.route('/:id').delete(async (req, res) => {
   
    await boardService.remove(req.params.id);

    res.sendStatus(204);
   
    
});
module.exports = router;
