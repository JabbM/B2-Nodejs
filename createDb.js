// const sqlite3 = require('sqlite3')
//
// let db = new sqlite3.Database('DB-QuestionG', (err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log(">>>Connexion à la base de données réussi<<<");
// });
//
// db.serialize(() => {
//   db.run("DROP TABLE IF EXISTS *");
//   db.run("CREATE TABLE IF NOT EXISTS user (id integer PRIMARY KEY AUTOINCREMENT,pseudo text)");
// })
//
//
// module.exports = db
