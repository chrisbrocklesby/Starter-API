const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwt_key = 'mySuperStrongPassKey123';

function protected(req, res, next) {
  jwt.verify(req.headers.authorization, jwt_key, (error, decoded) => {
    if (error || decoded == undefined) res.status(401).end('unauthorized');
    req.user = decoded;
    return next();
  });
}

function compare(password, compare_password, callback) {
  bcrypt.compare(password, compare_password, (err, match) => {
    callback(match, err);
  });
}

function encrypt(password, callback) {
  bcrypt.hash(password, 10, (err, hash) => {
    callback(hash, err);
  });
}

function token(id, email, callback) {
  callback(jwt.sign({ id: id, email: email }, jwt_key));
}

module.exports = {protected, compare, encrypt, token}