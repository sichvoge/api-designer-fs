var request = require('request');
var path = require('path');
var express = require('express');
var app = express();
var fs = require('fs');
var ramlStore = require('./store/fileserver');
var spawn = require('child_process').spawn;

const PORT = 10500;

module.exports = function(folder) {
  console.log('opening %s', folder);

  app.use('/raml-store', ramlStore(path.join(process.cwd(), folder)));
  var server = app.listen(9000, function () {
    console.log('Open http://localhost:%d/raml-store/ to browse api-designer', server.address().port);
  });

  launch_webapp_once(PORT, function() {
    return spawn('open', [("http://localhost:" + PORT)]);
  });
}

var starts_with = function(str, search) {
  return 0 === str.indexOf(search);
};

var file_or_url_to_absolute = function(file) {
  if (starts_with(file, 'http:') || starts_with(file, 'https:')) {
    return file;
  } else {
    return path.resolve(process.cwd(), file);
  }
};

var launch_webapp = function(port, cb) {
  app.get('/', function(req, res) {
    console.log(path.join(__dirname, 'html/api-designer-fs.html'));
    fs.readFile(path.join(__dirname, 'html/api-designer-fs.html'), 'utf-8', function(err, content) {
      return res.send(content);
    });
  });

  app.use('/api-designer', express.static(path.join(__dirname, 'node_modules/api-designer/dist')));
  app.use('/', express.static('/'));

  // Add headers
  app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
  });

  return app.listen(port, cb);
};

var webapp_is_listening = function(port, cb) {
  console.log(port);
  return request("http://localhost:" + port + "/~raml-is", function(e, r, b) {
    return cb(null, b === 'awesome');
  });
};

var launch_webapp_once = function(port, cb) {
  return webapp_is_listening(port, function(e, r) {
    if (r) {
      return cb();
    } else {
      return launch_webapp(port, cb);
    }
  });
};