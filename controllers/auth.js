const authService = require('../service/auth/authService');

const authUser = async (req, res) => {
  try {
    const user = await authService.findUser(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  authUser,
};
