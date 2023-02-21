const jwt = require('jsonwebtoken');
const usersService = require('../service/db/usersService');

const authenticateToken = async (req, res, next) => {
  try {
    const token = getTokenFromHeaders(req.headers);
    if (!token) return res.status(401).send('Необходимо авторизоваться1');
    const {email, password} = jwt.verify(token, process.env.JWT_SECRET);
    const user = await usersService.findUser({email, password});
    const {password: decodedPassword} = jwt.verify(user.token, process.env.JWT_SECRET);
    if (decodedPassword !== password) {
      return res.status(401).send('Необходимо авторизоваться2');
    }
    next();
  } catch (error) {
    return res.status(500).send(error);
  }
};

const generateAccessToken = async ({email, password}) => {
  const token = await jwt.sign({email, password}, process.env.JWT_SECRET);
  return token;
};

const getTokenFromHeaders = (headers) => {
  const authHeader = headers['authorization'];
  const token = authHeader?.split(' ')[1];
  return token;
};

module.exports = {authenticateToken, generateAccessToken};
