const fs = require('node:fs/promises');
const { createMovie } = require('../bff-1/services/movieService');

const fileReading = async () => {

    try {
        const file = await fs.readFile('movies.json', { encoding: 'utf8' });
        const movies = JSON.parse(file);

        for (let i = 0; i < movies.length; i++) {
            if (!movies[i].title) return console.error(`Title field missing in "${[i]} item"`)
            if (!movies[i].category) return console.error(`Category field missing in movie "${movies[i].title}"`)
        }

        const requestFromFile = async () => {
            for (const item of movies) {
                const movie = await createMovie({
                    title: item.title,
                    category: Object.values(item.category)[0],
                    year: item.year,
                    duration: item.duration,
                    director: Object.values(item.director)[0]
                })
            }
        };
        await requestFromFile();

        return console.log('All movies created');
    } catch (err) {
        console.error(err);
    }
};

module.exports = fileReading;

