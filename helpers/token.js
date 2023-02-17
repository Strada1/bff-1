const jwt = require("jsonwebtoken");

const createToken = (email, password) => {
    return jwt.sign({ email, password }, process.env.JWT_SECRET);
  }

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
}


module.exports = { createToken, verifyToken }