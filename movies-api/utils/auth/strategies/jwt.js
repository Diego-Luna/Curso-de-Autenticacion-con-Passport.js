const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('@hapi/boom');

const UsersService = require('../../../services/users');
const { config } = require('../../../config');

// definimos nuestra estrategia
passport.use(
  // el secret, lo traemos de configuracion
  // el jwt, lo sacamos del header, cunado agamos una peticion, para mandar el jwt
  new Strategy({
    secretOrKey: config.authJwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  },

    // para mandar le jwt, en el heder como el vider token
    // adonde veremos si se encruentra el usuario,
    async function (tokenPayload, cb) {
      const usersService = new UsersService();

      try {
        const user = await usersService.getUser({ email: tokenPayload.email });

        // si no encontramos el usuario
        if (!user) {
          return cb(boom.unauthorized(), false);
        }

        delete user.password;

        cb(null, { ...user, scopes: tokenPayload.scopes });

      } catch (error) {
        cb(error);
      }
    }
  )
)