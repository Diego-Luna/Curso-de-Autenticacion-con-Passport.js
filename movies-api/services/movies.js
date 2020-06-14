//  los Mocks son atchivos falsos
// const { moviesMocks } = require('../utils/mocks/movies');

// importamos la libreria de mongoDB
const MongoLib = require('../lib/mongo');

class MoviesService {
  // para usar MongoLib, ponemos en el construptor las promiedades
  constructor() {
    // lo agregamos en la colecion
    this.collection = 'movies';
    // instanciamos nuestra libreria de mongo
    this.mongoDB = new MongoLib();
  }

  async getMovies({ tags }) {
    // si essisten los tags, construimos el query, los tags que esten dentro de los tags, lo resibe mongo
    const query = tags && { tags: { $in: tags } };

    // const movies = await Promise.resolve(moviesMocks);
    // podemos llamar la instancia de la libreria de mongo, le ponemos la collecion movies y un query
    // construimos un query, para poner por generos
    const movies = await this.mongoDB.getAll(this.collection, query);

    return movies || [];
  }

  // eslint-disable-next-line no-dupe-class-members
  // le masamos la movieID
  async getMovie({ movieId }) {
    // const movie = await Promise.resolve(moviesMocks[0]);
    const movie = await this.mongoDB.get(this.collection, movieId);

    return movie || {};
  }

  // async createMovies() {
  async createMovie({ movie }) {
    // const createMovieId = await Promise.resolve(moviesMocks[0].id);

    const createMovieId = await this.mongoDB.create(this.collection, movie);

    return createMovieId;
  }

  //resivimos el id, y la pelicula
  // async updateMovies() {
  async updateMovie({ movieId, movie } = {}) {
    // const updateMovieId = await Promise.resolve(moviesMocks[0].id);
    const updateMovieId = await this.mongoDB.update(
      this.collection,
      movieId,
      movie
    );

    return updateMovieId;
  }

  // le pasamos el id
  async deleteMovie({ movieId }) {
    // const deleteMovieId = await Promise.resolve(moviesMocks[0].id);
    const deleteMovieId = await this.mongoDB.delete(this.collection, movieId);
    return deleteMovieId;
  }

  // reto
  // async partialUpdateMovie() {
  //   const replacedMovie = await Promise.resolve(moviesMocks[0]);
  //   return replacedMovie;
  // }
}

module.exports = MoviesService;
