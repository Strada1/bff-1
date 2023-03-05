"use strict";
// // @ts-nocheck
// import request from 'supertest';
// import STATUS from 'http-status';
// import passport from 'passport';
// import { mockStrategy, tokenStrategy } from '../middlewares/passportStrategies';
// import { app } from '../server';
// import { ROLES } from '../shared/const';
// import { Message } from '../models/messages.model';
// import * as usersMock from './fixtures/users.fixture';
// import * as chatsMock from './fixtures/chats.fixture';
// beforeAll(async () => {
//   await Message.deleteMany({});
// });
// afterAll(async () => {
//   await Message.deleteMany({});
// });
// describe('GET /messages', () => {
//   describe('request with a wrong role', () => {
//     it(`should return a ${STATUS.UNAUTHORIZED}`, async () => {
//       // passport.use('bearer', mockStrategy({ roles: [ROLES.USER] }));
//       // await request(app)
//       //   .get(`/messages`)
//       //   .expect(STATUS.UNAUTHORIZED);
//     });
//   });
//   describe('request with a valid role', () => {
//     it(`should return a ${STATUS.OK}`, async () => {
//       // passport.use('bearer', mockStrategy({ roles: [ROLES.ADMIN] }));
//       // const { body } = await request(app)
//       //   .delete(`/messages`)
//       //   .expect(STATUS.OK);
//     });
//   });
// });
// describe('GET /messages/chat/:chatId', () => {
//   it(`should return a ${STATUS.OK} and the messages`, async () => {
//     // const createdUser = await createUser(usersMock.userRegistrationData);
//     // const createdChat = await createChat(chatsMock.chat);
//     // const mockMessages = generateMessagesMock(10, createdChat._id, createdUser._id);
//     // const createdMessages = await Message.insertMany(mockMessages);
//     // const { body } = await request(app).get('/messages/:chatId').expect(STATUS.OK);
//     // expect(body).toEqual(mockMessages);
//   });
// });
// describe('POST /messages/chat/:chatId', () => {
//   describe('request with a valid payload', () => {
//     it(`should return a ${STATUS.CREATED} and the message`, async () => {
//       // passport.use('bearer', mockStrategy({ roles: [ROLES.USER] }));
//       // const createdChat = await createChat(chatsMock.chat);
//       // const { token } = await createUser(usersMock.userRegistrationData);
//       // const { body } = await request(app)
//       //   .post('/messages/:chatId')
//       //   .set('Authorization', `Bearer ${token}`)
//       //   .send(messagesMock.message)
//       //   .expect(STATUS.CREATED);
//       // expect(body.text).toEqual(usersMock.message.text);
//     });
//   });
//   describe('request with a wrong payload', () => {
//     it(`should return a ${STATUS.BAD_REQUEST}`, async () => {
//       // passport.use('bearer', mockStrategy({ roles: [ROLES.USER] }));
//       // const createdChat = await createChat(chatsMock.chat);
//       // const { token } = await createUser(usersMock.userRegistrationData);
//       // const { body } = await request(app)
//       //   .post('/messages/:chatId')
//       //   .set('Authorization', `Bearer ${token}`)
//       //   .send({some: 'wrong data'})
//       //   .expect(STATUS.BAD_REQUEST);
//     });
//   });
// });
// describe('DELETE /messages/:messageId', () => {
//   describe('request with a wrong role', () => {
//     it(`should return a ${STATUS.UNAUTHORIZED}`, async () => {
//       // passport.use('bearer', mockStrategy({ roles: [ROLES.USER] }));
//       // const createdMessage = await createMessage(messagesMock.message);
//       // await request(app)
//       //   .delete(`/messages/${createdMessage._id}`)
//       //   .expect(STATUS.UNAUTHORIZED);
//     });
//   });
//   describe('request with a valid role', () => {
//     it(`should return a ${STATUS.NO_CONTENT}`, async () => {
//       // passport.use('bearer', mockStrategy({ roles: [ROLES.ADMIN] }));
//       // const createdMessage = await createMessage(messagesMock.message);
//       // const { body } = await request(app)
//       //   .delete(`/messages/${createdMessage._id}`)
//       //   .expect(STATUS.NO_CONTENT);
//     });
//   });
// });
