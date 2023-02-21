const usersService = require('../service/db/usersService');

const login = async (req, res) => {
  try {
    const encodedLogin = req.headers.authorization.split(' ')[1];
    const decodedLogin = Buffer.from(encodedLogin, 'base64').toString();
    const [email, password] = decodedLogin.split(':');
    const token = await usersService.findUser({email, password});
    if (!token) {
      return res.status(401).send('Неверный логин или пароль.');
    }
    return res.status(200).send(token);
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  login,
};
