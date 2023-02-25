const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const UserModel = require('../models/userModel');
const MockStrategy = require('passport-mock-strategy');

passport.use(new BearerStrategy(

  function (token, done) {

    UserModel.findOne({ token: token }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, { scope: 'all' });
    });
  }
));


const customUserObject = {
  _id: "63efa6f63ada3c422f5d04a9",
  email: 'adm@ukr.net',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbUB1a3IubmV0IiwicGFzc3dvcmQiOiIxMjM0NWFkbSIsImlhdCI6MTY3NjY1MDIzMH0.CuJyeHDNeTFkZc8k22wIoNsRLbam54Q8mxwwLzg7pK0',
  username: 'adm',
  roles: ['admin'],
  favorites: []
}


passport.use(new MockStrategy(
  {
    name: 'mock',
    user: customUserObject
  },
  (user, done) => {
    done(null, user, { scope: 'all' });
  }));


module.exports = passport
