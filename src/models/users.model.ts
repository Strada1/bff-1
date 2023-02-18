import { body } from 'express-validator';
import { Types } from 'mongoose';
import { db } from '../ext/db';
import { createLengthErrorMessage } from '../shared/helpers';

export interface IUser {
  _id?: Types.ObjectId;
  email: string;
  username: string;
  password: string;
  token?: string;
  roles?: string[];
  favorites?: string[];
  createdAt?: string;
  updatedAt?: string;
  readonly __v?: number;
}

const UserSchema = new db.Schema<IUser>(
  {
    email: { type: 'String', required: true },
    username: { type: 'String', required: true },
    password: { type: 'String', required: true },
    token: { type: 'String', required: true },
    roles: [String],
    favorites: [String],
    __v: { type: Number, select: false },
  },
  { timestamps: true }
);

const validLengths = {
  email: { min: 2, max: 35 },
  username: { min: 1, max: 15 },
  password: { min: 6, max: 15 },
};

export const userValidation = [
  body('email')
    .optional()
    .trim()
    .isLength(validLengths.email)
    .withMessage(createLengthErrorMessage('email', validLengths.email))
    .isEmail(),
  body('username')
    .optional()
    .trim()
    .isLength(validLengths.username)
    .withMessage(createLengthErrorMessage('username', validLengths.username))
    .escape(),
  body('password')
    .optional()
    .trim()
    .isLength(validLengths.password)
    .withMessage(createLengthErrorMessage('password', validLengths.password))
    .escape(),
  body('token').optional().trim().isJWT(),
];

export const User = db.model<IUser>('User', UserSchema);
