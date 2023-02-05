import { Types } from 'mongoose';
import { db } from '../ext/db';
import { Optional } from '../shared/types';

export interface IMovie {
  title: String;
  category: Types.ObjectId;
  year?: Number;
  duration?: Number;
  director?: String;
  comments?: [Types.ObjectId];
  readonly __v?: number;
}

export type IMovieOptional = Optional<IMovie, 'title' | 'category'>;

const MovieSchema = new db.Schema<IMovie>({
  title: String,
  category: { type: 'ObjectId', ref: 'Category' },
  year: Number,
  duration: Number,
  director: String,
  comments: [{ type: 'ObjectId', ref: 'Comment' }],
  __v: { type: Number, select: false },
});

export const Movie = db.model<IMovie>('Movie', MovieSchema);
