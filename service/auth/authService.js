const Users = require('../../models/Users');

const findUser = async ({email, password}) => {
  const user = await Users.findOne({
    email: email,
  });
  return `${user?.email} ${user?.password}`;
};

module.exports = {findUser};
