import STATUS from 'http-status';
import { NextFunction, Request, Response } from 'express';
import * as directorsService from '../services/directors.service';

export async function getDirectors(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const directors = await directorsService.getDirectors();

    res.status(STATUS.OK).send(directors);
  } catch (error) {
    next(error);
  }
}

export async function getDirector(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { directorId } = req.params;
    const director = await directorsService.getDirector(directorId);

    res.status(STATUS.OK).send(director);
  } catch (error: any) {
    next(error);
  }
}

export async function createDirector(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const createdDirector = await directorsService.createDirector(req.body);

    res.status(STATUS.CREATED).send(createdDirector);
  } catch (error) {
    next(error);
  }
}

export async function updateDirector(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { directorId } = req.params;
    const updatedDirector = await directorsService.updateDirector(
      directorId,
      req.body
    );

    res.status(STATUS.OK).send(updatedDirector);
  } catch (error: any) {
    next(error);
  }
}

export async function deleteDirector(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { directorId } = req.params;
    await directorsService.deleteDirector(directorId);

    res.status(STATUS.NO_CONTENT).send({});
  } catch (error: any) {
    next(error);
  }
}
