const env = require('./env.json');
const api = require('express')();
const body = require('body-parser');

api.use(body.json());
api.use(body.urlencoded({ extended: true }));

api.all('*', (req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'PATCH, PUT, GET, POST, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	next();
});

api.use('/auth', require('./routes/auth'));
api.use('/posts', require('./routes/posts'));

api.use((req, res, next) => {
	res.status(404).end('Not Found');
	next();
});

api.use((err, req, res, next) => {
	res.status(500).end('API Server Error');
	next();
});

api.disable('x-powered-by');

api.listen(3000, () => {
	console.log(`API Server Running on port: 3000 ...`);
});

module.exports = api;
