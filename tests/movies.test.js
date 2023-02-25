const request = require('supertest');
const app = require('../server');
jest.spyOn(console, 'log').mockImplementation(() => '');
const createTestMovie = require('./fixtures/moviesTest');



describe('/movies', () => {
    let movieId;

    it('POST', async () => {
        const movie = createTestMovie();
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

    it('GET invalid id', async () => {
        await request(app)
            .get(`/movie/${movieId}`)
            .expect(404);
    })

    it('PUT', async () => {
        const movie = createTestMovie(['title', 'category'])
        const { body } = await request(app)
            .post('/movies')
            .send(movie)
            .expect(400);
        expect(body.errors[0].param).toEqual('title');
        expect(body.errors[1].param).toEqual('category');

    })

    it('DELETE', async () => {
        const { body } = await request(app)
            .delete(`/movies/${movieId}`)
            .expect(201);
    })

    it('DELETE id not found', async () => {
        await request(app)
            .delete(`/movies/${movieId}`)
            .expect(400);
    })

    it('POST without title', async () => {
        const movie = createTestMovie(['title'])
        const { body } = await request(app)
            .post('/movies')
            .send(movie)
            .expect(400);
        expect(body.errors[0].param).toEqual('title');
    })
});



