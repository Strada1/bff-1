import jwt from 'jsonwebtoken';
import { config } from '../config';

export function createToken(payload: string | object | Buffer) {
  return jwt.sign(payload, config.jwtSecret);
}
