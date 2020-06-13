const express = require('express');
// permite el manejo de las seciones
const session = require('express-session');

const app = express();

// resave: false (que no guarde la cokie cada bes que se aga un cambio)
// saveUninitialized: false (que cuando la cokie no se alla inicialisado no me la guarde por defecto)
// secret: (deve tener un minimo de de 256 bits, cuando se valla asifrar lo va a utilisar)
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'keyboard cat',
}));

app.get('/', (req, res) => {
  req.session.count = req.session.count? req.session.count+1 : 1;
  // ponemos el estado 200, que todo esta bien
  res.status(200).json({hello: 'word',counter : req.session.count});
})

app.listen(3000, () => {
  console.log('esta corriendo el el puerto 300');
});