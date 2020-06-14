const assert = require('assert');
const proxyquire = require('proxyquire');

const { moviesMock, MoviesServiceMock } = require('../utils/mocks/movies.js');
const testServer = require('../utils/testServer');

// como describimos nuestros test
describe('routes - movies', function () {
  // Para poder provar nuestras rutas :
  const route = proxyquire('../routes/movies', {
    // los sevicios se ran remplasados, por no se van a testear
    '../services/movies': MoviesServiceMock,
  });

  // creamos un recuest, con las rutas con los mocks
  const request = testServer(route);

  // el teste de las peliculas
  describe.only('GET /movies', function () {
    // deveria responder con un status 20
    it('should respond with status 200', function (done) {
      request.get('/api/movies').expect(200, done);
    });
    // vemos lo que devuelve
    it('should respond with the list of movies', function (done) {
      request.get('/api/movies').end((err, res) => {
        // cpmparamos objetos
        assert.deepEqual(res.body, {
          // comprobamos que regrese estos datos:
          data: moviesMock,
          message: 'movies listed',
        });
        // finalisa
        done();
      });
    });
  });

  describe.only('POST /movies/', function () {
    it('should respond with status 201', function (done) {
      request.post('/api/movies').expect(201, done);
    });

    it('Should respond with the movie created id', function (done) {
      request.post('/api/movies').end((err, res) => {
        assert.deepEqual(res.body, {
          data: moviesMock[0].id,
          message: 'movie created',
        });

        done();
      });
    });
  });

  
});
