const jwt = require('jsonwebtoken');

const generateAccessToken = async ({email, password}) => {
  const token = await jwt.sign({email, password}, process.env.JWT_SECRET);
  return token;
};

module.exports = {generateAccessToken};
