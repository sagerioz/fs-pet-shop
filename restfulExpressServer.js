'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const express = require('express');
const app = express();
app.set('port', process.env.PORT || 5000)

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const morgan = require('morgan');
app.use(morgan('short'));

app.disable('x-powered-by');

// rebuild:
app.get('/pets', function(req, res) {
  fs.readFile('pets.json', 'utf8', (err, petsJSON) =>{
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }
    let pets = JSON.parse(petsJSON)
    res.set("Content-Type", "application/json")
    res.send(JSON.stringify(pets));
  })

});

app.get('/pets/:id', (req, res) => {
  fs.readFile('pets.json', 'utf8', (err, petsJSON) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var id = Number.parseInt(req.params.id);
    var pets = JSON.parse(petsJSON);

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    res.set("Content-Type", "application/json")
    res.send(JSON.stringify(pets[id]));
  });
});
app.post('/pets/', (req, res) => {
  let pet = req.body;
  console.log("PET", pet);
  var age = pet.age
  var name = pet.name
  var kind = pet.kind
  if (!pet || !age || !name || !kind) {

    return res.sendStatus(400);
  }
  fs.readFile('pets.json', 'utf8', (err, petsJSON) => {
    if (err){
      return res.sendStatus(500);
    }
    let pets = JSON.parse(petsJSON)
    //console.log("PETS", pets);
    //console.log("PET", pet);
    pets.push(pet)
    res.send(pet);
    fs.writeFile(petsPath, JSON.stringify(pets), (err) => {
      if (err) {
        console.error(err.stack);
        return res.sendStatus(500);
      }
    })
  })
})
app.patch('/pets/:index', (req, res) => {
      var index = Number.parseInt(req.params.index);
      var petDetails = req.body;
      var age = petDetails.age
      var name = petDetails.name
      var kind = petDetails.kind
      console.log("PET DETAILS", petDetails, "AGE", age);
      // console.log(age, name, kind)
      if (!petDetails) {
        return res.sendStatus(400);
      }
        fs.readFile('pets.json', 'utf8', (err, petsJSON) => {
          if (err){
            return res.sendStatus(400);
          }
          let pets = JSON.parse(petsJSON)
          if (Number.isNaN(index) || index < 0 || index >= pets.length) {
            return res.sendStatus(404);
          }
          //console.log('Outside For Loop!')

            for(var key in pets[index]){
              //console.log('Inside For Loop');
              if (age !== undefined && key === 'age') {
                console.log('age');
                pets[index].age = age;
              }
              if (name !== undefined && key === 'name') {
                console.log('name');
                pets[index].name = name;
              }
              if (kind !== undefined && key === 'kind') {
                console.log('kind')
                pets[index].kind = kind;
              }
            }

            //console.log("WHICH PET?", pets[index]);

          res.send(pets[index]);
          fs.writeFile(petsPath, JSON.stringify(pets), (err) => {
            if (err) {
              console.error(err.stack);
              return res.sendStatus(500);
            }
          })
        })

  });
  app.delete('/pets/:index', (req, res) => {
    let index = Number.parseInt(req.params.index);
    fs.readFile('pets.json', 'utf8', (err, petsJSON) =>{
      if (err){
        return res.sendStatus(400);
      }
      let pets = JSON.parse(petsJSON)
      if(Number.isNaN(index) || index < 0 || index >= pets.length){
        return res.sendStatus(404)
      }
      var deletedObj = pets.splice(index, 1)[0]
      res.send(deletedObj)
      fs.writeFile(petsPath, JSON.stringify(pets), (err) =>{
        if (err) {
          console.error(err.stack);
          return res.sendStatus(500);
        }
      })
    })

  })
  app.use(function (req, res, next) {
   res.status(404).send("Sorry can't find that!")
  })

app.listen(app.get('port'), function() {
  console.log('Listening on', app.get('port'));
});
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

module.exports = app;
