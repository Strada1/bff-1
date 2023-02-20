const loginService = require('../service/auth/loginService');

const login = async (req, res) => {
  try {
    const token = await loginService.findUser(req.body);
    if (!token) {
      return res.status(401).send('Неверный логин или пароль.');
    }
    return res.status(201).json(token);
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  login,
};
