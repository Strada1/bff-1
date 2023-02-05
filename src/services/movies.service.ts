import { Types } from 'mongoose';
import STATUS from 'http-status';
import ApiError from '../shared/ApiError';
import { IMovie, IMovieOptional, Movie } from '../models/movies.model';

export function getMovies(populatedFields: string[]) {
  return Movie.find().populate(populatedFields).lean();
}

export async function getMovie(
  id: string | Types.ObjectId,
  populatedFields: string[] = []
) {
  const movie = await Movie.findById(id).populate(populatedFields);

  if (!movie) {
    throw new ApiError(STATUS.NOT_FOUND, 'Movie not found');
  }

  return movie;
}

export function createMovie({
  title,
  category,
  year,
  duration,
  director,
}: IMovie) {
  if (!title || !category) {
    throw new ApiError(STATUS.BAD_REQUEST, 'required fields are missing');
  }

  return Movie.create({ title, category, year, duration, director });
}

export async function addComment(
  movieId: string | Types.ObjectId,
  commentId: Types.ObjectId
) {
  const updatedMovie = await Movie.findByIdAndUpdate(
    { _id: movieId },
    { $push: { comments: commentId } }
  );

  if (!updatedMovie) {
    throw new ApiError(STATUS.NOT_FOUND, 'Movie not found');
  }

  return updatedMovie;
}

export async function updateMovie(
  id: string | Types.ObjectId,
  { title, category, year, duration, director }: IMovieOptional
) {
  const updatedMovie = await Movie.findByIdAndUpdate(
    id,
    { title, category, year, duration, director },
    {
      new: true,
    }
  );

  if (!updatedMovie) {
    throw new ApiError(STATUS.NOT_FOUND, 'Movie not found');
  }

  return updatedMovie;
}

export async function deleteMovie(id: string) {
  const deletedMovie = await Movie.findByIdAndDelete(id);

  if (!deletedMovie) {
    throw new ApiError(STATUS.NOT_FOUND, 'Movie not found');
  }

  return deletedMovie;
}
