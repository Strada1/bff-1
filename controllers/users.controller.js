const { UserModal } = require('../models/User');

class UsersController {
  async createUser(req, res) {
    try {
      const doc = new UserModal({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      });

      const user = await doc.save();
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
      const user = await UserModal.findOne({ email: req.body.email });

      if (!user) {
        return res.status(404).json({
          message: 'Пользователь не найден',
        });
      }

      if (req.body.password !== user.password) {
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
      });
    }
  }
}

module.exports = new UsersController();
