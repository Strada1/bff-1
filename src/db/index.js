import { connect } from 'mongoose';

export const connected = (url) => {
  connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
};
