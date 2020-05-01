const env = require('../../env.json');
const mysql = require('mysql');

const db = mysql.createConnection({
  host: env.myysql_host || '',
  user: env.myysql_user || '',
  password: env.myysql_password || '',
  database: env.myysql_database || '',
});

db.connect((error) => {
  if (error) throw error
});

module.exports = db;