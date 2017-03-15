'use strict'
const http = require('http')
const fs = require('fs')
const express = require('express')
const port = 8000
const path = require('path')
const petsPath = path.join(__dirname, 'pets.json');
const app = express()

app.disable('x-powered-by');
app.get('/pets', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var pets = JSON.parse(petsJSON);

    res.send(pets);
  });
});
app.get('/pets/:id', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(401);
    }

    var id = Number.parseInt(req.params.id);
    var pets = JSON.parse(petsJSON);

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(402);

      console.log("big error");
    }
    res.set('Content-Type', 'application/json');
    res.send(pets[id]);
  });
});
app.use(function(req, res) {
  res.sendStatus(403);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
