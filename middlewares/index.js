const { validationResult } = require('express-validator');
const { findOneByCondition } = require('../services/userService');

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
  const authheader = req.get('Authorization');

  if (!authheader) {
    return res.status(401).send('You are not authenticated!');
  }

  const auth = authheader.split(' ');
  const email = auth[0];
  const pass = auth[1];

  const user = await findOneByCondition({ email });

  if (!user) {
    return res.status(401).send('This email does not exist');
  }

  if (pass.toString() !== user.password) {
    return res.status(401).send('Password does not match email');
  }
  next();
}


module.exports = { validateMovie, validateDirector, validateCategory, validateComment, validateUser, authentication }