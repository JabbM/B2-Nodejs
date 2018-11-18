module.exports = {
  getAll: () => {
    const theme = require('./commander')
    const inquirer = require('inquirer')
    const fs = require('fs')
    const sqlite = require('./db')

    let score = 0
    let myTheme = null

    if(theme === 1) myTheme = "Géographie"
    else myTheme = "Culture G"

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
      if(arg < 3) console.log("==> Nul ! Voila ton score "+score+"/5 <==");
      else if(arg > 3) console.log("==> Bravo ! Voila ton score "+score+"/5 <==");
    }


    const auth = async () => {
      const answer = await askUser()
      filePath = answer.user+".txt"
      pseudo = answer.user
      if (!fs.existsSync(filePath)) {
        sqlite.open('db_quizz.db').then((db) => {
          db.run("INSERT INTO users VALUES(?)", (pseudo)).then(() => {
            if(theme === 1) quizzG();
            else if(theme === 2) quizzC();
            else if (theme === 4) dmUsers();
          }).catch((err) => {
            console.log(err);
          })
          db.close()
        }).catch((err) => {
          console.log(err);
        })
      }else {
      if(theme === 1) quizzG();
      else if(theme === 2) quizzC();
      }
    }


    const quizzG = async () => {
      if (fs.existsSync(filePath)) {
        let data = fs.readFileSync(filePath);
        console.log(data.toString('utf8'))
      }
      console.log("Choisissez une des réponses");
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
      if (fs.existsSync(filePath)){
        fs.unlinkSync(filePath)
        fs.appendFileSync(filePath, "Votre dernier score au questionnaire de "+myTheme+" : "+score+" points\n----------------------------------------------------------", (err) => {
          if (err) throw err;
        })
      }else {
        fs.appendFileSync(filePath, "Votre dernier score au questionnaire de "+myTheme+" : "+score+" points\n----------------------------------------------------------", (err) => {
          if (err) throw err;
        })
      }
    }


    const quizzC = async () => {
      if (fs.existsSync(filePath)) {
        let data = fs.readFileSync(filePath);
        console.log(data.toString('utf8'))
      }
      console.log("Choisissez une des réponses");
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
      if (fs.existsSync(filePath)){
        fs.unlinkSync(filePath)
        fs.appendFileSync(filePath, "Votre dernier score au questionnaire de "+myTheme+" : "+score+" points\n----------------------------------------------------------", (err) => {
          if (err) throw err;
        })
      }else {
        fs.appendFileSync(filePath, "Votre dernier score au questionnaire de "+myTheme+" : "+score+" points\n----------------------------------------------------------", (err) => {
          if (err) throw err;
        })
      }
    }


    function dmUsers() {
      console.log("---Les differents Utilisateurs enregistrés---");
      sqlite.open('db_quizz.db').then((db) => {
        db.all("SELECT pseudo FROM users").then((rows) => {
          rows.forEach((row) => {
            console.log("==> "+row.pseudo);
          })
        }).catch((err) => {
          console.log(err);
        })
        db.close()
      }).catch((err) =>{
        console.log(err);
      })
    }

    if (theme === 4) dmUsers();
    else auth()
  }
}
