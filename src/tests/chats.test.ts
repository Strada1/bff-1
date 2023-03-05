// @ts-nocheck
import request from 'supertest';
import STATUS from 'http-status';
import passport from 'passport';
import { mockStrategy } from '../middlewares/passportStrategies';
import { app } from '../server';
import { ROLES } from '../shared/const';
import { Chat } from '../models/chats.model';
import { Message } from '../models/messages.model';
import * as messagesService from '../services/messages.service';
import * as usersService from '../services/users.service';
import * as chatsService from '../services/chats.service';
import * as chatsMock from './fixtures/chats.fixture';
import * as sharedMock from './fixtures/shared.fixture';
import * as usersMock from './fixtures/users.fixture';
import * as messagesMock from './fixtures/messages.fixture';
import { getChatsFullResponseDTO } from '../dto/chats.dto';

afterAll(async () => {
  await Chat.deleteMany({});
});

describe('GET /chats/', () => {
  beforeAll(async () => {
    await Chat.deleteMany({});
  });

  it(`should return a ${STATUS.OK} and the chats`, async () => {
    passport.use('bearer', mockStrategy({ roles: [ROLES.ADMIN] }));
    const createdChats = await Chat.insertMany(chatsMock.chats);

    const { body } = await request(app).get('/chats').expect(STATUS.OK);
    expect(body).toEqual(
      sharedMock.jsonTransform(getChatsFullResponseDTO(createdChats))
    );
  });
});

describe('POST /chats', () => {
  describe('request with a wrong role', () => {
    beforeAll(async () => {
      await Chat.deleteMany({});
    });

    it(`should return a ${STATUS.UNAUTHORIZED}`, async () => {
      passport.use('bearer', mockStrategy({ roles: [ROLES.USER] }));

      await request(app)
        .post('/chats')
        .send(chatsMock.chat)
        .expect(STATUS.UNAUTHORIZED);
    });
  });

  describe('request with a valid role', () => {
    beforeAll(async () => {
      await Chat.deleteMany({});
    });

    it(`should return a ${STATUS.CREATED} and the chat`, async () => {
      passport.use('bearer', mockStrategy({ roles: [ROLES.ADMIN] }));
      const { body } = await request(app)
        .post('/chats')
        .send(chatsMock.chat)
        .expect(STATUS.CREATED);
      expect(body.title).toEqual(chatsMock.chat.title);
    });
  });

  describe('request with a valid role but wrong payload', () => {
    beforeAll(async () => {
      await Chat.deleteMany({});
    });

    it(`should return a ${STATUS.BAD_REQUEST}`, async () => {
      passport.use('bearer', mockStrategy({ roles: [ROLES.ADMIN] }));
      await request(app)
        .post('/chats')
        .send({ title: '' })
        .expect(STATUS.BAD_REQUEST);
    });
  });
});

describe('GET /chats/:chatId', () => {
  beforeAll(async () => {
    await Chat.deleteMany({});
  });

  it(`should return a ${STATUS.OK} and the chat`, async () => {
    const createdChat = await chatsService.createChat(chatsMock.chat);

    const { body } = await request(app)
      .get(`/chats/${createdChat._id}`)
      .expect(STATUS.OK);

    expect(body.title).toEqual(createdChat.title);
  });
});

describe('PUT /chats/:chatId', () => {
  describe('request with a wrong role', () => {
    beforeAll(async () => {
      await Chat.deleteMany({});
    });

    it(`should return a ${STATUS.UNAUTHORIZED}`, async () => {
      passport.use('bearer', mockStrategy({ roles: [ROLES.USER] }));
      const newData = { title: 123456 };
      const createdChat = await chatsService.createChat(chatsMock.chat);
      await request(app)
        .put(`/chats/${createdChat._id}`)
        .send(newData)
        .expect(STATUS.UNAUTHORIZED);
    });
  });

  describe('request with a valid role', () => {
    beforeAll(async () => {
      await Chat.deleteMany({});
    });

    it(`should return a ${STATUS.OK}`, async () => {
      passport.use('bearer', mockStrategy({ roles: [ROLES.ADMIN] }));
      const newData = { title: '123456' };
      const createdChat = await chatsService.createChat(chatsMock.chat);
      const { body } = await request(app)
        .put(`/chats/${createdChat._id}`)
        .send(newData)
        .expect(STATUS.OK);
      expect(body.title).toEqual(newData.title);
    });
  });

  describe('request with a valid role but wrong payload', () => {
    beforeAll(async () => {
      await Chat.deleteMany({});
    });

    it(`should return a ${STATUS.BAD_REQUEST}`, async () => {
      passport.use('bearer', mockStrategy({ roles: [ROLES.ADMIN] }));
      const newData = { title: '' };
      const createdChat = await chatsService.createChat(chatsMock.chat);
      await request(app)
        .put(`/chats/${createdChat._id}`)
        .send(newData)
        .expect(STATUS.BAD_REQUEST);
    });
  });
});

describe('DELETE /chats/:chatId', () => {
  describe('request with a wrong role', () => {
    beforeAll(async () => {
      await Chat.deleteMany({});
      await Message.deleteMany({});
    });

    it(`should return a ${STATUS.UNAUTHORIZED}`, async () => {
      passport.use('bearer', mockStrategy({ roles: [ROLES.USER] }));
      const createdChat = await chatsService.createChat(chatsMock.chat);

      await request(app)
        .delete(`/chats/${createdChat._id}`)
        .expect(STATUS.UNAUTHORIZED);
    });
  });

  describe('request with a valid role', () => {
    beforeAll(async () => {
      await Chat.deleteMany({});
      await Message.deleteMany({});
    });

    it(`should return a ${STATUS.NO_CONTENT}`, async () => {
      passport.use('bearer', mockStrategy({ roles: [ROLES.ADMIN] }));
      const createdChat = await chatsService.createChat(chatsMock.chat);
      const createdUser = await usersService.createUser(usersMock.userTemplate);
      await usersService.addChatToUser(createdUser._id, createdChat._id);
      await messagesService.createMessage(
        createdChat._id,
        createdUser._id,
        messagesMock.message.text
      );
      await messagesService.createMessage(
        createdChat._id,
        createdUser._id,
        messagesMock.message.text
      );

      await request(app)
        .delete(`/chats/${createdChat._id}`)
        .expect(STATUS.NO_CONTENT);

      const userResponse = await request(app)
        .get(`/users/${createdUser._id}`)
        .expect(STATUS.OK);

      const messagesResponse = await request(app)
        .get(`/messages?chatId=${createdChat._id}`)
        .expect(STATUS.OK);

      expect(messagesResponse.body).toEqual([]);
      expect(userResponse.body.chats).not.toEqual(
        expect.arrayContaining([createdChat._id.toString()])
      );
    });
  });
});
