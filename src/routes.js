const router = require('express').Router();

const userController = require('./controllers/UserController');

router.get('/', (req, res) => {
  return res.json({ Hello: "World" });
})

// USER
router.post('/users', userController.store);
router.get('/users', userController.index);
router.delete('/users/:id', userController.delete);
router.get('/users/:id', userController.find);
router.patch('/users', userController.update);

// CLEAR MODELS
router.delete('/clear/users', userController.clear);

module.exports = router;