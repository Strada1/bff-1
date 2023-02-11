import { body } from 'express-validator';
import { db } from '../ext/db';
import { createLengthErrorMessage } from '../shared/helpers';

export interface ICategory {
  title: string;
  readonly __v?: number;
}

const CategorySchema = new db.Schema<ICategory>(
  {
    title: { type: 'String', required: true },
    __v: { type: Number, select: false },
  },
  { timestamps: true }
);

const validLengths = {
  title: { min: 2, max: 15 },
};

export const categoryValidation = [
  body('title')
    .optional()
    .trim()
    .isLength(validLengths.title)
    .withMessage(createLengthErrorMessage('title', validLengths.title))
    .escape(),
];

export const Category = db.model<ICategory>('Category', CategorySchema);
