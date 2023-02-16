const { validationResult } = require('express-validator');
const { findOneByToken } = require('../services/userService');
const jwt = require('jsonwebtoken');

const validateMovie = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

const validateDirector = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

const validateCategory = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
}

const validateComment = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
}

const validateUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};


const authentication = async (req, res, next) => {
  const authToken = req.get('Authorization');

  if (!authToken) {
    return res.status(401).send('You are not authenticated!');
  }

  const user = await findOneByToken({ authToken });

  if (!user) {
    return res.status(401).send('This token does not exist');
  }

  next();
}


module.exports = { validateMovie, validateDirector, validateCategory, validateComment, validateUser, authentication }