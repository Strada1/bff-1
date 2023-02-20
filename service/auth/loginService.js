const jwt = require('jsonwebtoken');
const Users = require('../../models/Users');

const findUser = async ({email, password}) => {
  const user = await Users.findOne({
    email: email,
  });
  const token = user?.token;
  const userDecoded = jwt.verify(token, process.env.JWT_SECRET);
  if (userDecoded.password !== password) {
    return null;
  }
  return user?.token;
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

module.exports = {findUser, generateAccessToken, getTokenFromHeaders};
