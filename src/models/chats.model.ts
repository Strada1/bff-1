import { body } from 'express-validator';
import { Types } from 'mongoose';
import { db } from '../ext/db';
import { createLengthErrorMessage } from '../shared/helpers';

export interface IChat {
  _id?: Types.ObjectId;
  title: String;
  users?: Types.ObjectId[];
  createdAt?: string;
  updatedAt?: string;
  readonly __v?: number;
}

const ChatSchema = new db.Schema<IChat>(
  {
    title: { type: 'String', required: true },
    users: [{ type: 'ObjectId', ref: 'User' }],
    __v: { type: Number, select: false },
  },
  { timestamps: true }
);

const validLengths = {
  title: { min: 2, max: 15 },
};

export const chatValidation = [
  body('title')
    .optional()
    .trim()
    .isLength(validLengths.title)
    .withMessage(createLengthErrorMessage('title', validLengths.title))
    .escape(),
];

export const Chat = db.model<IChat>('Chat', ChatSchema);
