const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')

const db = mysql.createConnection({
  host: 'localhost', // mysql database host name
  user: 'root', // mysql database user name
  password: 'password', // mysql database password
  database: 'apitest' // mysql database name
})

db.connect((err) => {
  if (err) throw err
  console.log('You are now connected with mysql database...')
})

app.disable('x-powered-by');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const server = app.listen(3000, '127.0.0.1', () => {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})


app.get('/:table', function (req, res) {
  db.query(`select * from ${req.params.table}`, (err, data) => {
    if (err) throw err
    res.end(JSON.stringify(data))
  })
})

app.get('/:table/:id', (req, res) => {
  db.query(`select * from ${req.params.table} where id=?`, [req.params.id], (err, data) => {
    if (err) throw err
    res.end(JSON.stringify(data))
  })
})


app.post('/:table', (req, res) => {
  db.query(`INSERT INTO ${req.params.table} SET ?`, req.body, (err, data) => {
    if (err) throw err
    res.end('success')
  })
})


app.put('/customer', (req, res) => {
  db.query('UPDATE `customer` SET `Name`=?,`Address`=?,`Country`=?,`Phone`=? where `Id`=?', [req.body.Name, req.body.Address, req.body.Country, req.body.Phone, req.body.Id], (err, data) => {
    if (err) throw err
    res.end('success')
  })
})

// rest api to delete record from mysql database
app.delete('/customer', function (req, res) {
  console.log(req.body)
  db.query('DELETE FROM `customer` WHERE `Id`=?', [req.body.Id], (err, data) => {
    if (err) throw err
    res.end('Record has been deleted!')
  })
})
