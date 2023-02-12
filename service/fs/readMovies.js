const fs = require('node:fs/promises');

const readMoviesFromFile = async () => {
  try {
    const movies = await fs.readFile('movies.json', {encoding: 'utf8'});
    console.log(movies);
  } catch (error) {
    console.log(error);
  }
};

module.exports = readMoviesFromFile;
