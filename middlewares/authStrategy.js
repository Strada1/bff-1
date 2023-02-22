const passport = require('passport');
const {Strategy} = require('passport-http-bearer');
const usersService = require('../service/db/usersService');

passport.use(
  new Strategy(function (token, cb) {
    const user = usersService.findUserByToken(token, function (error, user) {
      if (error) return cb(error);
      if (!user) return cb(null, false);
      return cb(null, user);
    });
  })
);

module.exports = passport;
