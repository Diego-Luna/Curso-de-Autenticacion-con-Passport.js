const boom = require('@hapi/boom');

function scopesValidationHandler(allowedScopes) {
  return function(req, res , next) {
    // sino existe el usuario, o los scopes
    if(!req.user || (req.user && !req.user.scopes)){
      next(boom.unauthorized('Missing scopes'));
    }

    // si existe el usuario, y si tiene los acsesos
    const hasAccess = allowedScopes
      .map(allowedScope => req.user.scopes.includes(allowedScope))
      .find(allowed => Boolean(allowed));
  
    if (hasAccess) {
      next();
    } else {
      next(boom.unauthorized('Insufficient scoopes'));
    }

  } 
}

module.exports = scopesValidationHandler;