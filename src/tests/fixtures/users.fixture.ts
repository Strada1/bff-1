import { ObjectId } from 'mongoose';
import _ from 'lodash';
import { ROLES } from '../../shared/const';
import * as tokenService from '../../services/token.service';
import { getRandomInt } from '../../shared/helpers';
import { IUser } from '../../models/users.model';
import { IMovie } from '../../models/movies.model';

export const userTemplate = {
  email: 'lorem@ipsum.dev',
  username: 'dolor',
  password: 'sit amet',
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
      token,
    });
  }

  return result;
}

export function selectRandomMovieIds(movies: any) {
  return movies
    .slice(0, getRandomInt(movies.length))
    .map((item: any) => item._id.toString());
}

export function favoritesCountMock(
  users: Partial<IUser>[],
  movies: Partial<IMovie>[]
) {
  const allFavorites = users.flatMap((user: Partial<IUser>) => [
    ...user.favorites!.map((movieId: ObjectId | string) =>
      movies.find((movie: Partial<IMovie>) => movie._id!.toString() === movieId)
    ),
  ]);

  const grouped = _(allFavorites)
    .groupBy((x: any) => x.title)
    .value();

  return Object.keys(grouped).reduce(
    (accum, key) => ({ ...accum, [key]: grouped[key].length }),
    {}
  );
}
