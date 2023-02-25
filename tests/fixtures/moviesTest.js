const createTestMovie = (notValidFields = []) => {
    
    const testMovie = {
        title: 'Romancing the Stone',
        category: '63f46aeda81bf016f8b54df6',
        year: 1984,
        duration: 106,
        director: '63e34af1beff9e4245bbf25b',
        description: 'The first one',
    }

  if (notValidFields.length > 0) {
    for (const key of Object.keys(testMovie)) {
        notValidFields.forEach(field => {
            if (field === key) {
                testMovie[key] = ''
            }
        });
      }
  }
  return testMovie;
};

module.exports = createTestMovie;