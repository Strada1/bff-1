const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const UserModel = require('../models/userModel');
const MockStrategy = require('passport-mock-strategy');
const customUser = {
  _id: process.env.ID,
  token: process.env.TOKEN_ADMIN,
  email:process.env.EMAIL,
  username: process.env.USER_NAME
}

passport.use(new BearerStrategy(

  function (token, done) {

    UserModel.findOne({ token: token }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, { scope: 'all' });
    });
  }
));

passport.use(new MockStrategy(
  {
    name: 'mock',
    user: customUser
  },
  (user, done) => {
    done(null, user, { scope: 'all' });
  }));


module.exports = passport
