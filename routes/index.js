const router = require('express').Router();
const users = require('./users');
const cards = require('./cards');

const NOT_FOUND = 404;

router.use((req, res, next) => {
  req.user = {
    _id: '646e53e0289c0631a4c0985a',
  };
  next();
});

router.use('/users', users);
router.use('/cards', cards);
router.use('/*', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Ошибка 404. Запрашиваемый ресурс не найден' });
});

module.exports = router;
