// @ts-nocheck
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import MockStrategy from 'passport-mock-strategy';
import * as usersService from '../services/users.service';
import { ROLES } from '../shared/const';

export const tokenStrategy = new BearerStrategy(async (token, done) => {
  try {
    const user = await usersService.getUserByToken(token);

    if (!user) {
      return done(null, false);
    }

    return done(null, user, { scope: 'all' });
  } catch (error) {
    return done(null, false);
  }
});

export const mockStrategy = ({ roles, token } = { roles: [ROLES.USER] }) =>
  new MockStrategy(
    {
      name: 'authMock',
      user: {
        email: 'test@test.ru',
        roles,
        token,
      },
    },
    (user, done) => done(null, user, { scope: 'all' })
  );
