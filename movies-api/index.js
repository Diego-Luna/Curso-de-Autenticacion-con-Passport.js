/* eslint-disable no-console */
const express = require('express');

const app = express();

// --- usamos CORS ---
var cors = require('cors')
// --- usamos CORS ---

// -- Helmet --
const helmet = require('helmet');
app.use(helmet());
// -- Helmet --


const { config } = require('./config/index');

const moviesApi = require('./routes/movies');

// --- middleware ---
const { //de los errores
  logErrors,
  wrapErrors,
  errorHandler,
} = require('./utils/middleware/errorHandlers');
  // importamos el error 404
const notFoundHandler = require('./utils/middleware/notFoundHandler');

// --- middleware ---

// --- Body parser ---

// entender formatos .json
app.use(express.json());

// --- usamos CORS ---
app.use(cors());
// --- usamos CORS ---


// --- Rutas ---
  // como es una funciona ponemos la app de expres.
moviesApi(app);
  // el error 404 y capturarlo, va despues de las rutas 
app.use(notFoundHandler);
// --- Rutas ---


// --- middleware --- Error deven ir despues de las rutas
  // manejadores de errores
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);
// --- middleware --- Error

// el el puerto que esta corriendo nuestra aplicacion
app.listen(config.port, () => {
  const debug = require("debug")("app:server");
  debug(`prendido http://localhost:${config.port}`);
});

// reto, del año bisiesto
// app.get( '/bisiesto/:anio', (req, res) => {
//   let tiempo = req.params.anio;
//   if( (tiempo % 4 === 0 && tiempo % 100 !== 0) || tiempo % 400 === 0 ){
//     res.send(`El año ${tiempo} es bisiesto.`);
//   }  else res.send(`El año ${tiempo} no es bisiesto.`);
// } )
