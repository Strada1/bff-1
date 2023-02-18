import { body } from 'express-validator';
import { Types } from 'mongoose';
import { db } from '../ext/db';
import { createLengthErrorMessage } from '../shared/helpers';

export interface IComment {
  user: Types.ObjectId;
  movie: Types.ObjectId;
  text: String;
  readonly __v?: number;
}

const CommentSchema = new db.Schema<IComment>(
  {
    user: { type: 'ObjectId', ref: 'User', required: true },
    movie: { type: 'ObjectId', ref: 'Movie', required: true },
    text: { type: 'String', required: true },
    __v: { type: Number, select: false },
  },
  { timestamps: true }
);

const validLengths = {
  text: { min: 2, max: 280 },
};

export const commentValidation = [
  body('user').optional().isMongoId(),
  body('movie').optional().isMongoId(),
  body('text')
    .optional()
    .trim()
    .isLength(validLengths.text)
    .withMessage(createLengthErrorMessage('text', validLengths.text))
    .escape(),
];

export const Comment = db.model<IComment>('Comment', CommentSchema);
