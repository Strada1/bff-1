import STATUS from 'http-status';
import asyncHandler from 'express-async-handler';
import * as usersService from '../services/users.service';
import ApiError from '../shared/ApiError';
import { ERROR_TEXT, ROLES } from '../shared/const';
import {
  getUserResponseDTO,
  getUsersResponseDTO,
  getFullUserResponseDTO,
} from '../dto/user.dto';
import { IUser } from '../models/users.model';

export const getUsers = asyncHandler(async (req, res) => {
  const users = await usersService.getUsers();

  res.status(STATUS.OK).send(getUsersResponseDTO(users));
});

export const getUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await usersService.getUser(userId);

  if (!user) {
    throw new ApiError(STATUS.NOT_FOUND, ERROR_TEXT.USERS.USER_NOT_FOUND);
  }

  res.status(STATUS.OK).send(getUserResponseDTO(user));
});

export const getFavoritesCount = asyncHandler(async (req, res) => {
  const result = await usersService.aggregateByMovies();

  res.status(STATUS.OK).send(result ?? []);
});

export const getUserRoles = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await usersService.getUser(userId);

  if (!user) {
    throw new ApiError(STATUS.NOT_FOUND, ERROR_TEXT.USERS.USER_NOT_FOUND);
  }

  res.status(STATUS.OK).send({ roles: user.roles });
});

export const getUserInfo = asyncHandler(async (req, res) => {
  res.status(STATUS.OK).send(getFullUserResponseDTO(req.user!));
});

export const createUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  const user = await usersService.getUserByEmail(email);

  if (user) {
    throw new ApiError(STATUS.BAD_REQUEST, ERROR_TEXT.USERS.USER_EXIST);
  }

  const createdUser = await usersService.createUser({
    email,
    username,
    password,
    roles: [ROLES.USER],
  });

  res.status(STATUS.CREATED).send(getFullUserResponseDTO(createdUser));
});

export const addMovieToFavorites = asyncHandler(async (req, res) => {
  const { _id } = req.user as IUser;
  const { movieId } = req.body;

  const updatedUser = await usersService.addMovieToFavorites(_id!, movieId);

  if (!updatedUser) {
    throw new ApiError(STATUS.NOT_FOUND, ERROR_TEXT.USERS.USER_NOT_FOUND);
  }

  res.status(STATUS.OK).send(getFullUserResponseDTO(updatedUser));
});

export const removeMovieFromFavorites = asyncHandler(async (req, res) => {
  const { _id } = req.user as IUser;
  const { movieId } = req.body;

  const updatedUser = await usersService.removeMovieFromFavorites(
    _id!,
    movieId
  );

  if (!updatedUser) {
    throw new ApiError(STATUS.NOT_FOUND, ERROR_TEXT.USERS.USER_NOT_FOUND);
  }

  res.status(STATUS.OK).send(getFullUserResponseDTO(updatedUser));
});

export const addRoleToUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;
  const isRoleValid = Object.values(ROLES).includes(role);

  if (!isRoleValid) {
    throw new ApiError(STATUS.BAD_REQUEST, ERROR_TEXT.USERS.NOT_VALID_ROLE);
  }

  const updatedUser = await usersService.addRoleToUser(userId, role);

  if (!updatedUser) {
    throw new ApiError(STATUS.NOT_FOUND, ERROR_TEXT.USERS.USER_NOT_FOUND);
  }

  res.status(STATUS.OK).send(getFullUserResponseDTO(updatedUser));
});

export const removeRoleFromUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;
  const isRoleValid = Object.values(ROLES).includes(role);

  if (!isRoleValid) {
    throw new ApiError(STATUS.BAD_REQUEST, ERROR_TEXT.USERS.NOT_VALID_ROLE);
  }

  const updatedUser = await usersService.removeRoleFromUser(userId, role);

  if (!updatedUser) {
    throw new ApiError(STATUS.NOT_FOUND, ERROR_TEXT.USERS.USER_NOT_FOUND);
  }

  res.status(STATUS.OK).send(getFullUserResponseDTO(updatedUser));
});

export const updateUserInfo = asyncHandler(async (req, res) => {
  const { _id } = req.user as IUser;
  const { username, password } = req.body;
  const updatedUser = await usersService.updateUser(_id!, {
    username,
    password,
  });

  if (!updatedUser) {
    throw new ApiError(
      STATUS.INTERNAL_SERVER_ERROR,
      ERROR_TEXT.SERVER.INTERNAL_ERROR
    );
  }

  res.status(STATUS.OK).send(getFullUserResponseDTO(updatedUser));
});

export const updateUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { username, password } = req.body;
  const updatedUser = await usersService.updateUser(userId, {
    username,
    password,
  });

  if (!updatedUser) {
    throw new ApiError(STATUS.NOT_FOUND, ERROR_TEXT.USERS.USER_NOT_FOUND);
  }

  res.status(STATUS.OK).send(getFullUserResponseDTO(updatedUser));
});

export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, isPasswordCorrect } = await usersService.authUser(
    email,
    password
  );

  if (!user || !isPasswordCorrect) {
    throw new ApiError(
      STATUS.UNAUTHORIZED,
      ERROR_TEXT.USERS.WRONG_USER_OR_PASSWORD
    );
  }

  res.status(STATUS.OK).send(getFullUserResponseDTO(user));
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const deletedUser = await usersService.deleteUser(userId);

  if (!deletedUser) {
    throw new ApiError(STATUS.NOT_FOUND, ERROR_TEXT.USERS.USER_NOT_FOUND);
  }

  res.status(STATUS.NO_CONTENT).send();
});
