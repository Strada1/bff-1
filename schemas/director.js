import { Schema, model } from 'mongoose';

const DirectorSchema = new Schema({
  name: String,
});

const Director = model('Director', DirectorSchema);

export default Director;
