const jwt = require('jsonwebtoken');
const { createUser, getUser } = require('../services/users.service');
const { decodeToken } = require('../helpers');

class UsersController {
  async createUser(req, res) {
    try {
      const { email, password, username } = req.body;
      const hasUser = await getUser(email);
      if (hasUser) {
        return res.status(201).json({
          message: 'Пользователь с таким Email уже зарегестирован',
        });
      }
      const token = await jwt.sign({ email, password }, process.env.JWT_SECRET);
      const user = await createUser(email, token, username);
      const { __v, ...UserData } = user._doc;

      return res.status(201).json({
        ...UserData,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  }

  async authUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await getUser(email);

      if (!user) {
        return res.status(404).json({
          message: 'Пользователь не найден',
        });
      }
      const { token } = user;
      const decodePassword = await decodeToken(token);

      if (password !== decodePassword.password) {
        return res.status(401).json({
          message: 'Неверный Email или пароль',
        });
      }
      const { __v, ...UserData } = user._doc;
      return res.json({
        ...UserData,
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Не удалось авторизоваться ',
        err,
      });
    }
  }
}

module.exports = new UsersController();
