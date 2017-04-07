var express = require('express');

module.exports = function (ramlPath) {
  var router = express.Router();
  var bodyParser = require('body-parser');

  var api = require('./routes/filesapi')(ramlPath);

  router.use(bodyParser.json());
  router.get('/files/*', api.get);
  router.post('/files/*', api.post);
  router.put('/files/*', api.put);
  router.delete('/files/*', api.delete);

  return router;
}
