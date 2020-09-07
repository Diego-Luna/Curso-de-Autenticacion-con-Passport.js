// para tener un control de lo resuisitos
const joi = require('@hapi/joi');

// el id de mongo aasmite un strig, de
// const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}/);
const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const userSchema = {
  name: joi.string().max(100).required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
}

// los ... significa que vamos ahcer uso del userSchema
const createUserSchema = {
  ...userSchema,
  isAdmin: joi.boolean()
};


const createProviderUserSchema = {
  ...userSchema,
  apiKeyToken: joi.string().required()
};


module.exports = {
  userIdSchema,
  createUserSchema,
  createProviderUserSchema
};
