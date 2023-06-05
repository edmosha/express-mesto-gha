const { login } = require('../conrtollers/users');
const {celebrate, Joi} = require('celebrate');
const router = require('express').Router();

router.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

module.exports = router;
