const Sqlite = require ('./db.js')
const game = require('./commander')
const db = new Sqlite()

class Quizz extends game {
    constructor(chooser, db, commander, inquirer, async) {
        super(chooser, db, commander, inquirer, async)
    }


  authQuizz(){

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
      return this.inquirer.prompt(user)
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
    return this.inquirer.prompt(question1)
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
    return this.inquirer.prompt(question2)
    }


async function auth() {
  const answer = await askUser()
  let filePath = answer.user+".txt"
  let pseudo = answer.user
  if (this.fs.existsSync(filePath)) {
      let data = this.fs.readFileSync(filePath);
      console.log(data.toString('utf8'))
      sqlite.all("SELECT MAX(id) FROM user").then((user) => {
        // quizz()
      })
      // console.log(data.toString('utf8'))
      quizzG()
  } else {
    sqlite.run("INSERT INTO user VALUES(?)", pseudo).then(() => {
      quizzG()
    })
  }
}

async function quizzG() {
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
}
if (this.fs.existsSync(filePath)){
  this.fs.unlinkSync(filePath)
  this.fs.appendFileSync(filePath, "Votre dernier score au questionnaire de Géographie : "+score+" points", (err) => {
    if (err) throw err;
  })
}else {
  this.fs.appendFileSync(filePath, "Votre dernier score au questionnaire de Géographie : "+score+" points", (err) => {
    if (err) throw err;
  })
}
}

async function quizzC() {
if(theme === 2){
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
    fs.appendFileSync(filePath, "Votre dernier score au questionnaire de Culture G : "+score+" points", (err) => {
      if (err) throw err;
    })
  }else {
    fs.appendFileSync(filePath, "Votre dernier score au questionnaire de Culture G : "+score+" points", (err) => {
      if (err) throw err;
    })
  }
}
auth()
}
}

module.exports = Quizz
