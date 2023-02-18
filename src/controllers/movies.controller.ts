import STATUS from 'http-status';
import asyncHandler from 'express-async-handler';
import { SortOrder } from 'mongoose';
import * as moviesService from '../services/movies.service';
import { convertQueryToArray } from '../shared/helpers';
import ApiError from '../shared/ApiError';
import { CacheService } from '../services/cache.service';
import { CACHE_KEYS, ERROR_TEXT } from '../shared/const';

export const moviesCache = new CacheService();

export const getMovies = asyncHandler(async (req, res) => {
  const { year, sort, populatedFields } = req.query as {
    year: string;
    sort: SortOrder;
    populatedFields: string;
  };
  const requestHasOptions = Object.keys(req.query).length > 0;

  if (!requestHasOptions && moviesCache.has(CACHE_KEYS.ALL_MOVIES)) {
    const cachedMovies = moviesCache.get(CACHE_KEYS.ALL_MOVIES);

    res.status(STATUS.OK).send(cachedMovies);
    return;
  }

  const movies = await moviesService.getMovies({
    year,
    sortOrder: sort,
    populatedFields: convertQueryToArray(populatedFields),
  });

  if (!requestHasOptions) {
    moviesCache.set(CACHE_KEYS.ALL_MOVIES, movies);
  }

  res.status(STATUS.OK).send(movies);
});

export const getMovie = asyncHandler(async (req, res) => {
  const { movieId } = req.params;
  const { populatedFields } = req.query as { populatedFields: string };
  const movie = await moviesService.getMovie(
    movieId,
    convertQueryToArray(populatedFields)
  );

  if (!movie) {
    throw new ApiError(STATUS.NOT_FOUND, ERROR_TEXT.MOVIES.MOVIE_NOT_FOUND);
  }

  res.status(STATUS.OK).send(movie);
});

export const createMovie = asyncHandler(async (req, res) => {
  const { title, category, year, duration, director, description } = req.body;

  const createdMovie = await moviesService.createMovie({
    title,
    category,
    year,
    duration,
    director,
    description,
  });

  moviesCache.delete(CACHE_KEYS.ALL_MOVIES);
  res.status(STATUS.CREATED).send(createdMovie);
});

export const updateMovie = asyncHandler(async (req, res) => {
  const { movieId } = req.params;
  const { title, category, year, duration, director } = req.body;
  const updatedMovie = await moviesService.updateMovie(movieId, {
    title,
    category,
    year,
    duration,
    director,
  });

  if (!updatedMovie) {
    throw new ApiError(STATUS.NOT_FOUND, ERROR_TEXT.MOVIES.MOVIE_NOT_FOUND);
  }

  moviesCache.delete(CACHE_KEYS.ALL_MOVIES);
  res.status(STATUS.OK).send(updatedMovie);
});

export const deleteMovie = asyncHandler(async (req, res) => {
  const { movieId } = req.params;
  const deletedMovie = await moviesService.deleteMovie(movieId);

  if (!deletedMovie) {
    throw new ApiError(STATUS.NOT_FOUND, ERROR_TEXT.MOVIES.MOVIE_NOT_FOUND);
  }

  moviesCache.delete(CACHE_KEYS.ALL_MOVIES);
  res.status(STATUS.NO_CONTENT).send();
});

export const aggregateByDirector = asyncHandler(async (req, res) => {
  const movies = await moviesService.aggregateByDirector();

  res.status(STATUS.OK).send(movies);
});

export const aggregateByDates = asyncHandler(async (req, res) => {
  const { from, to } = req.query as {
    from: string;
    to: string;
  };
  const movies = await moviesService.aggregateByDates({
    from: Number(from),
    to: Number(to),
  });

  res.status(STATUS.OK).send(movies);
});
