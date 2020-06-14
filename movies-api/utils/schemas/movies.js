// joi funciona para validar y hacer los esquemas
const joi  = require('@hapi/joi');

// le decimos que va acer un string, 
// y como usamos mongo deve usamos .regex("expresion regular")
// inicia con cualquier caracater alfa numerico del 0-9, de la a-f, de la A-F, Todo esto es por que alfadecimal, con un tamaño de 24
const movieIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
// va a hacer un string, con un maximo de 80
const movieTitleSchema = joi.string().max(80);
// va hacer un numero, con un minimo 1888 el año y permitimos hasta el año 2077
const movieYearSchema = joi.number().min(1888).max(2077);
// va a hacer un string y una url de referencia la img.
const movieCoverSchema = joi.string().uri()
// va a hcar un string con un maximo de 300 caracteres.
const movieDescriptionSchema = joi.string().max(300);
// va acer un tipo nimero con un minimo de 1 - 300 minutos
const movieDurationSchema = joi.number().min(1).max(300);
// va acer un string con un maximo de 5 caraacteres
const movieContentRatingSchema = joi.string().max(5);
const movieSourceSchema = joi.string().uri();
// va hacer un array, que tenga items con string de maximo 50 caracteres
const movieTagsSchema = joi.array().items(joi.string().max(50));

const createMovieSchema = {
  // si es requeri po nemos ".required()"
  title: movieTitleSchema.required(),
  year: movieYearSchema.required(),
  cover: movieCoverSchema.required(),
  description: movieDescriptionSchema.required(),
  duration: movieDurationSchema.required(),
  contentRating: movieContentRatingSchema.required(),
  source: movieSourceSchema.required(),
  tags: movieTagsSchema
}

const updateMovieSchema = {
  title: movieTitleSchema,
  year: movieYearSchema,
  cover: movieCoverSchema,
  description: movieDescriptionSchema,
  duration: movieDurationSchema,
  contentRating: movieContentRatingSchema,
  source: movieSourceSchema,
  tags: movieTagsSchema
}

module.exports = {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema
}