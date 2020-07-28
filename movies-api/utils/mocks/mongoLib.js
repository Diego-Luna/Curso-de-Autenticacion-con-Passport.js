const sinon = require('sinon');

// para simular los datos
const { moviesMock, filteredMoviesMock } = require('./movies');

// cremos nuestros stub
const getAllStub = sinon.stub();
// cuand llame a movies lo resulve con moviesMock
getAllStub.withArgs('movies').resolves(moviesMock);

// cuando llamemos las movies unsanto una qury, le devolvemos las peliculas filtradas por Drama
const tagQuery = { tags: { $in: ['Drama'] } };
getAllStub.withArgs('movies', tagQuery).resolves(filteredMoviesMock('Drama'));

// cuando llamemos nuestra funcionalidad de create, nos regresa el id
const createStub = sinon.stub().resolves(moviesMock[0].id);

// creamos la funcionalidad mongo lib
class MongoLibMock {
  // ver datos
  getAll(collection, query) {
    return getAllStub(collection, query);
  }

  // crear
  create(collection, data) {
    return createStub(collection, data);
  }
}

module.exports = {
  getAllStub,
  createStub,
  MongoLibMock
}