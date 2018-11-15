#!/usr/bin/env node
const program = require('commander')

let t = 0
program
  .version('1.0.0')
  .option('-g, --geographie', 'Thème géographie')
  .option('-c, --cultureg', 'Thème Culture g')
  .option('-m, --cinematographie', 'Théme Cinématographie')
  .option('-u, --users', "Nombre d'utilisateurs enregistrés")
  .parse(process.argv)
// console.log('prorge', program)
  if(program.geographie){
    console.log("---Bienvenue sur le Quizz de Géographie---");
    t = 1;
  }else if(program.cultureg){
    console.log("---Bienvenue sur le Quizz de Culture G---");
    t = 2;
  }else if(program.cinematographie){
    console.log("---Bienvenue sur le Quizz de Cinématographie---");
    t = 3;
  }else if (program.users) {
    db.each("SELECT pseudo FROM user", (err,row) => {
        if (err) throw err;
        else {
          console.log(row.pseudo)
        }
      })
  }else {
      program.help()
    }


// console.log('rgzr', t)
module.exports = t
