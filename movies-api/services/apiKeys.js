const MongoLib = require('../lib/mongo');

class ApiKeysService {
  constructor() {
    this.collection = 'api-keys';

    // nuevo instansia de nuestra libreria Mongo
    this.mongoDB = new MongoLib();
  }

  // el unico metodo a implementar
  async getApiKey({ token }) {
    // este va a resivir un token, y lo sacamos del la colección
    const [apiKey] = await this.mongoDB.getAll(this.collection, { token });
    return apiKey;
  }

}

module.exports = ApiKeysService;