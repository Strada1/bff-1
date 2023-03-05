"use strict";
// // @ts-nocheck
// import request from 'supertest';
// import STATUS from 'http-status';
// import passport from 'passport';
// import { mockStrategy, tokenStrategy } from '../middlewares/passportStrategies';
// import { app } from '../server';
// import { ROLES } from '../shared/const';
// import { Chat } from '../models/chats.model';
// import * as chatsMock from './fixtures/chats.fixture';
// import * as usersMock from './fixtures/users.fixture';
// afterAll(async () => {
//   await Chat.deleteMany({});
// });
// describe('GET /chats/', () => {
//   it(`should return a ${STATUS.OK} and the chats`, async () => {
//     // beforeAll(async () => {
//     //   await Chat.deleteMany({});
//     // });
//     // const createdChats = await Chat.insertMany(chatsMock.chats);
//     // const { body } = await request(app).get('/messages').expect(STATUS.OK);
//     // expect(body).toEqual(createdChats);
//   });
// });
// describe('POST /chats', () => {
//   describe('request with a wrong role', () => {
//     it(`should return a ${STATUS.UNAUTHORIZED}`, async () => {
//       // beforeAll(async () => {
//       //   await Chat.deleteMany({});
//       // });
//       // passport.use('bearer', mockStrategy({ roles: [ROLES.USER] }));
//       // const { token } = await createUser(usersMock.userRegistrationData);
//       // const { body } = await request(app)
//       //   .post('/chats')
//       //   .set('Authorization', `Bearer ${token}`)
//       //   .send(chatsMock.chat)
//       //   .expect(STATUS.UNAUTHORIZED);
//     });
//   });
//   describe('request with a valid role', () => {
//     it(`should return a ${STATUS.CREATED} and the chat`, async () => {
//       // beforeAll(async () => {
//       //   await Chat.deleteMany({});
//       // });
//       // passport.use('bearer', mockStrategy({ roles: [ROLES.ADMIN] }));
//       // const { token } = await createUser(usersMock.userRegistrationData);
//       // const { body } = await request(app)
//       //   .post('/chats')
//       //   .set('Authorization', `Bearer ${token}`)
//       //   .send(chatsMock.chat)
//       //   .expect(STATUS.CREATED);
//       // expect(body.title).toEqual(chatsMock.chat.title);
//     });
//   });
//   describe('request with a valid role but wrong payload', () => {
//     it(`should return a ${STATUS.BAD_REQUEST}`, async () => {
//       // beforeAll(async () => {
//       //   await Chat.deleteMany({});
//       // });
//       // passport.use('bearer', mockStrategy({ roles: [ROLES.ADMIN] }));
//       // const { token } = await createUser(usersMock.userRegistrationData);
//       // const { body } = await request(app)
//       //   .post('/chats')
//       //   .set('Authorization', `Bearer ${token}`)
//       //   .send({title: ''})
//       //   .expect(STATUS.BAD_REQUEST);
//     });
//   });
// });
// describe('GET /chats/:chatId', () => {
//   it(`should return a ${STATUS.OK} and the chat`, async () => {
//     // beforeAll(async () => {
//     //   await Chat.deleteMany({});
//     // });
//     // passport.use('bearer', mockStrategy({ roles: [ROLES.ADMIN] }));
//     // const { token } = await createUser(usersMock.userRegistrationData);
//     // const createdChat = await createChat(chatsMock.chat);
//     // const { body } = await request(app).get(`/chats/${createdChat._id}`).expect(STATUS.OK);
//     // expect(body).toEqual(createdChats);
//   });
// });
// describe('PUT /chats/:chatId', () => {
//   describe('request with a wrong role', () => {
//     it(`should return a ${STATUS.UNAUTHORIZED}`, async () => {
//       // beforeAll(async () => {
//       //   await Chat.deleteMany({});
//       // });
//       // passport.use('bearer', mockStrategy({ roles: [ROLES.USER] }));
//       // const newData = {title: 1}
//       // const createdChat = await createChat(chatsMock.chat);
//       // await request(app)
//       //   .put(`/chats/${createdChat._id}`)
//       //   .send(newData)
//       //   .expect(STATUS.UNAUTHORIZED);
//     });
//   });
//   describe('request with a valid role', () => {
//     it(`should return a ${STATUS.OK}`, async () => {
//       // beforeAll(async () => {
//       //   await Chat.deleteMany({});
//       // });
//       // passport.use('bearer', mockStrategy({ roles: [ROLES.ADMIN] }));
//       // const newData = {title: 1}
//       // const createdChat = await createChat(chatsMock.chat);
//       // const { body } = await request(app)
//       //   .put(`/messages/${createdChat._id}`)
//       //   .send(newData)
//       //   .expect(STATUS.OK);
//       // expect(body.title).toEqual(newData.title);
//     });
//   });
// });
// describe('DELETE /chats/:chatId', () => {
//   describe('request with a wrong role', () => {
//     it(`should return a ${STATUS.UNAUTHORIZED}`, async () => {
//       // beforeAll(async () => {
//       //   await Chat.deleteMany({});
//       // });
//       // passport.use('bearer', mockStrategy({ roles: [ROLES.USER] }));
//       // const createdChat = await createChat(chatsMock.chat);
//       // await request(app)
//       //   .delete(`/chats/${createdChat._id}`)
//       //   .expect(STATUS.UNAUTHORIZED);
//     });
//   });
//   describe('request with a valid role', () => {
//     it(`should return a ${STATUS.NO_CONTENT}`, async () => {
//       // beforeAll(async () => {
//       //   await Chat.deleteMany({});
//       // });
//       // passport.use('bearer', mockStrategy({ roles: [ROLES.ADMIN] }));
//       // const createdChat = await createChat(chatsMock.chat);
//       // const { body } = await request(app)
//       //   .delete(`/messages/${createdChat._id}`)
//       //   .expect(STATUS.NO_CONTENT);
//     });
//   });
// });
