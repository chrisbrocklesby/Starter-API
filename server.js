const api = require('express')();
const body = require('body-parser');

api.use(body.json());
api.use(body.urlencoded({ extended: true }));

api.all('*', (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE")
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
next()
});

api.use('/user', require('./routes/user'));
api.use('/posts', require('./routes/posts'));

api.disable('x-powered-by');

api.listen(3000, () => {console.log('API Server Running...')});

module.exports = api;
