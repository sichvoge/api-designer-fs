#! /usr/bin/env node
var program = require('commander');
var launch = require('./launch');



program
  .arguments('<folder>')
  .description('Opens the API designer using the input <folder> from your local filesystem. Argument can be either a file or folder.')
  .action(function(folder) {
    launch(folder);
  })
  .parse(process.argv);