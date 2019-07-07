const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'apitest',
});

db.connect((err) => {
  if (err) throw err
});

module.exports = db;