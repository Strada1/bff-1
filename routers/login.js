const {Router} = require('express');
const {PATHS} = require('../constants');
const {login} = require('../controllers/login');

const router = Router();

router.get(PATHS.AUTH, [], login);

module.exports = router;
