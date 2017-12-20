const http = require('http');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const dish_router = require('./routes/dish_router');
const promo_router = require('./routes/promo_router');
const leader_router = require('./routes/leader_router');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());


app.use('/dishes', dish_router);
app.use('/promotions', promo_router);
app.use('/leaders', leader_router);

app.use(express.static(__dirname + '/public'));

app.use((request, response, next) => {
	"use strict";

	response.statusCode = 200;
	response.setHeader('Content-Type', 'text/html');
	response.end('<html><body><h1>This is the Express Server</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
	"use strict";
	console.log(`Server running at http://${hostname}:${port}`);
});
