const request = require('supertest');
const app = require('../server');


describe('/movies', () => {
    let movieId;

    it('POST', async () => {
        const movie = {
            title: 'Romancing the Stone',
            category: '63f46aeda81bf016f8b54df6',
            year: 1984,
            duration: 106,
            director: '63e34af1beff9e4245bbf25b',
            description: 'The first one',
        }
        const { body } = await request(app)
            .post('/movies')
            .send(movie)
            .expect(201);
        expect(body.title).toEqual(movie.title);
        movieId = body._id;
    })

    it('GET by ID', async () => {
        const { body } = await request(app)
            .get(`/movies/${movieId}`)
            .expect(201);
        expect(body._id).toEqual(movieId);
    })

    it('GET invalid route', async () => {
        await request(app)
            .get(`/movie/${movieId}`)
            .expect(404);
    })

    it('PUT', async () => {
        const movie = {
            title: '',
            category: '',
            year: 1984,
            duration: 106,
            director: '63e34af1beff9e4245bbf25b',
            description: 'The first one',
        }
        const { body } = await request(app)
            .post('/movies')
            .send(movie)
            .expect(400);
        expect(body.errors[0].param).toEqual('title');
        expect(body.errors[1].param).toEqual('category');
    })

    it('DELETE', async () => {
        await request(app)
            .delete(`/movies/${movieId}`)
            .expect(201);
    })

    it('DELETE id not found', async () => {
        await request(app)
            .delete(`/movies/${movieId}`)
            .expect(400);
    })

    it('POST without title', async () => {
        const movie = {
            title: '',
            category: '63f46aeda81bf016f8b54df6',
            year: 1984,
            duration: 106,
            director: '63e34af1beff9e4245bbf25b',
            description: 'The first one',
        }
        const { body } = await request(app)
            .post('/movies')
            .send(movie)
            .expect(400);
        expect(body.errors[0].param).toEqual('title');
    })
});



