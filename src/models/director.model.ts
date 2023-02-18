import { body } from 'express-validator';
import { db } from '../ext/db';
import { createLengthErrorMessage } from '../shared/helpers';

export interface IDirector {
  firstName: String;
  lastName: String;
  readonly __v?: number;
}

const DirectorSchema = new db.Schema<IDirector>(
  {
    firstName: { type: 'String', required: true },
    lastName: { type: 'String', required: true },
    __v: { type: Number, select: false },
  },
  { timestamps: true }
);

const validLengths = {
  firstName: { min: 2, max: 15 },
  lastName: { min: 2, max: 15 },
};

export const directorValidation = [
  body('firstName')
    .optional()
    .trim()
    .isLength(validLengths.firstName)
    .withMessage(createLengthErrorMessage('firstName', validLengths.firstName))
    .escape(),
  body('lastName')
    .optional()
    .trim()
    .isLength(validLengths.lastName)
    .withMessage(createLengthErrorMessage('lastName', validLengths.lastName))
    .escape(),
];

export const Director = db.model<IDirector>('Director', DirectorSchema);
