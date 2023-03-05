// @ts-nocheck
import request from 'supertest';
import STATUS from 'http-status';
import passport from 'passport';
import { mockStrategy, tokenStrategy } from '../middlewares/passportStrategies';
import { app } from '../server';
import { ROLES } from '../shared/const';
import { User } from '../models/users.model';
import * as usersService from '../services/users.service';
import * as chatsService from '../services/chats.service';
import * as usersMock from './fixtures/users.fixture';
import * as sharedMock from './fixtures/shared.fixture';
import * as chatsMock from './fixtures/chats.fixture';
import { getUsersResponseDTO } from '../dto/users.dto';

afterAll(async () => {
  await User.deleteMany({});
});

describe('GET /users', () => {
  beforeAll(async () => {
    await User.deleteMany({});
  });

  it(`should return a ${STATUS.OK} and the users`, async () => {
    const mockUsers = usersMock.generateUsersMock(10);
    const createdUsers = await User.insertMany(mockUsers);

    const { body } = await request(app).get('/users').expect(STATUS.OK);
    expect(body).toEqual(
      sharedMock.jsonTransform(getUsersResponseDTO(createdUsers))
    );
  });
});

describe('GET /users/:userId', () => {
  describe('given the user does not exist', () => {
    beforeAll(async () => {
      await User.deleteMany({});
    });

    it(`should return a ${STATUS.NOT_FOUND}`, async () => {
      await request(app)
        .get(`/users/${usersMock.wrongUserId}`)
        .expect(STATUS.NOT_FOUND);
    });
  });

  describe('given the user does exist', () => {
    beforeAll(async () => {
      await User.deleteMany({});
    });

    it(`should return a ${STATUS.OK} and the user`, async () => {
      const createdUser = await usersService.createUser(usersMock.userTemplate);
      await request(app).get(`/users/${createdUser._id}`).expect(STATUS.OK);
    });
  });
});

describe('POST /users', () => {
  describe('request with wrong payload', () => {
    beforeAll(async () => {
      await User.deleteMany({});
    });

    it(`should return a ${STATUS.BAD_REQUEST}`, async () => {
      const wrongPayload = {
        email: '1',
        password: '2',
      };
      await request(app)
        .post('/users')
        .send(wrongPayload)
        .expect(STATUS.BAD_REQUEST);
    });
  });

  describe('request with valid payload', () => {
    beforeAll(async () => {
      await User.deleteMany({});
    });

    it(`should return a ${STATUS.CREATED} and the user`, async () => {
      await request(app)
        .post('/users')
        .send(usersMock.userTemplate)
        .expect(STATUS.CREATED);
    });
  });
});

describe('PUT /users/:userId', () => {
  describe('request with a wrong role', () => {
    beforeAll(async () => {
      await User.deleteMany({});
    });

    it(`should return a ${STATUS.UNAUTHORIZED}`, async () => {
      passport.use('bearer', mockStrategy({ roles: [ROLES.USER] }));

      const createdUser = await usersService.createUser(usersMock.userTemplate);

      await request(app)
        .put(`/users/${createdUser._id}`)
        .send({ username: 'test' })
        .expect(STATUS.UNAUTHORIZED);
    });
  });

  describe('request with a valid role', () => {
    beforeAll(async () => {
      await User.deleteMany({});
    });

    it(`should return a ${STATUS.OK} and the user`, async () => {
      passport.use('bearer', mockStrategy({ roles: [ROLES.ADMIN] }));

      const createdUser = await usersService.createUser(usersMock.userTemplate);
      const payload = { username: 'test' };

      const { body } = await request(app)
        .put(`/users/${createdUser._id}`)
        .send(payload)
        .expect(STATUS.OK);
      expect(body.username).toEqual(payload.username);
    });
  });

  describe('request with a valid role but wrong payload', () => {
    beforeAll(async () => {
      await User.deleteMany({});
    });

    it(`should return a ${STATUS.BAD_REQUEST}`, async () => {
      passport.use('bearer', mockStrategy({ roles: [ROLES.ADMIN] }));

      const createdUser = await usersService.createUser(usersMock.userTemplate);
      const wrongPayload = {
        email: '1',
        password: '2',
      };

      await request(app)
        .put(`/users/${createdUser._id}`)
        .send(wrongPayload)
        .expect(STATUS.BAD_REQUEST);
    });
  });
});

