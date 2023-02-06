import { Types } from 'mongoose';
import { db } from '../ext/db';
import { Optional } from '../shared/types';

export interface IDirector {
  firstName: String;
  lastName: String;
  readonly __v?: number;
  _id?: Types.ObjectId;
}

export type IDirectorOptional = Optional<IDirector, 'firstName' | 'lastName'>;

const DirectorSchema = new db.Schema<IDirector>({
  firstName: { type: 'String', required: true },
  lastName: { type: 'String', required: true },
  __v: { type: Number, select: false },
});

export const Director = db.model<IDirector>('Director', DirectorSchema);
