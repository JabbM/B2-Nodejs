// const db = require('./createDb')
const inquirer = require('inquirer')
const async = require('async')
const theme = require('./command.js')
const fs = require('fs')
const sqlite3 = require('sqlite3')

let score = 0
let myTheme = null
  let i = 0

if (theme === 1) {
  myTheme = "Géographie"
}else {
  myTheme = "Culture G"
}

const questionnaire = []
questionnaire.push([
  "Quelle est la capitale de la France ?",
  "Le Brésil se situe en...",
  "Quelle est la capitale des Etats-Unis ?",
  "Sur quel continent l'Italie se trouve ?",
  "L'Alaska à une frontière avec quel pays ?"
])

const reponses = []
reponses.push([
  "Marseille,Paris,Nice,Bordeaux",
  "Amérique Centrale,Afrique,Amérique du Nord,Amérique du Sud",
  "Las Vegas,Paris,New-York,Washington",
  "Europe,Asie,Amérique,Afrique",
  "Groenland,Japon,Canada,Etats-Unis"
])

const vrai = []
vrai.push([
  "Paris",
  "Amérique du Sud",
  "Washington",
  "Europe",
  "Canada"
])

questionnaire.push([
  "Quel président a précédé Nicolas Sarkozy ?",
  "Où se trouve Hiroshima et Nagasaki ?",
  "Combien y a t il de départements en France ?",
  "Combien de cotés comporte un carré",
  "La réponse de la vie ?"
])
reponses.push([
    "Chirac,Holland,De Gaulle,Hitler",
    "Chine,Corée du Nord,Japon,Inde",
    "111,55,2,101",
    "1,2,3,4",
    "AH !,42,Les femmes,Les pâtes"
])
vrai.push([
  "Chirac",
  "Japon",
  "101",
  "4",
  "42"
])

const askUser = () => {
  const user = [
    {
      type:'input',
      message:"Entrez votre nom d'utilisateur",
      name:'user'
    }
  ]
  return inquirer.prompt(user)
}

const askQuestion1 = (question, name, choices) => {
  const question1 = [
    {
    type:"list",
    message:question,
    name:name,
    choices:choices
    }
]
return inquirer.prompt(question1)
}


const askQuestion2 = (question, name, choices) => {
  const question2 = [
    {
    type:"list",
    message:question,
    name:name,
    choices:choices
    }
]
return inquirer.prompt(question2)
}


function noob(arg){
  if(arg < 3)
    console.log("---Nul ! Voila ton score "+score+"/5---");

  if(arg > 3)
    console.log("---Bravo ! Voila ton score "+score+"/5---");
}

function connDb (){
let db = new sqlite3.Database('db_quizz', (err) => {
  db.serialize((err) => {
    // db.run("DROP TABLE IF EXISTS *");
    db.run("CREATE TABLE IF NOT EXISTS user (id integer PRIMARY KEY AUTOINCREMENT, pseudo text)");
    console.log('ahahahah');
    if (err) throw err;
    else {
      console.log(">>>Connexion à la base de données réussi<<<");
      auth(db)
    }
  })
  if (err) throw err;
  // else {
  //   console.log(">>>Connexion à la base de données réussi<<<");
    // auth(db)
  // }
})
// return db
}

const auth = async (db) => {
  const answer = await askUser()
  filePath = answer.user+".txt"
  pseudo = answer.user
  if (fs.existsSync(filePath)) {
      let data = fs.readFileSync(filePath);
      console.log(data.toString('utf8'))
  db.each("SELECT MAX(id) FROM user", (err, row, i) => {
    if (err) throw err;
     else{
       quizz() //  PROBLEME : OU METTRE QUIZZ(
      }
    })

      // console.log(data.toString('utf8'))
      // quizz() //  PROBLEME : OU METTRE QUIZZ()
  }else {
    db.run("INSERT INTO user(pseudo) VALUES(?);", (pseudo))
    quizz()
  }
}

const quizz = async () => {
  if(theme === 1){
  for (let i = 0; i < 1; i++) {
    for (var j = 0; j < questionnaire[i].length; j++) {
      let nom = "quest" + i
      const answers = await askQuestion1(questionnaire[i][j], nom, reponses[i][j].split(','))
      if(answers[nom] == vrai[i][j] ){
        console.log("---> Bravo, Bonne Réponse !");
        score++
      }else {
        console.log("---> Mauvaise Réponse !");
      }
    }
  }
  noob(score)
}else if(theme === 2){
    for (let i = 1; i < 2; i++) {
      for (var j = 0; j < questionnaire[i].length; j++) {
        let nom = "quest" + i
        const answers = await askQuestion1(questionnaire[i][j], nom, reponses[i][j].split(','))
        if(answers[nom] == vrai[i][j] ){
          console.log("---> Bravo, Bonne Réponse !")
          score++
        }else {
          console.log("---> Mauvaise Réponse !");
        }
      }
    }
    noob(score)
  }

  if (fs.existsSync(filePath)){
    fs.unlinkSync(filePath)
    fs.appendFileSync(filePath, "Votre dernier score au questionnaire de "+myTheme+" : "+score+" points", (err) => {
      if (err) throw err;
    })
  }else {
    fs.appendFileSync(filePath, "Votre dernier score au questionnaire de "+myTheme+" : "+score+" points", (err) => {
      if (err) throw err;
    })
  }
}

connDb()

// module.exports = db
