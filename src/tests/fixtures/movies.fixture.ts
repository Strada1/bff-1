export const movie = {
  title: 'test',
  year: 1234,
  duration: 200,
  category: '63e382d1848d4c8af8847773',
  director: '63de2aa638e756a3922dfc0b',
  description: 'test',
};

export const invalidMovie = {
  title: '',
  year: 124,
  duration: 'x',
  category: '63e382d1848d4c8af884773',
  director: '63de2aa638e756a3922dfcb',
  description: '',
};

export function generateMoviesMock(count: number) {
  const result = [];

  for (let i = 0; i < count; i += 1) {
    result.push({
      ...movie,
      title: movie.title + i,
    });
  }

  return result;
}

export const wrongMovieId = '63e382d1848d4c8af8847773';
