const api = require('express').Router();
const db = require('../db')
const auth = require('../auth');

// GET
api.get('/', auth.protected, (req, res) => {
  const limit = parseInt(req.query.limit) || 100;
  const offset = parseInt(req.query.offset) || 0;
  db.query('SELECT * FROM posts LIMIT ? OFFSET ?', [limit, offset], (err, data) => {
    if (err) res.status(400).end('bad request');
    if (!data[0]) res.status(404).end('not found');
    res.end(JSON.stringify(data));
  });
});

// POST
api.post('/', (req, res) => { 
  db.query('INSERT INTO posts SET ?', req.body, (err) => {
    if (err) res.status(400).end('bad request');
    res.end('created');
  });
});

// GET BY ID
api.get('/:id?', (req, res) => {
  db.query('SELECT * FROM posts WHERE id=?', req.params.id, (err, data) => {
    if (err) res.status(400).end('bad request');
    if (!data[0]) res.status(404).end('not found');
    res.end(JSON.stringify(data));
  });
});

// UPDATE BY ID
api.put('/:id?', (req, res) => {
  db.query('UPDATE posts SET ? WHERE id=?', [req.body, req.params.id], (err) => {
    if (err) res.status(400).end('bad request');
    res.end('updated');
  });
});

// DELETE BY ID
api.delete('/:id?', (req, res) => {
  db.query('DELETE FROM posts WHERE id=?', req.params.id, (err) => {
    if (err) res.status(400).end('bad request');
    res.end('deleted');
  });
});

module.exports = api;
