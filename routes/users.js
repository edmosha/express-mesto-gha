const router = require('express').Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
} = require('../conrtollers/users');

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:userId', getUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
