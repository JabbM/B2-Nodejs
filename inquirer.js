const db = require('./createDb')
const inquirer = require('inquirer')


const askQuestion = () => {
  const question1 = [
    {
      
    }
]
return inquirer.prompt(question1)
}

module.exports = askQuestion
