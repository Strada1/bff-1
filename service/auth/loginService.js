const Users = require('../../models/Users');

const findUser = async ({email, password}) => {
  const user = await Users.findOne({
    email: email,
  });

  if (user?.password !== password) {
    return null;
  }
  return `${user?.email} ${user?.password}`;
};

module.exports = {findUser};
