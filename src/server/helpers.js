const jwt = require("jsonwebtoken");

const checkToken = (req) => {
  const token = req.headers.authorization;
  if (!token) return false;
  return jwt.verify(token, process.env.JWT_SECRET);
}

const createToken = async (email, password) => {
  return await jwt.sign({ email, password }, process.env.JWT_SECRET);
}

module.exports = { checkToken, createToken }