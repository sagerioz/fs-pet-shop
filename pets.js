'use strict';

let fs = require('fs')
let filename = process.argv[2]
let path = require('path')
let guestsPath = path.join(__dirname, 'pets.json');
var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];



if (cmd === 'read') {
  fs.readFile('pets.json', 'utf8', (err, data) => {
      if (err){
        console.error(`Usage: node pets.js read INDEX`);
          process.exit(1)
      }
      else if (!isNaN(process.argv[3]) && process.argv[3] < JSON.parse(data).length) {
        console.log(JSON.parse(data)[process.argv[3]])
      }
    else{
      console.log(JSON.parse(data));
    }
    });
}
else if (cmd === 'create') {
  fs.readFile(guestsPath, 'utf8', function(readErr, data) {
    if (readErr) {
      throw readErr;
    }

    let pets = JSON.parse(data);
    let age = process.argv[3]
    let kind = process.argv[4]
    let name = process.argv[5]

    if (!(age) || !kind || !name) {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    }
    pets.push({'age': +age, 'kind': kind, 'name': name});

    var petsJSON = JSON.stringify(pets);

    fs.writeFile('./pets.json', petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }

      console.log(pets[pets.length - 1]);
    });
  });
}
else if (cmd === "update") {
  fs.readFile("pets.json", "utf8", (readErr, data) => {
    if (readErr) {
      throw readErr;
    }
    let pets = JSON.parse(data);
    let updatedPet = {
      age: parseInt(process.argv[4]),
      kind: process.argv[5],
      name: process.argv[6]
    }

    if (process.argv.length !== 7) {
      console.error(`Usage: node pets.js update INDEX AGE KIND NAME`);
      process.exit(1);
    }
    pets[process.argv[3]] = updatedPet
    console.log(updatedPet);
    let petsJSON = JSON.stringify(pets);

    fs.writeFile("pets.json", petsJSON, (writeErr) => {
      if (writeErr) {
        throw writeErr;
      }
    });
  });
}
else {
  console.error(`Usage: node pets.js [read | create | update | destroy]`);
  process.exit(1);
}










//------------------------------------------------------------------------
// if (process.argv.length === 2) {
//   console.error(`Usage: node pets.js [read | create | update | destroy]`);
//   process.exit(1)
// }
// if (process.argv[2] === 'read') {
//   fs.readFile('pets.json', 'utf8', (err, data) => {
//     if (err){
//       console.error(`Usage: node pets.js read INDEX`);
//         process.exit(1)
//     }
//     if (process.argv.length === 3) {
//       console.log(JSON.parse(data));
//     } else if (!isNaN(process.argv[3]) && process.argv[3] > 0 && process.argv[3] < JSON.parse(data).length) {
//       console.log(JSON.parse(data)[process.argv[3]])
//     }
//   else{
//     console.error(`Usage: node pets.js read INDEX`);
//       process.exit(1)
//   }
//   });
// }
// if (process.argv[2] === 'create') {
//   fs.readFile('pets.json', 'utf8', (err, data) => {
//     if (err){
//       console.error(`ooops`);
//         process.exit(1)
//     }
//     let temp = JSON.parse(data)
//     let age = process.argv[3]
//     let kind = process.argv[4]
//     let name = process.argv[5]
//
//     if(!age || !kind || !name){
//       console.error("Usage: node pets.js create AGE KIND NAME");
//       process.exit(1)
//     }
//     temp.push({'age': +age, 'kind': kind, 'name': name})
//     let stringed = JSON.stringify(temp)
//
//     fs.writeFile('./pets.json', stringed, 'utf8', (err) => {
//     if (err) throw err;
//     console.log();
//
//   })
//
// });
// }
//--------------------------------------------------------------------
