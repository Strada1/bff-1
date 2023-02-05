import * as dotenv from 'dotenv';

dotenv.config();

import { connect } from 'mongoose';

const url = process.env.MONGO_CONNECTION_STRING;

connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
