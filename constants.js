const DB = {
  URL: 'mongodb://localhost:27017/main',
  OPTIONS: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

const PATHS = {
  HOME: '/',
  MOVIES: '/movies',
  CATEGORIES: '/categories',
};

module.exports = {
  DB,
  PATHS,
};
