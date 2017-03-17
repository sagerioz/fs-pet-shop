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
app.post('/pets', function(req, res) {
  var pets = req.body;

  if (!pets) {
    return res.sendStatus(400);
  }

  //guests.push(pets);

  res.send(pets);
});









module.exports = app;
