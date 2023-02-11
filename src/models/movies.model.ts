import { body } from 'express-validator';
import { Types } from 'mongoose';
import { db } from '../ext/db';
import { createLengthErrorMessage } from '../shared/helpers';
import { Optional } from '../shared/types';

export interface IMovie {
  title: String;
  category: Types.ObjectId;
  year?: Number;
  duration?: Number;
  director?: Types.ObjectId;
  comments?: [Types.ObjectId];
  readonly __v?: number;
}
export type MovieOptional = Optional<IMovie, 'title' | 'category'>;

const MovieSchema = new db.Schema<IMovie>(
  {
    title: { type: 'String', required: true },
    category: { type: 'ObjectId', ref: 'Category', required: true },
    year: Number,
    duration: Number,
    director: { type: 'ObjectId', ref: 'Director' },
    comments: [{ type: 'ObjectId', ref: 'Comment' }],
    __v: { type: Number, select: false },
  },
  { timestamps: true }
);

const validLengths = {
  title: { min: 2, max: 15 },
  year: { min: 4, max: 4 },
};

export const movieValidation = [
  body('title')
    .optional()
    .trim()
    .isLength(validLengths.title)
    .withMessage(createLengthErrorMessage('title', validLengths.title))
    .escape(),
  body('category').optional().isMongoId(),
  body('year')
    .optional()
    .isNumeric()
    .isLength(validLengths.year)
    .withMessage(createLengthErrorMessage('year', validLengths.year)),
  body('duration').optional().isNumeric(),
  body('director').optional().isMongoId(),
];

export const Movie = db.model<IMovie>('Movie', MovieSchema);
