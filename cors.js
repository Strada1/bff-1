const cors = require('cors');

const allowedOrigins = [
  'localhost', // один или несколько хостов
];

const corsOptions = cors({
  origin: allowedOrigins,
});

module.exports = { corsOptions };
