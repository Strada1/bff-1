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
module.exports = {
  SERVER,
  DB,
};
