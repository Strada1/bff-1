const {Router} = require('express');
const {body} = require('express-validator');
const {PATHS} = require('../constants');
const {authUser} = require('../controllers/auth');
const validate = require('../middlewares/validate');

const router = Router();

router.get(
  PATHS.AUTH,
  [
    body('email').notEmpty().withMessage('the email field should not be empty'),
    body('password').notEmpty().withMessage('the password field should not be empty'),
  ],
  validate,
  authUser
);

module.exports = router;
