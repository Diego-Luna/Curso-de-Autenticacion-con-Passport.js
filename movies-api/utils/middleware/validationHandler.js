// tramos boom
const boom = require('@hapi/boom');

// traemos joi
const joi = require('@hapi/joi');

// function validation(data, schema) {
function validate(data, schema) {
  
  // vemos si ahy un error con los datos
  // const { error } = joi.validate(data, schema); // version desactualisada
  const { error } = joi.object(schema).validate(data);// cambio en la validación

  return error;
}

//  es un middleware, de validacionde datos
// para integrarlo con "join y boom"
// function validationHandlers(schema, check = 'body') {
function validationHandler(schema, check = 'body') {

  return function(req, res, next) {
    const error = validate(req[check], schema);

    // error ? next(new Error(error)) : next();
    // como usamos boom cambiamos lo de arriva por lo de avajo:
    error ? next(boom.badRequest(error)) : next();
  };
}

module.exports = validationHandler;
