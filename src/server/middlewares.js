const { getUserByToken, userRoles } = require("./services/userService");
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer');
const UserModel = require("./models/user");

function validate(requiredFields) {
  return (req, res, next) => {
    let isValid = true;
    const missingFields = [];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        isValid = false;
        missingFields.push(field)
      }
    }
    if (!isValid) {
      return res.status(400).send(`Validation is failed, missing required fields: ${missingFields}`);
    }
    next();
  }
}

const usePassport = () => {
  passport.use(new BearerStrategy(
    function (token, done) {
      UserModel.findOne({ token: token }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        return done(null, user, { scope: 'all' });
      });
    }
  ));
}

const checkIsAdmin = async (req, res, next) => {
  const token = req?.headers?.authorization?.split(' ')[1];
  const user = await getUserByToken(token);
  const isPermission = (user && user.roles.includes(userRoles.admin));
  if (!isPermission) return res.status(403).send('You don\'t have permission!');
  next();
}

module.exports = { validate, checkIsAdmin, usePassport }