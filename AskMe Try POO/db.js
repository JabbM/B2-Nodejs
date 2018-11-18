
class db
{
    constructor()
    {

    }
db(){
  const sqlite = require('sqlite')
sqlite.open('db_quizz.db').then((db) => {
  db.run('CREATE TABLE IF NOT EXISTS user (pseudo)')
  db.close()
})
}
}
module.exports = db
