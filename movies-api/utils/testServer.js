const express = require('express');
const supertest = require('supertest');

// para el test
function testServer(route) {
  const app = express();
  route(app);
  return supertest(app);
}

module.exports = testServer;