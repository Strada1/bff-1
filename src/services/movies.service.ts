import { Types } from 'mongoose';
import STATUS from 'http-status';
import ApiError from '../shared/ApiError';
import { IMovie, IMovieOptional, Movie } from '../models/movies.model';

export function getMovies(populatedFields: string[]) {
  return Movie.find().populate(populatedFields).lean();
}

export function getMovie(
  id: string | Types.ObjectId,
  populatedFields: string[] = []
) {
  return Movie.findById(id).populate(populatedFields);
}

export function createMovie({
  title,
  category,
  year,
  duration,
  director,
}: IMovie) {
  return Movie.create({ title, category, year, duration, director });
}

export async function addComment(
  movieId: string | Types.ObjectId,
  commentId: string | Types.ObjectId
) {
  const updatedMovie = await Movie.findByIdAndUpdate(
    { _id: movieId },
    { $addToSet: { comments: commentId } }
  );

  if (!updatedMovie) {
    throw new ApiError(STATUS.NOT_FOUND, 'Movie not found');
  }

  return updatedMovie;
}

export async function deleteComment(
  movieId: string | Types.ObjectId,
  commentId: string | Types.ObjectId
) {
  const updatedMovie = await Movie.findByIdAndUpdate(
    { _id: movieId },
    { $pull: { comments: commentId } }
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
    { new: true }
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
