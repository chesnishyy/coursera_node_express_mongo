const http = require('http');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.all('/dishes', (request, response, next) => {
	"use strict";
	response.statusCode = 200;
	response.setHeader('Content-Type', 'text/plain');
	next();
});

app.get('/dishes', (req, res, next) => {
	"use strict";
	res.end('Will send all the dishes to you!');
});

app.post('/dishes', (req, res, next) => {
	"use strict";
	res.end(`Will add the dish: ${req.body.name} with  details: ${req.body.description}`);
});

app.put('/dishes', (req, res, next) => {
	"use strict";
	res.statusCode = 403;
	res.end(`PUT operation not supported on /dishes`);
});


app.delete('/dishes', (req, res, next) => {
	"use strict";
	res.end('Deleting all the dishes!');
});

app.get('/dishes/:dish_id', (req, res, next) => {
	"use strict";
	res.end(`Will send details of the dish: ${req.params.dish_id} to you!`);
});

app.post('/dishes/:dish_id', (req, res, next) => {
	"use strict";
	res.statusCode = 403;
	res.end(`POST operation not supported on /dishes/ ${req.params.dish_id}`);
});

app.put('/dishes/:dish_id', (req, res, next) => {
	"use strict";
	res.write(`Updating the dish: ${req.params.dish_id} \n`);
	res.end(`Will update the dish: ${req.body.name} with details ${req.body.description}`)
});


app.delete('/dishes/:dish_id', (req, res, next) => {
	"use strict";
	res.end(`Deleting dish: ${req.params.dish_id}!`);
});

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
