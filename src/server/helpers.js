const jwt = require("jsonwebtoken");

const createToken = async (email, password) => {
  return await jwt.sign({ email, password }, process.env.JWT_SECRET);
}

module.exports = { createToken }