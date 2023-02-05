import STATUS from 'http-status';
import { Request, Response, NextFunction } from 'express';
import * as moviesService from '../services/movies.service';
import { convertQueryToArray } from '../shared/helpers';

export async function getMovies(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { populatedFields } = req.query as { populatedFields: string };
    const movies = await moviesService.getMovies(
      convertQueryToArray(populatedFields)
    );

    res.status(STATUS.OK).send({ movies });
  } catch (error: any) {
    next(error);
  }
}

export async function getMovie(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { movieId } = req.params;
    const { populatedFields } = req.query as { populatedFields: string };
    const movie = await moviesService.getMovie(
      movieId,
      convertQueryToArray(populatedFields)
    );

    res.status(STATUS.OK).send(movie);
  } catch (error: any) {
    next(error);
  }
}

export async function createMovie(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const createdMovie = await moviesService.createMovie(req.body);

    res.status(STATUS.CREATED).send(createdMovie);
  } catch (error: any) {
    next(error);
  }
}

export async function updateMovie(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { movieId } = req.params;
    const updatedMovie = await moviesService.updateMovie(movieId, req.body);

    res.status(STATUS.OK).send(updatedMovie);
  } catch (error: any) {
    next(error);
  }
}

export async function deleteMovie(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { movieId } = req.params;
    await moviesService.deleteMovie(movieId);

    res.status(STATUS.NO_CONTENT).send();
  } catch (error: any) {
    next(error);
  }
}