describe('DELETE /users/:userId', () => {
  describe('request with a wrong role', () => {
    beforeAll(async () => {
      await User.deleteMany({});
    });

    it(`should return a ${STATUS.UNAUTHORIZED}`, async () => {
      passport.use('bearer', mockStrategy({ roles: [ROLES.USER] }));

      const createdUser = await usersService.createUser(usersMock.userTemplate);

      await request(app)
        .delete(`/users/${createdUser._id}`)
        .expect(STATUS.UNAUTHORIZED);
    });
  });

  describe('request with a valid role', () => {
    beforeAll(async () => {
      await User.deleteMany({});
    });

    it(`should return a ${STATUS.NO_CONTENT}`, async () => {
      passport.use('bearer', mockStrategy({ roles: [ROLES.ADMIN] }));

      const createdUser = await usersService.createUser(usersMock.userTemplate);

      await request(app)
        .delete(`/users/${createdUser._id}`)
        .expect(STATUS.NO_CONTENT);
    });
  });
});

describe('POST /users/me/chats', () => {
  describe('request with a wrong payload', () => {
    beforeAll(async () => {
      await User.deleteMany({});
    });

    it(`should return a ${STATUS.BAD_REQUEST}`, async () => {
      passport.use('bearer', tokenStrategy);
      const createdUser = await usersService.createUser(usersMock.userTemplate);

      await request(app)
        .post('/users/me/chats')
        .set('Authorization', `Bearer ${createdUser.token}`)
        .send({ chatId: 1 })
        .expect(STATUS.BAD_REQUEST);
    });
  });

  describe('request with a valid payload', () => {
    beforeAll(async () => {
      await User.deleteMany({});
    });

    it(`should return a ${STATUS.OK} and the user`, async () => {
      passport.use('bearer', tokenStrategy);
      const createdChat = await chatsService.createChat(chatsMock.chat);
      const createdUser = await usersService.createUser(usersMock.userTemplate);

      const { body } = await request(app)
        .post('/users/me/chats')
        .set('Authorization', `Bearer ${createdUser.token}`)
        .send({ chatId: createdChat._id })
        .expect(STATUS.OK);

      const chat = await chatsService.getChat(createdChat._id);
      const isUserAddedToChat = chat?.users?.includes(createdUser._id);

      expect(body.chats[0]._id).toEqual(createdChat._id.toString());
      expect(isUserAddedToChat).toBeTruthy();
    });
  });
});

describe('DELETE /users/me/chats', () => {
  describe('request with a wrong payload', () => {
    beforeAll(async () => {
      await User.deleteMany({});
    });

    it(`should return a ${STATUS.BAD_REQUEST}`, async () => {
      passport.use('bearer', tokenStrategy);
      const createdUser = await usersService.createUser(usersMock.userTemplate);

      await request(app)
        .delete('/users/me/chats')
        .set('Authorization', `Bearer ${createdUser.token}`)
        .send({ chatId: '' })
        .expect(STATUS.BAD_REQUEST);
    });
  });
  describe('with a valid payload', () => {
    beforeAll(async () => {
      await User.deleteMany({});
    });

    it(`should return a ${STATUS.OK} and the user`, async () => {
      passport.use('bearer', tokenStrategy);
      const createdChat = await chatsService.createChat(chatsMock.chat);
      const createdUser = await usersService.createUser(usersMock.userTemplate);
      await usersService.addChatToUser(createdUser._id, createdChat._id);
      await chatsService.addUserToChat(createdChat._id, createdUser._id);

      const { body } = await request(app)
        .delete('/users/me/chats')
        .set('Authorization', `Bearer ${createdUser.token}`)
        .send({ chatId: createdChat._id })
        .expect(STATUS.OK);

      const chat = await chatsService.getChat(createdChat._id);
      const isUserRemovedFromChat = !chat?.users?.includes(createdUser._id);

      expect(body.chats).not.toEqual(
        expect.arrayContaining([createdChat._id.toString()])
      );
      expect(isUserRemovedFromChat).toBeTruthy();
    });
  });
});
