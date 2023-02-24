import mongoose from 'mongoose';
import { config } from '../config';

const DBName =
  process.env.NODE_ENV === 'test'
    ? `${config.mongoMainDBName}--test--`
    : config.mongoMainDBName;

mongoose.connect(config.mongoUrl + DBName).catch((err) => {
  console.log(
    `MongoDB connection error. Please make sure MongoDB is running. ${err}`
  );
});

export { mongoose as db };
