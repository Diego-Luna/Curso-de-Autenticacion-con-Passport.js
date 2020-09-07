
const MongoLib = require('../lib/mongo');

class UserMoviesService {
  constructor() {
    this.collection = 'user-movies';
    this.mongoDB = new MongoLib();
  }

  async getUserMovies({ userId }) {
    // creamos un query con el user ID,
    const query = userId && { userId };
    // sacamos las peliculas del usuario
    const userMovies = await this.mongoDB.getAll(this.collection, query);

    // retornamos las peliculas o sino un array bacio
    return userMovies || [];
  }

  async createUserMovie({ userMovie }) {
    // llamamos al metodo create de mongo, para crear la pelicula del usuario
    const createdUserMovieId = await this.mongoDB.create(this.collection, userMovie);

    // retornamos el id
    return createdUserMovieId;
  }

  async deleteUserMovie({ movieId, userId }) {
    // usamos el metodo de delete de mongo, para borrar la plicula
    const deletedUserMovieId = await this.mongoDB.deleteUserMovie(this.collection, movieId, userId);

    return deletedUserMovieId;
  }

}

module.exports = UserMoviesService;
