#!/usr/bin/env node
const sqlite = require('./db')
const program = require('commander')

let t = 0
program
  .version('1.0.0')
  .option('-g, --geographie', 'Thème géographie')
  .option('-c, --cultureg', 'Thème Culture g')
  .option('-u, --users', "Nombre d'utilisateurs enregistrés")
  .parse(process.argv)
// console.log('prorge', program)
  if(program.geographie){
    console.log("------------------------------------------\n---Bienvenue sur le Quizz de Géographie---\n------------------------------------------");
    t = 1;
  }else if(program.cultureg){
    console.log("------------------------------------------\n---Bienvenue sur le Quizz de Culture G----\n------------------------------------------");
    t = 2;
  }else if (program.users) {
    t = 4// PROMESSE DONC THEN/CATCH
  }else {
      program.help()
    }


// console.log('rgzr', t)
module.exports = t
