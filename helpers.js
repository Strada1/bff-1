const jwt = require('jsonwebtoken');

const createToken = async (email, password) => {
  await jwt.sign({ email, password }, process.env.JWT_SECRET);
};

const decodeToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = { createToken, decodeToken };
