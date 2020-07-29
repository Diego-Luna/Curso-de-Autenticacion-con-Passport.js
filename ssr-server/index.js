const express = require("express");
const passport = require('passport');
const boom = require('@hapi/boom');
const cookieParser = require("cookie-parser");
const axios = require("axios");

const { config } = require("./config");

const app = express();

// body parser
app.use(express.json());
app.use(cookieParser());

//  Basic strategy
require("./utils/auth/strategies/basic");

app.post("/auth/sign-in", async function (req, res, next) {
  passport.authenticate("basic", function (error, data) {
    try {
      // si hay un error o no hay datos
      if (error || !data) {
        // regresamos un error
        next(boom.unauthorized());
      }

      // si toda sali bien
      // la session va a hacer falso, por que no manejamos estado
      req.login(data, { session: false }, async function (error) {
        // si hay un error, llamamos a next
        if (error) {
          next(error);
        }

        // destructuramos nuestros datos
        const { token, ...user } = data;

        // definimos una cookie,
        res.cookie("token", token, {
          httpOnly: !config.dev,
          secure: !config.dev
        });
        // en produccion lo devemos acseder por http, por un servidor
        // y sea manajada por HTTPS

        // regresamos un ok, y el usuarios
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

});

app.delete("/user-movies/:userMovieId", async function (req, res, next) {

});

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});