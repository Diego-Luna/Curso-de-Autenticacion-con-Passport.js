const express = require('express');

const UserMoviesService = require('../services/userMovies');
const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

const { movieIdSchema } = require('../utils/schemas/movies');
const { userIdSchema } = require('../utils/schemas/users');
const { createUserMovieschema } = require('../utils/schemas/userMovies');

// JWT strategy
require('../utils/auth/strategies/jwt');
const passport = require('passport');

function userMoviesApi(app) {
  const router = express.Router();
  app.use('/api/user-movies', router);


  const userMoviesService = new UserMoviesService();

  router.get(
      '/',
      passport.authenticate('jwt', { session: false }),
      scopesValidationHandler(['read:user-movies']),
      validationHandler({ userId: userIdSchema }, 'query'),
      async function(req, res, next) {
        const { userId } = req.query;

        try {
          const userMovies = await userMoviesService.getUserMovies({ userId });

          res.status(200).json({
            data: userMovies,
            message: 'user movies listed'
          });
        } catch (error) {
          next(error);
        }
      }
    );

  router.post(
      '/',
      passport.authenticate('jwt', { session: false }),
      scopesValidationHandler(['create:user-movies']),
      validationHandler(createUserMovieschema),
      async function(req, res, next) {
        const { body: userMovie } = req;

        try {
          const createdUserMovieId = await userMoviesService.createUserMovie({
            userMovie
          });

          res.status(201).json({
            data: createdUserMovieId,
            message: 'user movie created'
          });
        } catch (err) {
          next(err);
        }
      }
    );

  // router.delete(
  //   '/:movieId',
  //   passport.authenticate('jwt', { session: false }),
  //   scopesValidationHandler(['deleted:user-movies']),
  //   validationHandler({ movieId: movieIdSchema }, 'params'),
  //   async function (req, res, next) {
  //     const { movieId } = req.params;
  //     try {
  //       const deleteMoviesId = await userMoviesService.deleteUserMovie({ movieId });
  //
  //       // mandamos el estatus 200, que esta ok, y lo mandamos con .json
  //       res.status(200).json({
  //         data: deleteMoviesId, // los datos son lo que declaramos antes
  //         message: 'movies deleted', // Y los mensages para el cliente
  //       });
  //     } catch (err) {
  //       next(err);
  //     }
  //   }
  // );


  // router.delete(
  //     '/:userMovieId',
  //     passport.authenticate('jwt', { session: false }),
  //     scopesValidationHandler(['delete:user-movies']),
  //     validationHandler({ userMovieId: movieIdSchema }, 'params'),
  //     async function(req, res, next) {
  //       console.log(' --- vamos a sacar el id de la url --- ');
  //       const { userMovieId } = req.params;
  //
  //       try {
  //         console.log(' <-- entro al tryCatch -->');
  //         console.log(' =-- valor de pelicula --=',userMovieId);
  //
  //         const deletedUserMovieId = await userMoviesService.deleteUserMovie({
  //           userMovieId
  //         });
  //
  //         console.log(deletedUserMovieId);
  //
  //         res.status(200).json({
  //           data: deletedUserMovieId,
  //           message: 'user movie deleted'
  //         });
  //         console.log(' ¡-- salio bien --¡');
  //
  //       } catch (error) {
  //         console.log(' #-- no funcioneo --#');
  //         next(error);
  //       }
  //     }
  //   );

// este es el de 7 septiembre 10_57
  // router.delete('/:movieId',
  //   passport.authenticate('jwt', { session: false }),
  //   scopesValidationHandler(['delete:user-movies']),
  //   // validationHandler({ userMovieId: movieIdSchema }, 'params'),
  //   async function (req, res, next) {
  //     const { movieId } = req.params;
  //
  //     try {
  //       const deletedUserMovieId = await userMoviesService.deleteUserMovie({ movieId });
  //
  //       res.status(200).json({
  //         data: deletedUserMovieId,
  //         message: 'user movie deleted'
  //       });
  //
  //     } catch (error) {
  //       next(error);
  //     }
  //   });

  router.delete('/:movieId',
    passport.authenticate('jwt', { session: false }),
    // scopesValidationHandler(['delete:user-movies']),
    // validationHandler({ userMovieId: movieIdSchema }, 'params'),
    async function (req, res, next) {
      const { movieId } = req.params;
      const { body: userId } = req;

      try {

        const deletedUserMovieId = await userMoviesService.deleteUserMovie({ movieId, userId });

        res.status(200).json({
          data: deletedUserMovieId,
          message: 'user movie deleted'
        });

      } catch (error) {
        next(error);
      }
    });

}

module.exports = userMoviesApi;
