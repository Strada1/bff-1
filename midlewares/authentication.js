const passport = require('../helpers/passport')
const createUser = require('../tests/fixtures/user');

const authentication = (req, res, next) => {
    return passport.authenticate('bearer', { session: false })(req, res, next)
  }

module.exports = authentication;