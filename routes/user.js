const api = require('express').Router();
const db = require('../db');
const auth = require('../auth');
const validator = require('validator');

// LOGIN
api.post('/login?', (req, res) => {
  if (!req.body.email || !req.body.password) res.status(400).end('bad request');

  db.query('SELECT email, password FROM users WHERE email=?', req.body.email, (err, data) => {
    if (err) res.status(400).end('bad request');
    if (data) {
      auth.compare(req.body.password, data[0].password, (success, err_password) => {
        if (err_password) res.status(401).end('unauthorized');
        if (!success) res.status(401).end('unauthorized');
        auth.token(data[0].id, data[0].email, (token) => {
          res.end(token);
        });
      });
    } else {
      res.status(401).end('unauthorized');
    }
  });
});

// REGISTER
api.post('/register?', (req, res) => {
  if (!req.body.email || !req.body.password) res.status(400).end('bad request');
  if (!validator.isEmail(req.body.email)) res.status(400).end('bad request');

  auth.encrypt(req.body.password, (encrypted, err_auth) => {
    if (err_auth) res.status(400).end('bad request');
    req.body.password = encrypted;
    db.query('INSERT INTO users SET ?', req.body, (err) => {
      if (err) res.status(400).end('bad request');
      res.end('created');
    });
  });
});

module.exports = api;