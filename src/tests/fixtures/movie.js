const movie = {
  title: 'Testing film from fixtures',
  year: 2023,
  duration: 121,
  category: '63e8ad373151581052425a3c',
  director: '63e647de2f05feef04b3862b',
  comments: []
};

const movie2Test = {
  "title": "Movie change",
  "duration": 109,
  "movie": "Зеленая миля",
  "year": 1990,
  "directorId": "63e7acb2c69eaad81081f2dd",
}

const movieWithError = {
  title: '{Error_*!@^{|} title',
  year: 'Две тысячи 23 year',
  director: '75767472193489124'
};

module.exports = { movie, movieWithError, movie2Test };