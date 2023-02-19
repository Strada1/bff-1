const Users = require('../../models/Users');

const findUser = async ({username, password}) => {
  const user = await Users.find({
    username: username,
  });
  console.log(user);
};
