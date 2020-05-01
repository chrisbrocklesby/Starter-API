const env = require('../../env.json');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwt_key = env.jwt_key || '';

module.exports = {
  protected(req, res, next) {
    jwt.verify(req.headers.authorization, jwt_key, (error, decoded) => {
      if (error || decoded == undefined) res.status(401).json({ status: 'unauthorized' });
      req.user = decoded;
      return next();
    });
  },

  compare(password, compare_password, callback) {
    bcrypt.compare(password, compare_password, (err, match) => {
      callback(match, err);
    });
  },

  encrypt(password, callback) {
    bcrypt.hash(password, 10, (err, hash) => {
      callback(hash, err);
    });
  },

  token(id, email, callback) {
    callback(jwt.sign({ id: id, email: email }, jwt_key));
  }
}