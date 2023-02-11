const fs = require('node:fs/promises');
const { addMovie } = require('./movieService')

const validate = (data, requiredFields) => {
  const missingFields = [];
  for (const field of requiredFields) {
    if (!data[field]) {
      missingFields.push(field);
    }
  }
  return missingFields;
};

const uploadFileToDB = async (path) => {
  try {
    const data = await fs.readFile(path, { encoding: 'utf8' });
    const movies = JSON.parse(data)
    for (const movie of movies) {
      const missingFields = validate(movie, ['title', 'year', 'directorId'])
      missingFields.length > 0 ? console.log(`The movie is not loaded: ${movie?.title}`) : await addMovie(movie)
    }
  } catch (e) {
    console.log(e)
  }
}

module.exports = { uploadFileToDB }
