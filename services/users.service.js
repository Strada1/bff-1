const { MovieModal } = require('../models/Movies');

class MoviesService {
  getAllMovies({ sort, title, year }) {
    const query = MovieModal.find().populate('director');
    if (title) query.where('title', title);
    if (year) query.where('year', year);
    if (sort) query.sort({ year: sort });
    return query.exec();
  }
}

module.exports = new MoviesService();
