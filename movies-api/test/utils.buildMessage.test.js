// con assert nos permite verificar si el test es correcto
const assert = require('assert');

const buildMessage = require('../utils/buildMessage');

// al ponerle .only asemos que solo corra esta suit de test
describe.only('utils - buildMessage', function () {
// describe('utils - buildMessage', function () {

  describe('when receives na entity and an action', function () {
    it('should return the respective message', function () {
      const result = buildMessage('movie', 'create');
      const expect = 'movie created';
      assert.strictEqual(result, expect);
    });
  });

  // ahora con una lista
  describe('when receives an entity and an action and is a list', function () {
    it('should return the respective message with the entity in plural', function () {
      const result = buildMessage('movie', 'list');
      const expect = 'movies listd';
      assert.strictEqual(result, expect);
    });
  });
});
