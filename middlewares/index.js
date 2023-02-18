const { validationResult } = require('express-validator');
const { findOneByToken } = require('../services/userService');
const jwt = require('jsonwebtoken');


const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};


const authentication = async (req, res, next) => {

  if (req.originalUrl === '/user/create' || req.originalUrl ==='/user/auth') {
    return next();
  }

  const token = req.get('Authorization');
  if (!token) {
    return res.status(401).send('You are not authenticated!');
  }

  const user = await findOneByToken({ token });

  if (!user) {
    return res.status(401).send('This token does not exist');
  }

  next();
}


module.exports = { validate, authentication }