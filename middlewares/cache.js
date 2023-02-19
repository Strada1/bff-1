const NodeCache = require('node-cache');
const myCache = new NodeCache({checkperiod: 0});

const getCache = (req, res, next) => {
  const url = req.originalUrl;
  if (req.method !== 'GET') {
    myCache.flushAll();
  }
  if (myCache.has(url)) {
    res.status(200).json(myCache.get(url));
  } else {
    next();
  }
};

module.exports = {myCache, getCache};
