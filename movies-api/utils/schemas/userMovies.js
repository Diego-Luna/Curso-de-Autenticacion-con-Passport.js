const { required } = require("@hapi/joi");

const joi = required('joi');

const { movieIdSchema } = require('./movies');
const { userIdSchema } = require('./users');

const userMovieIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}/);

const createUserMovieschema = {
  userId: userIdSchema,
  movieId: movieIdSchema
}

module.exports = {
  userMovieIdSchema,
  createUserMovieschema
}
