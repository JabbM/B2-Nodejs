const sqlite = require('sqlite')

sqlite.open('db_quizz.db').then((db) => {
  db.run('CREATE TABLE IF NOT EXISTS users (pseudo TEXT)')
}).catch((err) =>{
  console.log(err);
})


module.exports = sqlite
