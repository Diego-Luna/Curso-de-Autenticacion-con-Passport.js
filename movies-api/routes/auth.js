const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const ApiKeysService = require('../services/apiKeys');
// para crear usuarios, y los validamos
const UsersService = require('../services/users');
const validationHandler = require('../utils/middleware/validationHandler');

const { createUserSchema, createProviderUserSchema } = require('../utils/schemas/users');

const { config } = require('../config');

// strategia Basic
require('../utils/auth/strategies/basic');

function authApi(app) {
  const router = express.Router();
  app.use('/api/auth', router);

  const apiKeysService = new ApiKeysService();
  const usersService = new UsersService();

  router.post('/sign-in', async function (req, res, next) {
    // del cuerpo bengan el apiKeyToken, para dar los permisos
    const { apiKeyToken } = req.body;

    // si no existe
    if (!apiKeyToken) {
      next(boom.unauthorized('apiKeyToken is required'));
    }

    // si existe
    passport.authenticate('basic', function (error, user) {
      try {
        // su hay un error, o no existe el usuario
        if (error || !user) {
          next(boom.unauthorized());
        }

        // si el usuario existe, hacemos el Login
        // no vamos a manejar el estado de session
        req.login(user, { session: false }, async function (error) {
          if (error) {
            // si hay un error, lo manejamos
            next(error);
          }
          // si no
          const apiKey = await apiKeysService.getApiKey({ token: apiKeyToken });

          if (!apiKey) {
            next(boom.unauthorized());
          }

          // construimos nuestro jwt
          const { _id: id, name, email } = user;

          const payload = {
            sub: id,
            name,
            email,
            scopes: apiKey.scopes
          }

          // creamos un token, y lo firmamos son nuestro secret,
          // y le damos una opccion para que expire en 15 minutos, para tener un token seguro
          const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: '15m'
          });

          return res.status(200).json({ token, user: { id, name, email } });
        });

      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  // nueva ruta
  router.post('/sign-up', validationHandler(createUserSchema),
    async function (req, res, next) {
      const { body: user } = req;

      try {
        // llamar nuestro servicio de creacion de usuario
        const createdUserId = await usersService.createUser({ user });

        // si todo fue vien
        res.status(201).json({
          data: createdUserId,
          message: 'user created'
        });

      } catch (error) {
        next(error);
      }
    });

  // la ruta para los usuarios
  router.post('/sign-provider',
    validationHandler(createProviderUserSchema),

    async function (req, res, next) {
      // sacamos el body del Req
      const { body } = req;

      const { apiKeyToken, ...user } = body;
      if (!apiKeyToken) {
        next(boom.unauthorized('apiKeyToken is required'));
      }

      try {
        const queriedUser = await usersService.getOrCreateUser({ user });
        const apiKey = await apiKeysService.getApiKey({ token: apiKeyToken });

        if (!apiKey) {
          next(boom.unauthorized());
        }

        // si todo sale bien
        const { _id: id, name, email } = queriedUser;

        const payload = {
          sub: id,
          name,
          email,
          scopes: apiKey.scopes
        };

        // asemos el sing-in, que es para terceros como google
        //  y exprira en 15 minutos
        const token = jwt.sign(payload, config.authJwtSecret, {
          expiresIn: '15m'
        });

        return res.status(200).json({ token, user: { id, name, email } });
      } catch (error) {
        next(error);
      }
    });
}

module.exports = authApi;