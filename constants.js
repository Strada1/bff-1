const PATHS = {
  AUTH: '/authentication',
  HOME: '/',
  USERS: {
    ALL: '/users',
    BY_ID: '/users/:userId',
    CHATS: {
      ALL: '/users/:userId/chats',
      BY_ID: '/users/:userId/chats/:chatId',
      MESSAGES: {
        ALL: '/users/:userId/chats/:chatId/messages',
        BY_ID: '/users/:userId/chats/:chatId/messages/:messageId',
      },
    },
  },
  CHATS: {
    ALL: '/chats',
    BY_ID: '/chats/:chatId',
  },
};

module.exports = {
  PATHS,
};
