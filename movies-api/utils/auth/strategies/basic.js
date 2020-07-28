const passport = require('passport');
// es la estrategia que bamos a usar con los usuarios
const { BasicStrategy } = require('passport-http');
// manejo de Errores
const boom = require('@hapi/boom');
// para berificar si el Pasword
const bcrypt = require('bcrypt');

// el que se va a encargar de buscar nuestro usuario.
const UsersService = require('../../../services/users');

//inicimao con la estrategia se autentificacion
passport.use(new BasicStrategy(async function (email, password, cb) {
  const userService = new UsersService();

  try {
    // usamos el getUser, para buscar nuestro usuario. al pasarle a email
    const user = await userService.getUser({ email });

    // si no existe el usuario
    if (!user) {
      // retornamos un error con Boom, y regresamos que no existe el usuario
      return cb(boom.unauthorized(), false);
    }

    // si el pasword no funciona
    // traemos nuestra libreria bcrypt
    if (!(await bcrypt.compare(password, user.password))) {
      return cb(boom.unauthorized(), false);
    }

    // borramos el pasword del usuario.
    delete user.password;

    // regresamos el
    return cb(null, user);

  } catch (error) {
    return cb(error);
  }

}))