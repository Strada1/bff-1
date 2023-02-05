import { Types } from 'mongoose';
import STATUS from 'http-status';
import ApiError from '../shared/ApiError';
import {
  IDirector,
  Director,
  IDirectorOptional,
} from '../models/director.model';

export function getDirectors() {
  return Director.find().lean();
}

export async function getDirector(id: string | Types.ObjectId) {
  const director = await Director.findById(id).lean();

  if (!director) {
    throw new ApiError(STATUS.NOT_FOUND, 'Director not found');
  }

  return director;
}

export function createDirector({ firstName, lastName }: IDirector) {
  if (!firstName || !lastName) {
    throw new ApiError(STATUS.BAD_REQUEST, 'required fields are missing');
  }

  return Director.create({ firstName, lastName });
}

export async function updateDirector(
  id: Types.ObjectId | string,
  { firstName, lastName }: IDirectorOptional
) {
  const director = await Director.findByIdAndUpdate(
    id,
    { firstName, lastName },
    {
      new: true,
    }
  );

  if (!director) {
    throw new ApiError(STATUS.NOT_FOUND, 'Director not found');
  }

  return director;
}

export async function deleteDirector(id: string | Types.ObjectId) {
  const deletedDirector = await Director.findByIdAndDelete(id);

  if (!deletedDirector) {
    throw new ApiError(STATUS.NOT_FOUND, 'Director not found');
  }

  return deletedDirector;
}
