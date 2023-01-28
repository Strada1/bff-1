import mongoose from 'mongoose';
import { config } from '../config';

mongoose.connect(config.mongoUrl).catch((err) => {
  console.log(
    `MongoDB connection error. Please make sure MongoDB is running. ${err}`
  );
});

export { mongoose as db };
