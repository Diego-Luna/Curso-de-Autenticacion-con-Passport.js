const { required } = require("@hapi/joi");

const MongoLib = required('../lib/mongo');
// es para imcriptar las contraseñas
const bcrypt = require('bcrypt');

class UsersService {
  constructor() {
    this.collection = 'users';
    this.mongoDB = MongoLib();
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

}

module.exports = UsersService;
