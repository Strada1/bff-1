import { ROLES } from '../../shared/const';
import * as tokenService from '../../services/token.service';

export const wrongUserId = '63e382d1848d4c8af8847773';

export const userTemplate = {
  email: 'lorem@ipsum.dev',
  username: 'dolor',
  password: 'sit amet123',
};

export function generateUsersMock(count: number) {
  const result = [];

  for (let i = 0; i < count; i += 1) {
    const token = tokenService.createToken(userTemplate.email + i);
    result.push({
      ...userTemplate,
      email: userTemplate.email + i,
      username: userTemplate.username + i,
      password: userTemplate.password + i,
      roles: [ROLES.USER],
      chats: ['64032e40e4b706cfe6224847'],
      token,
    });
  }

  return result;
}
