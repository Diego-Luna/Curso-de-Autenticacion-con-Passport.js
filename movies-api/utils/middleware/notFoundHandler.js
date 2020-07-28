const boom = require('@hapi/boom');

function notFoundHandler(req, res) {
  // esto es para el error 404,
  // statusCode = es el error 404
  //  payload
  const {
    output: { statusCode, payload }
  } = boom.notFound();

  res.status(statusCode).json(payload);
}

module.exports = notFoundHandler;
