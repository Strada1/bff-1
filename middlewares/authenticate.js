const loginService = require('../service/auth/loginService');
const jwt = require('jsonwebtoken');
const {getTokenFromHeaders} = require('../service/auth/loginService');

const authenticateToken = async (req, res, next) => {
  try {
    const token = getTokenFromHeaders(req.headers);
    if (!token) {
      return res.status(401).send('Необходимо авторизоваться');
    }
    const {email, password} = jwt.verify(token, process.env.JWT_SECRET);
    if (await loginService.findUser({email, password})) {
      return next();
    }
    return res.status(401).send('Доступ запрещен');
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = authenticateToken;
