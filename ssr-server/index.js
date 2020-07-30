const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const cookieParser = require('cookie-parser');
const axios = require('axios');

const { config } = require('./config');

// Agregamos las variables de timpo en segundos
const THIRTY_DAYS_IN_SEC = 2592000000;
const TWO_HOURS_IN_SEC = 7200000;

const app = express();

// body parser
app.use(express.json());
app.use(cookieParser());

//  Basic strategy
require('./utils/auth/strategies/basic');

app.post('/auth/sign-in', async function (req, res, next) {
  // Obtenemos el atributo rememberMe desde el cuerpo del request
  //const { rememberMe } = req.body;

  passport.authenticate("basic", function (error, data) {
    try {
      if (error || !data) {
        next(boom.unauthorized());
        console.log('boom unauthorized, linea 30');
      }

      req.login(data, { session: false }, async function (error) {
        if (error) {
          next(error);
        }

        const { token, ...user } = data;

        res.cookie("token", token, {
          httpOnly: !config.dev,
          secure: !config.dev
        });
        //    masAge: rememberMe ? THIRTY_DAYS_IN_SEC : TWO_HOURS_IN_SEC,

        res.status(200).json(user);
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
});

app.post("/auth/sign-up", async function (req, res, next) {
  // traemos el user de body
  const { body: user } = req;

  try {
    await axios({
      url: `${config.apiUrl}/api/auth/sign-up`,
      method: 'POST',
      data: user
    });

    // es el codigo http de que fue creado
    res.status(201).json({ message: 'user created' });
  } catch (error) {
    next(error);
  }

});

app.get("/movies", async function (req, res, next) {

});

app.post("/user-movies", async function (req, res, next) {
  try {
    const { body: userMovie } = req;
    const { token } = req.cookies;

    const { data, status } = await axios({
      url: `${config.apiUrl}/api/user-movies`,
      headers: { Authorization: `Bearer ${token}` },
      method: 'post',
      data: userMovie
    });

    // vemos si el status es diferente a 201
    if (status !== 201) {
      // si es difeente regresamos un error, general
      return next(boom.badImplementation());
    }

    // es el codigo http de que fue creado
    res.status(201).json(data);

  } catch (error) {
    next(error);
  }
});

app.delete("/user-movies/:userMovieId", async function (req, res, next) {
  try {
    const { userMovieId } = req.params;
    const { token } = req.cookies;

    const { data, status } = await axios({
      url: `${config.apiUrl}/api/user-movies/${userMovieId}`,
      headers: { Authorization: `Bearer ${token}` },
      method: 'delete',
    });

    // vemos si el status es diferente a 200
    if (status !== 200) {
      // si es difeente regresamos un error, general
      return next(boom.badImplementation());
    }

    // es el codigo http de que esta ok
    res.status(200).json(data);

  } catch (error) {
    next(error);
  }
});

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});