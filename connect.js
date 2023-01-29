import { connect } from 'mongoose';

const url = 'mongodb://localhost:27017/main1';

connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
