import STATUS from 'http-status';
import asyncHandler from 'express-async-handler';
import * as directorsService from '../services/directors.service';
import ApiError from '../shared/ApiError';
import { CACHE_KEYS, ERROR_TEXT } from '../shared/const';
import { CacheService } from '../services/cache.service';

const directorsCache = new CacheService();

export const getDirectors = asyncHandler(async (req, res) => {
  if (directorsCache.has(CACHE_KEYS.ALL_DIRECTORS)) {
    const cachedDirectors = directorsCache.get(CACHE_KEYS.ALL_DIRECTORS);

    res.status(STATUS.OK).send(cachedDirectors);
    return;
  }

  const directors = await directorsService.getDirectors();

  directorsCache.set(CACHE_KEYS.ALL_DIRECTORS, directors);
  res.status(STATUS.OK).send(directors);
});

export const getDirector = asyncHandler(async (req, res) => {
  const { directorId } = req.params;
  const director = await directorsService.getDirector(directorId);

  if (!director) {
    throw new ApiError(
      STATUS.NOT_FOUND,
      ERROR_TEXT.DIRECTORS.DIRECTOR_NOT_FOUND
    );
  }

  res.status(STATUS.OK).send(director);
});

export const createDirector = asyncHandler(async (req, res) => {
  const { firstName, lastName } = req.body;
  const createdDirector = await directorsService.createDirector({
    firstName,
    lastName,
  });

  directorsCache.delete(CACHE_KEYS.ALL_DIRECTORS);
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
    throw new ApiError(
      STATUS.NOT_FOUND,
      ERROR_TEXT.DIRECTORS.DIRECTOR_NOT_FOUND
    );
  }

  directorsCache.delete(CACHE_KEYS.ALL_DIRECTORS);
  res.status(STATUS.OK).send(updatedDirector);
});

export const deleteDirector = asyncHandler(async (req, res) => {
  const { directorId } = req.params;
  const deletedDirector = await directorsService.deleteDirector(directorId);

  if (!deletedDirector) {
    throw new ApiError(
      STATUS.NOT_FOUND,
      ERROR_TEXT.DIRECTORS.DIRECTOR_NOT_FOUND
    );
  }

  directorsCache.delete(CACHE_KEYS.ALL_DIRECTORS);
  res.status(STATUS.NO_CONTENT).send({});
});
