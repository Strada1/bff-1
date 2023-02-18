const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const UserModel = require('../models/userModel');

passport.use(new BearerStrategy(
    function(token, done) {
        UserModel.findOne({ token: token }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user, { scope: 'all' });
      });
    }
  ));


module.exports = passport
