import { Types } from 'mongoose';
import { db } from '../ext/db';

export interface IComment {
  movie: Types.ObjectId;
  text: String;
  readonly __v?: number;
}

const CommentSchema = new db.Schema<IComment>({
  movie: { type: 'ObjectId', ref: 'Movie' },
  text: String,
  __v: { type: Number, select: false },
});

export const Comment = db.model<IComment>('Comment', CommentSchema);
