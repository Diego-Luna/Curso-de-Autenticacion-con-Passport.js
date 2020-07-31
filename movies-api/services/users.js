
const MongoLib = require('../lib/mongo');

// es para imcriptar las contraseñas
const bcrypt = require('bcrypt');

class UsersService {
  constructor() {
    this.collection = 'users';
    // this.mongoDB = MongoLib();
    this.mongoDB = new MongoLib();

  }

  async getUser({ email }) {
    const [user] = await this.mongoDB.getAll(this.collection, { email });
    return user;
  }

  async createUser({ user }) {
    const { name, email, password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);

    const createUserId = await this.mongoDB.create(this.collection, {
      name,
      email,
      password: hashedPassword
    });

    return createUserId;
  }

  async getOrCreateUser({ user }) {
    const queriedUser = await this.getUser({ email: user.email });

    // si existe
    if (queriedUser) {
      return queriedUser;
    }

    // si no existe, lo creamos
    await this.createUser({ user });
    // y lo regresamos
    return await this.getUser({ email: user.email });
  }

}

module.exports = UsersService;
