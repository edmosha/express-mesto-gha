const { createUser } = require('../conrtollers/users');
const {celebrate, Joi} = require('celebrate');
const router = require('express').Router();

router.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
  }),
}), createUser);

module.exports = router;
