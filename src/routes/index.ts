import { Router } from 'express';
import { categoriesRoute } from './categories.route';
import { moviesRoute } from './movies.route';
import { commentsRoute } from './comments.route';
import { directorsRoute } from './directors.route';

const router = Router();

interface IRoute {
  path: string;
  route: Router;
}

const routeList: IRoute[] = [
  {
    path: '/categories',
    route: categoriesRoute,
  },
  {
    path: '/movies',
    route: moviesRoute,
  },
  {
    path: '/comments',
    route: commentsRoute,
  },
  {
    path: '/directors',
    route: directorsRoute,
  },
];

routeList.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
