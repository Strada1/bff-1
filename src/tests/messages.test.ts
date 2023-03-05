// @ts-nocheck
import request from 'supertest';
import STATUS from 'http-status';
import passport from 'passport';
import { mockStrategy } from '../middlewares/passportStrategies';
import { app } from '../server';
import { ROLES } from '../shared/const';
import { Message } from '../models/messages.model';
import * as messagesService from '../services/messages.service';
import * as usersService from '../services/users.service';
import * as chatsService from '../services/chats.service';
import * as chatsMock from './fixtures/chats.fixture';
import * as usersMock from './fixtures/users.fixture';
import * as messagesMock from './fixtures/messages.fixture';
import * as sharedMock from './fixtures/shared.fixture';
import { getMessageResponseDTO } from '../dto/messages.dto';

afterAll(async () => {
  await Message.deleteMany({});
});

describe('GET /messages', () => {
  describe('request with a wrong role', () => {
    beforeAll(async () => {
      await Message.deleteMany({});
    });

    it(`should return a ${STATUS.UNAUTHORIZED}`, async () => {
      passport.use('bearer', mockStrategy({ roles: [ROLES.USER] }));
      await request(app).get('/messages').expect(STATUS.UNAUTHORIZED);
    });
  });

  describe('request with a valid role', () => {
    beforeAll(async () => {
      await Message.deleteMany({});
    });

    it(`should return a ${STATUS.OK} and messages`, async () => {
      passport.use('bearer', mockStrategy({ roles: [ROLES.ADMIN] }));
      const createdChat = await chatsService.createChat(chatsMock.chat);
      const createdUser = await usersService.createUser(usersMock.userTemplate);
      await usersService.addChatToUser(createdUser._id, createdChat._id);
      const message1 = await messagesService.createMessage(
        createdChat._id,
        createdUser._id,
        messagesMock.message.text
      );
      const message2 = await messagesService.createMessage(
        createdChat._id,
        createdUser._id,
        messagesMock.message.text
      );

      const { body } = await request(app).get('/messages').expect(STATUS.OK);

      expect(body).toEqual([
        sharedMock.jsonTransform(getMessageResponseDTO(message1)),
        sharedMock.jsonTransform(getMessageResponseDTO(message2)),
      ]);
    });
  });
});

describe('GET /messages?chatId=', () => {
  describe('request with a valid query', () => {
    beforeAll(async () => {
      await Message.deleteMany({});
    });

    it(`should return a ${STATUS.OK} and messages`, async () => {
      passport.use('bearer', mockStrategy({ roles: [ROLES.ADMIN] }));
      const createdChat = await chatsService.createChat(chatsMock.chat);
      const createdChat2 = await chatsService.createChat({
        title: 'second chat',
      });

      const createdUser = await usersService.createUser(usersMock.userTemplate);
      await usersService.addChatToUser(createdUser._id, createdChat._id);
      await usersService.addChatToUser(createdUser._id, createdChat2._id);

      const messageToFirstChat1 = await messagesService.createMessage(
        createdChat._id,
        createdUser._id,
        messagesMock.message.text
      );
      const messageToFirstChat2 = await messagesService.createMessage(
        createdChat._id,
        createdUser._id,
        messagesMock.message.text
      );
      await messagesService.createMessage(
        createdChat2._id,
        createdUser._id,
        messagesMock.message.text
      );
      await messagesService.createMessage(
        createdChat2._id,
        createdUser._id,
        messagesMock.message.text
      );

      const { body } = await request(app)
        .get(`/messages?chatId=${createdChat._id}`)
        .expect(STATUS.OK);

      expect(body).toEqual([
        sharedMock.jsonTransform(getMessageResponseDTO(messageToFirstChat1)),
        sharedMock.jsonTransform(getMessageResponseDTO(messageToFirstChat2)),
      ]);
    });
  });
});

describe('GET /messages/:messageId', () => {
  describe('request with a wrong role', () => {
    beforeAll(async () => {
      await Message.deleteMany({});
    });
    it(`should return a ${STATUS.UNAUTHORIZED}`, async () => {
      passport.use('bearer', mockStrategy({ roles: [ROLES.USER] }));
      const createdChat = await chatsService.createChat(chatsMock.chat);
      const createdUser = await usersService.createUser(usersMock.userTemplate);
      await usersService.addChatToUser(createdUser._id, createdChat._id);
      const createdMessage = await messagesService.createMessage(
        createdChat._id,
        createdUser._id,
        messagesMock.message.text
      );

      await request(app)
        .get(`/messages/${createdMessage._id}`)
        .expect(STATUS.UNAUTHORIZED);
    });
  });

  describe('request with a valid role', () => {
    beforeAll(async () => {
      await Message.deleteMany({});
    });
    it(`should return a ${STATUS.OK}`, async () => {
      passport.use('bearer', mockStrategy({ roles: [ROLES.ADMIN] }));
      const createdChat = await chatsService.createChat(chatsMock.chat);
      const createdUser = await usersService.createUser(usersMock.userTemplate);
      await usersService.addChatToUser(createdUser._id, createdChat._id);
      const createdMessage = await messagesService.createMessage(
        createdChat._id,
        createdUser._id,
        messagesMock.message.text
      );

      const { body } = await request(app)
        .get(`/messages/${createdMessage._id}`)
        .expect(STATUS.OK);

      expect(body).toEqual(
        sharedMock.jsonTransform(getMessageResponseDTO(createdMessage))
      );
    });
  });
});

describe('DELETE /messages/:messageId', () => {
  describe('request with a wrong role', () => {
    beforeAll(async () => {
      await Message.deleteMany({});
    });
    it(`should return a ${STATUS.UNAUTHORIZED}`, async () => {
      passport.use('bearer', mockStrategy({ roles: [ROLES.USER] }));
      const createdChat = await chatsService.createChat(chatsMock.chat);
      const createdUser = await usersService.createUser(usersMock.userTemplate);
      await usersService.addChatToUser(createdUser._id, createdChat._id);
      const createdMessage = await messagesService.createMessage(
        createdChat._id,
        createdUser._id,
        messagesMock.message.text
      );

      await request(app)
        .delete(`/messages/${createdMessage._id}`)
        .expect(STATUS.UNAUTHORIZED);
    });
  });

  describe('request with a valid role', () => {
    beforeAll(async () => {
      await Message.deleteMany({});
    });
    it(`should return a ${STATUS.NO_CONTENT}`, async () => {
      passport.use('bearer', mockStrategy({ roles: [ROLES.ADMIN] }));
      const createdChat = await chatsService.createChat(chatsMock.chat);
      const createdUser = await usersService.createUser(usersMock.userTemplate);
      await usersService.addChatToUser(createdUser._id, createdChat._id);
      const createdMessage = await messagesService.createMessage(
        createdChat._id,
        createdUser._id,
        messagesMock.message.text
      );

      await request(app)
        .delete(`/messages/${createdMessage._id}`)
        .expect(STATUS.NO_CONTENT);
    });
  });
});
