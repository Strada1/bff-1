import { query } from 'express-validator';
import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';
import { ERROR_TEXT, SORT_ORDER_VALUES } from './const';
import { createLengthErrorMessage, validateLength } from './helpers';
import { config } from '../config';

export const sortOrderValidation = [
  query('sort')
    .optional()
    .isIn(SORT_ORDER_VALUES)
    .withMessage(
      `Wrong sort query, valid varations: ${SORT_ORDER_VALUES.join(', ')}`
    ),
];

export function messagePayloadValidation({
  message,
  chatId,
}: {
  message: string;
  chatId: string | Types.ObjectId;
}): { isValidPayload: boolean; error: string } {
  const result = { isValidPayload: true, error: '' };
  const isValidMessage = validateLength(message, config.messageLengthLimits);
  const isValidChatId = ObjectId.isValid(chatId);

  if (!isValidMessage) {
    result.isValidPayload = false;
    result.error = createLengthErrorMessage(
      'Message',
      config.messageLengthLimits
    );
    return result;
  }

  if (!isValidChatId) {
    result.isValidPayload = false;
    result.error = ERROR_TEXT.MESSAGES.NOT_VALID_CHAT_ID;
    return result;
  }

  return result;
}
