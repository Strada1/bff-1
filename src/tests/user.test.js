const request = require("supertest");
const app = require("../server/server");
const { user } = require("./fixtures/user");

jest.spyOn(console, 'log').mockImplementation(() => null);

describe('/users', () => {

  it('CREATE USER', async () => {

    const { body } = await request(app)
      .post('/users')
      .send(user)
      .expect(201);
    expect(body.email).toEqual(user.email);
    expect(body.password).toEqual(user.password);
    expect(body.roles).toEqual(user.roles);
  })

  afterAll((done) => {
    app.close();
    done();
  });

});