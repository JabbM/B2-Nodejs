const inquirer = require('inquirer')
const fs = require('fs')
const game = require('./commander')
const fonction = require('./fonction')

let score = 0
let myTheme = null

if (theme === 1) {
  myTheme = "Géographie"
}else {
  myTheme = "Culture G"
}


function noob(arg){
  if(arg < 3)
    console.log("---Nul ! Voila ton score "+score+"/5---");

  if(arg > 3)
    console.log("---Bravo ! Voila ton score "+score+"/5---");
}

class AskMe extends game {
    constructor(chooser, db, commander, inquirer, fs, async) {
        super(chooser, db, commander, inquirer, fs, async)
    }

    main(){
      this.commander
            .version('1.0.0')
            .option('-g, --geographie', 'Thème géographie')
            .option('-c, --cultureg', 'Thème Culture g')
            .option('-m, --cinematographie', 'Théme Cinématographie')
            .option('-u, --users', "Nombre d'utilisateurs enregistrés")
            .parse(process.argv)

        if (this.commander.geographie) {
          console.log("coucou");
          const quizz = new fonction()
          quizz.authQuizz()
          // quizz.quizzG()
        }
        else if (this.commander.cultureg) {

        }
        else if (this.commander.users) {
          return db.each("SELECT pseudo FROM user").then((row) =>{
            console.log(row.pseudo);
        })
      }else {
          this.commander.help()
        }
    }
}

module.exports = AskMe
