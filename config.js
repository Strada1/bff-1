const DB = {
  URL: 'mongodb://localhost:27017/main',
  OPTIONS: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

const SERVER = {
  PORT: 3000,
};

const CORS_OPTIONS = {
  origin: 'https://expressjs.com',
  optionsSuccessStatus: 200,
};

module.exports = {
  SERVER,
  DB,
  CORS_OPTIONS,
};
