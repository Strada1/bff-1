import { Router } from 'express';
import { chatsRoute } from './chats.route';
import { messagesRoute } from './messages.route';
import { usersRoute } from './users.route';

const router = Router();

interface IRoute {
  path: string;
  route: Router;
}

const routeList: IRoute[] = [
  {
    path: '/chats',
    route: chatsRoute,
  },
  {
    path: '/messages',
    route: messagesRoute,
  },
  {
    path: '/users',
    route: usersRoute,
  },
];

routeList.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
