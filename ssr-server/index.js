const express = require("express");
const passport = require("passport");
const session = require("express-session");
const boom = require("@hapi/boom");
const cookieParser = require("cookie-parser");
const axios = require("axios");

const { config } = require("./config");

const app = express();

// body parser
app.use(express.json());
app.use(cookieParser());
// le pasamos secret, para que lo codigique
app.use(session({ secret: config.sessionSecret }));
// inicialisamos la session
app.use(passport.initialize());
app.use(passport.session());

// el tiempo de vida de la atorisacion
// Agregamos las variables de timpo en milisegundos
const THIRTY_DAYS_IN_SEC = 2592000000;
const TWO_HOURS_IN_SEC = 7200000;

//  Basic strategy
require("./utils/auth/strategies/basic");

// OAuth strategy
require('./utils/auth/strategies/oauth');

// google strategy
require('./utils/auth/strategies/google');

// twitter strategy
require('./utils/auth/strategies/twitter');

// twitter facebook
require('./utils/auth/strategies/facebook');

app.post("/auth/sign-in", async function (req, res, next) {

  // Obtenemos el atributo rememberMe desde el cuerpo del request
  const { rememberMe } = req.body;


  passport.authenticate("basic", function (error, data) {
    try {
      if (error || !data) {
        next(boom.unauthorized());
      }

      req.login(data, { session: false }, async function (error) {
        if (error) {
          next(error);
        }

        const { token, ...user } = data;

        // res.cookie("token", token, {
        //   httpOnly: !config.dev,
        //   secure: !config.dev
        // });

        // Si el atributo rememberMe es verdadero la expiración será en 30 dias
        // de lo contrario la expiración será en 2 horas
        res.cookie("token", token, {
          httpOnly: !config.dev,
          secure: !config.dev,
          maxAge: rememberMe ? THIRTY_DAYS_IN_SEC : TWO_HOURS_IN_SEC
        });

        res.status(200).json(user);
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
});

app.post("/auth/sign-up", async function (req, res, next) {
  const { body: user } = req;

  try {
    await axios({
      url: `${config.apiUrl}/api/auth/sign-up`,
      method: "post",
      data: user
    });

    res.status(201).json({ message: "user created" });
  } catch (error) {
    next(error);
  }
});

app.get("/movies", async function (req, res, next) { });

app.post("/user-movies", async function (req, res, next) {
  try {
    const { body: userMovie } = req;
    const { token } = req.cookies;

    const { data, status } = await axios({
      url: `${config.apiUrl}/api/user-movies`,
      headers: { Authorization: `Bearer ${token}` },
      method: "post",
      data: userMovie
    });

    if (status !== 201) {
      return next(boom.badImplementation());
    }

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
      method: "delete"
    });

    if (status !== 200) {
      return next(boom.badImplementation());
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

// OAuth strategy
app.get(
  "/auth/google-oauth",
  passport.authenticate("google-oauth", {
    scope: ["email", "profile", "openid"]
  })
);

app.get(
  "/auth/google-oauth/callback",
  passport.authenticate("google-oauth", { session: false }),
  function (req, res, next) {
    if (!req.user) {
      next(boom.unauthorized());
    }

    const { token, ...user } = req.user;

    res.cookie("token", token, {
      httpOnly: !config.dev,
      secure: !config.dev
    });

    res.status(200).json(user);
  }
);

// google strategy
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile", "openid"]
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  function (req, res, next) {
    if (!req.user) {
      next(boom.unauthorized());
    }

    const { token, ...user } = req.user;

    res.cookie("token", token, {
      httpOnly: !config.dev,
      secure: !config.dev
    });

    res.status(200).json(user);
  }
);

// asemos la ruta, para autentificacion con twitter
app.get("/auth/twitter", passport.authenticate("twitter"));

app.get("/auth/twitter/callback",
  passport.authenticate("twitter", { session: false }),
  function (req, res, next) {
    if (!req.user) {
      next(boom.unauthorized());
    }
    // si toda sale bien
    const { token, ...user } = req.user;

    res.cookie("token", token, {
      httpOnly: !config.dev,
      secure: !config.dev
    });

    // regresamos el usuario en json,
    res.status(200).json(user);

  })

// facebook
app.get('/auth/facebook', passport.authenticate('facebook', {
  scope: ['email'],
})
);

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  function (req, res, next) {
    if (!req.user) {
      next(boom.unauthorized());
    }

    const { token, ...user } = req.user;

    res.cookie("token", token, {
      httpOnly: !config.dev,
      secure: !config.dev
    });

    res.status(200).json(user);
  }
);

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});
