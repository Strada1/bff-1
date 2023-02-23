const authorizationForAdmin = (req, res, next) => {
  if (req?.user?.roles.includes('admin')) return next();
  return res.status(403).send('Доступ запрещен');
};

const authorizationForUser = (req, res, next) => {
  console.log(req.user);
  if (req?.user?.roles.includes('admin') || req.params['userId'] === req.user._id.toString()) return next();
  return res.status(403).send('Доступ запрещен');
};

module.exports = {authorizationForAdmin, authorizationForUser};
