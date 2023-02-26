const createTestFavoriteMovie = (notValidFields = false) => {
    
    const testFavoriteMovie = {
        favoriteMovieId: '63d673686c7617a2557f0d2e'
    }

  if (notValidFields) {
    testFavoriteMovie.favoriteMovieId = ""
  }
  return testFavoriteMovie;
};

module.exports = createTestFavoriteMovie;