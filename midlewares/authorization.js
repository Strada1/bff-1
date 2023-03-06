const { findOneByToken } = require('../services/user');

const authorization = async (req, res, next) => {
    const activeUser = await findOneByToken(req.user.token);
    const isAdmin = activeUser.roles.find(role => role === "admin");

    if (!isAdmin) {
        return res.status(403).send('You do not have permission for this operation');
    }
    next();
}

module.exports = authorization;