import STATUS from 'http-status';
import asyncHandler from 'express-async-handler';
import * as directorsService from '../services/directors.service';
import ApiError from '../shared/ApiError';

export const getDirectors = asyncHandler(async (req, res) => {
  const directors = await directorsService.getDirectors();

  res.status(STATUS.OK).send(directors);
});

export const getDirector = asyncHandler(async (req, res) => {
  const { directorId } = req.params;
  const director = await directorsService.getDirector(directorId);

  if (!director) {
    throw new ApiError(STATUS.NOT_FOUND, 'Director not found');
  }

  res.status(STATUS.OK).send(director);
});

export const createDirector = asyncHandler(async (req, res) => {
  const { firstName, lastName } = req.body;
  const createdDirector = await directorsService.createDirector({
    firstName,
    lastName,
  });

  res.status(STATUS.CREATED).send(createdDirector);
});

export const updateDirector = asyncHandler(async (req, res) => {
  const { directorId } = req.params;
  const { firstName, lastName } = req.body;
  const updatedDirector = await directorsService.updateDirector(directorId, {
    firstName,
    lastName,
  });

  if (!updatedDirector) {
    throw new ApiError(STATUS.NOT_FOUND, 'Director not found');
  }

  res.status(STATUS.OK).send(updatedDirector);
});

export const deleteDirector = asyncHandler(async (req, res) => {
  const { directorId } = req.params;
  const deletedDirector = await directorsService.deleteDirector(directorId);

  if (!deletedDirector) {
    throw new ApiError(STATUS.NOT_FOUND, 'Director not found');
  }

  res.status(STATUS.NO_CONTENT).send({});
});
