// es nativa de node.js
const assert = require('assert');
const proxyquire = require('proxyquire');

const { MongoLibMock, getAllStub } = require('../utils/mocks/mongoLib');
const { moviesMock } = require('../utils/mocks/movies');

// iniciamos con los test
describe('services - movies', function () {
  // incluimos nuestros servivios
  const MoviesServices = proxyquire('../services/movies', {
    '../lib/mongo': MongoLibMock,
  });

  // creamos una intancia de este servisio de los mocks
  const moviesServices = new MoviesServices();

  // cuando se llame el getmovies
  describe('When getMovies method is a called', async function () {
    // primer test
    it('should call the getall MongoLib method', async function () {
      // vemos que si se alla llamado
      await moviesServices.getMovies({});
      assert.strictEqual(getAllStub.called, true);
    });

    // Retorle la lista de las peliculas
    it("should return an array of movies", async function(){
      const result = await moviesServices.getMovies({});
      const expected = moviesMock;

      // deepEqual, por que vamos a colaborar objetos con muchos niveles
      assert.deepEqual(result, expected);
    })
  });
});
