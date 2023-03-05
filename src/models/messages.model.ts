import { body } from 'express-validator';
import { Types } from 'mongoose';
import { db } from '../ext/db';
import { createLengthErrorMessage } from '../shared/helpers';

export interface IMessage {
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  text: String;
  chatId: Types.ObjectId;
  createdAt?: string;
  updatedAt?: string;
  readonly __v?: number;
}

const MessageSchema = new db.Schema<IMessage>(
  {
    user: { type: 'ObjectId', ref: 'User', required: true },
    text: { type: 'String', required: true },
    chatId: { type: 'ObjectId', ref: 'Chat', required: true },
    __v: { type: Number, select: false },
  },
  { timestamps: true }
);

const validLengths = {
  text: { min: 1, max: 300 },
};

export const messageValidation = [
  body('user').optional().isMongoId(),
  body('text')
    .optional()
    .trim()
    .isLength(validLengths.text)
    .withMessage(createLengthErrorMessage('text', validLengths.text))
    .escape(),
  body('chatId').optional().isMongoId(),
];

export const Message = db.model<IMessage>('Message', MessageSchema);
