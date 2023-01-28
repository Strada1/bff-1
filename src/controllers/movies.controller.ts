import STATUS from 'http-status';
import { Request, Response } from 'express';
import { Movie } from '../models/Movie.model';

export async function getMovies(req: Request, res: Response) {
  try {
    res.status(STATUS.OK).send({ movies: [] });
  } catch (error) {
    res.status(STATUS.INTERNAL_SERVER_ERROR).send({});
  }
}

export async function createMovie(req: Request, res: Response) {
  try {
    const { title, category } = req.body;

    if (!title || !category) {
      return res
        .status(STATUS.BAD_REQUEST)
        .send({ meta: 'required fields are missing' });
    }

    const createdMovie = await Movie.create(req.body);

    res.status(STATUS.CREATED).send(createdMovie);
  } catch (error) {
    res.status(STATUS.INTERNAL_SERVER_ERROR).send({});
  }
}

export async function editMovie(req: Request, res: Response) {
  try {
    res.status(STATUS.OK).send({});
  } catch (error) {
    res.status(STATUS.INTERNAL_SERVER_ERROR).send({});
  }
}

export async function deleteMovie(req: Request, res: Response) {
  try {
    res.status(STATUS.NO_CONTENT).send({});
  } catch (error) {
    res.status(STATUS.INTERNAL_SERVER_ERROR).send({});
  }
}
