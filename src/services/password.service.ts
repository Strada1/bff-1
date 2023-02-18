import bcrypt from 'bcrypt';

export function encryptPassword(password: string, rounds: number = 3) {
  return bcrypt.hash(password, rounds);
}

export async function comparePassword(password: string, DbPassword: string) {
  return bcrypt.compare(password, DbPassword);
}
