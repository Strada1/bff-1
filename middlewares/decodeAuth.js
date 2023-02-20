const authService = require('../service/auth/loginService');

const decodeAuth = (req, res, next) => {
  const encodedLogin = req.headers.authorization.split(' ')[1];
  const decodedLogin = Buffer.from(encodedLogin, 'base64').toString();
  const [email, password] = decodedLogin.split(':');
  authService.findUser({email, password});
  next();
};

module.exports = decodeAuth;
