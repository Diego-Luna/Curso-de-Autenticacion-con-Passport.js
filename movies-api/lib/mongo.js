const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config/index');

// nos garantisa que si alalgun caracter especial, no tengamos problemas al conectarnos
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
  constructor() {
    // definio el cliente, defino que use el nuevo parsel url
    this.client = new MongoClient(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    
    // mi base de datos ba a hacer : "DB_NAME "
    this.dbName = DB_NAME;
  }

  // vamos a uar un patron llamado ,singleton
  // cuando nos conectemos a la ase de datos no nos genere un nuevo usuario y genere error a futuro
  connect() {
    if (!MongoLib.connection) {
      // si no tenemos una coneccion
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect((err) => {
          if (err) {
            reject(err);
          }
          // si no hay un error
          // resolvemos la promesa con la coneccion
          resolve(this.client.db(this.dbName));
          console.log('Connected succesfully to mongo');
        });
      });
    }

    // si tenemos una coneccion, retornamos la conection
    return MongoLib.connection;
  }

  // nos va atraer todos los datos de la coleccion
  getAll(collection, query) {
    // retornamos con el then(promesas), nos reqgresa una instancia de la base de datos
    return this.connect().then((db) => {
      // retornamos la base de datos, le pasamos el nombre de la aplicacion
      // le pasamos un query en find.
      // para que lo usemos como los .json, lo combertimos a array
      return db.collection(collection).find(query).toArray();
    });
  }

  // el espesifico
  get(collection, id) {
    // retornamos con el then, nos reqgresa una instancia de la base de datos
    return this.connect().then((db) => {
      // retornamos la base de datos, le pasamos el nombre de la aplicacion
      // findOne, en ves de pasarle un query, lo hacemos nosotros
      // no es nesesario el array, por que devuelve un objeto
      return db.collection(collection).findOne({ _id: ObjectId(id) });
    });
  }

  // crear
  create(collection, data) {
    // retornamos con el then, nos reqgresa una instancia de la base de datos
    return this.connect()
      .then((db) => {
        // retornamos la base de datos, le pasamos el nombre de la aplicacion
        // insertOne, lo unico que hay que mandar son los datos
        // no es nesesario el array, por que devuelve un objeto
        return db.collection(collection).insertOne(data);
      })
      .then((resultado) => resultado.insertedId);
  }

  // actualisar, y si no existe lo agregamos
  update(collection, id, data) {
    // retornamos con el then, nos reqgresa una instancia de la base de datos
    return (
      this.connect()
        .then((db) => {
          // retornamos la base de datos, le pasamos el nombre de la aplicacion
          // updateOne, si no existe lo creo , o lo actualisa, con $set.
          // no es nesesario el array, por que devuelve un objeto
          return db
            .collection(collection)
            .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
        })
        // .then((resultado) => resultado.updsertedId || id);
        .then((resultado) => resultado.upsertedId || id)
    );
  }

  // borrar
  delete(collection, id) {
    // retornamos con el then, nos reqgresa una instancia de la base de datos
    return this.connect()
      .then((db) => {
        // retornamos la base de datos, le pasamos el nombre de la aplicacion
        // deleteOne, para borrar con el id
        // no es nesesario el array, por que devuelve un objeto
        return db.collection(collection).deleteOne({ _id: ObjectId(id) });
      })
      .then(() => id);
  }
}

module.exports = MongoLib;
