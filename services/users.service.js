const { UserModal } = require('../models/User');

const USER_ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
};
class UsersService {
  createUser(email, token, username) {
    const doc = new UserModal({
      email,
      username,
      token,
      roles: [USER_ROLES.USER],
    });
    return doc.save();
  }

  getUser(email) {
    return UserModal.findOne({ email }).exec();
  }
}

module.exports = new UsersService();
