// nos traemos la dependencia de boom
const boom = require('@hapi/boom');

// nos traemos nuestro archivo de configuracion, el erros nos traiga el stac(informacion)
const { config } = require('../../config/index');

// esto no es un middleware.
function withErrorStack(error, stack) {
  // si estamos en desarrollo
  if (config.dev) {
    return { ...error, stack };
  }
  return error;
}

// va a hacer un console.log del error
function logErrors(err, req, res, next) {
  console.log(err);
  next(err);
}

function wrapErrors(err, req, res, next) {
  //  si el error no es boon
  if (!err.isBoom) {
    // llamamos al otro middleware
    next(boom.badImplementation(err));
  }
  // si el error es boom,
  next(err);
}

// para manegar los errores,
function errorHandler(err, req, res, next) { //eslint-disable-line
  // apartir del error boom
  const {
    output: { statusCode, payload },
  } = err;

  // express imprmi los errores en formato html , lo cambiamos a.json
  // como bamos a usar una pia en .json,
  // res.status(err.status || 500); //es un rroro por defecto del servidos
  // como usamos boom :
  res.status(statusCode);

  // res.json(withErrorStack(err.message, err.stack));
  // como usamos boom cambiamos lo de arriba por lo de avajo:
  res.json(withErrorStack(payload, err.stack));
}

// exportamos los modulos
module.exports = {
  logErrors,
  errorHandler,
  wrapErrors
};
