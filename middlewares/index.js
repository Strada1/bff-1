const { validationResult } = require('express-validator');
const { findOneByToken } = require('../services/userService');
const jwt = require('jsonwebtoken');
const passport = require('../helpers/passport')

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const manualAuthentication = async (req, res, next) => {
  if (req.originalUrl === '/user/create' || req.originalUrl === '/user/auth') {
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

const authentication = (req, res, next) => {
  if (process.env.NODE_ENV === 'test') {
    return passport.authenticate('mock', { session: false })(req, res, next)
  }
  return passport.authenticate('bearer', { session: false })(req, res, next)
}

const authorization = async (req, res, next) => {
  const activeUser = await findOneByToken(req.user.token);
  const isAdmin = activeUser.roles.find(role => role === "admin");

  if (!isAdmin) {
    return res.status(403).send('You do not have permission for this operation');
  }
  next();
}


module.exports = { validate, manualAuthentication, authorization, authentication }