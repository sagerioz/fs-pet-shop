'use strict'
const http = require('http')
const fs = require('fs')
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');
const url = require('url')
const port = 5555

var server = http.createServer(function(req, res) {
  if (req.method === 'GET' && req.url === '/pets') {
    fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
      if (err) {
        console.error(err.stack);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Internal Server Error');
      }

      res.setHeader('Content-Type', 'application/json');
      res.end(petsJSON);
    });
  }
  else if (req.method === 'GET' && req.url === '/pets/0'){
    fs.readFile(petsPath, 'utf8', function (err, petsJSON) {
      if(err){
        console.log(err.stack);
        res.statusCode = 500
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Internal Server Error');
      }
      var pets = JSON.parse(petsJSON);
      var petsJSON = JSON.stringify(pets[0]);

      res.setHeader('Content-Type', 'application/json');
      res.end(petsJSON);
    })
  }
  else if (req.method === 'GET' && req.url === '/pets/1'){
    fs.readFile(petsPath, 'utf8', function (err, petsJSON) {
      if(err){
        console.log(err.stack);
        res.statusCode = 500
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Internal Server Error');
      }
      var pets = JSON.parse(petsJSON);
      var petsJSON = JSON.stringify(pets[1]);

      res.setHeader('Content-Type', 'application/json');
      res.end(petsJSON);
    })
  }
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not found');
  }
});

server.listen(port, function() {
  console.log('Listening on port', port);
});

module.exports = server;
