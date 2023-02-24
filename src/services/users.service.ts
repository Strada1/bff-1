import { Types } from 'mongoose';
import { IUser, User } from '../models/users.model';
import { ROLES } from '../shared/const';
import * as passwordService from './password.service';
import * as tokenService from './token.service';

export function getUsers() {
  return User.find();
}

export function getUser(id: string | Types.ObjectId) {
  return User.findById(id);
}

export function getUserByEmail(email: string) {
  return User.findOne({ email }).lean();
}

export function getUserByToken(token: string) {
  return User.findOne({ token }).lean();
}

export function checkRole(user: IUser, role: string) {
  const roles = user?.roles;
  return roles?.includes(role);
}

export async function createUser(user: IUser) {
  const hashPassword = await passwordService.encryptPassword(user.password);
  const token = tokenService.createToken({ _id: user._id });
  const defaultRoles = [ROLES.USER];

  return User.create({
    ...user,
    roles: user.roles ?? defaultRoles,
    password: hashPassword,
    token,
  });
}

export async function addMovieToFavorites(
  id: string | Types.ObjectId,
  movie: string
) {
  return User.findByIdAndUpdate(
    { _id: id },
    { $addToSet: { favorites: movie } },
    { new: true }
  );
}

export async function removeMovieFromFavorites(
  id: string | Types.ObjectId,
  movie: string
) {
  return User.findByIdAndUpdate(
    { _id: id },
    { $pull: { favorites: movie } },
    { new: true }
  );
}

export async function addRoleToUser(id: string | Types.ObjectId, role: string) {
  return User.findByIdAndUpdate(
    { _id: id },
    { $addToSet: { roles: role } },
    { new: true }
  );
}

export async function removeRoleFromUser(
  id: string | Types.ObjectId,
  role: string
) {
  return User.findByIdAndUpdate(
    { _id: id },
    { $pull: { roles: role } },
    { new: true }
  );
}

export async function updateUser(
  id: string | Types.ObjectId,
  { username, password }: Partial<IUser>
) {
  const newData: Partial<IUser> = { username };

  if (password) {
    newData.password = await passwordService.encryptPassword(password);
  }

  return User.findByIdAndUpdate(id, newData, { new: true }).lean();
}

export function deleteUser(id: string | Types.ObjectId) {
  return User.findByIdAndDelete(id);
}

export async function authUser(
  email: IUser['email'],
  password: IUser['password']
) {
  const user = await getUserByEmail(email);

  if (!user) {
    return {};
  }

  const isPasswordCorrect = await passwordService.comparePassword(
    password,
    user.password
  );

  return {
    user,
    isPasswordCorrect,
  };
}

export async function aggregateByMovies() {
  const counts = await User.aggregate([
    { $unwind: { path: '$favorites' } },
    {
      $group: {
        _id: '$favorites',
        count: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: 'movies',
        localField: '_id',
        foreignField: '_id',
        as: 'movie',
      },
    },
  ]);

  return counts.reduce(
    (accum, current) => ({ ...accum, [current.movie[0].title]: current.count }),
    {}
  );
}
