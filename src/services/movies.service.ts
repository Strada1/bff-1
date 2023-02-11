import { SortOrder, Types } from 'mongoose';
import { IMovie, MovieOptional, Movie } from '../models/movies.model';

export function getMovies({
  year,
  sortOrder,
  populatedFields,
}: {
  year: string;
  sortOrder: SortOrder;
  populatedFields: string[];
}) {
  const query = Movie.find().populate(populatedFields);

  if (year) {
    query.where('year', year);
  }

  if (sortOrder) {
    query.sort({ title: sortOrder });
  }

  return query;
}

export function getMovie(
  id: string | Types.ObjectId,
  populatedFields: string[] = []
) {
  return Movie.findById(id).populate(populatedFields);
}

export function createMovie(movie: IMovie) {
  return Movie.create(movie);
}

export function addComment(
  movieId: string | Types.ObjectId,
  commentId: string | Types.ObjectId
) {
  return Movie.findByIdAndUpdate(
    { _id: movieId },
    { $addToSet: { comments: commentId } }
  );
}

export function deleteComment(
  movieId: string | Types.ObjectId,
  commentId: string | Types.ObjectId
) {
  return Movie.findByIdAndUpdate(
    { _id: movieId },
    { $pull: { comments: commentId } }
  );
}

export function updateMovie(id: string | Types.ObjectId, data: MovieOptional) {
  return Movie.findByIdAndUpdate(id, data, { new: true });
}

export function deleteMovie(id: string) {
  return Movie.findByIdAndDelete(id);
}

export function aggregateByDirector() {
  return Movie.aggregate([
    {
      $group: {
        _id: '$director',
        moviesCount: {
          $sum: 1,
        },
      },
    },
  ]);
}

export function aggregateByDates({ from, to }: { from: number; to: number }) {
  return Movie.aggregate([
    {
      $match: { year: { $gte: from, $lte: to } },
    },
    { $count: 'count' },
  ]);
}
