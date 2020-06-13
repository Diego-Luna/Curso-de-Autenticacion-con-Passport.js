const jwt = require('jsonwebtoken');

// los argumentos los sacaremos de la terminal.
// para ello usaremos proses argument
// option, va a hacer, verificar o firmar
// 
const [, , option, secret, nameOrToken] = process.argv;

if (!option || !secret || !nameOrToken) {
  console.log('Missing arguments');
}
// para generar el token
function singToken(payload, secret) {
  return jwt.sign(payload, secret);
}
// para estraes el token
function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

if (option == 'sign') {
  console.log(singToken({ sub: nameOrToken }, secret));
} else if (option == 'verify') {
  console.log( verifyToken(nameOrToken, secret) );
}else{
  console.log('options needs to be "sign" or "verify" ');
  
}