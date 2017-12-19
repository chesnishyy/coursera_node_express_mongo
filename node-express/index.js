const http = require('http');
const express = require('express');
const morgan = require('morgan');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

app.use((request, response, next) => {
	"use strict";
	const {headers} = request;



	response.statusCode = 200;
	response.setHeader('Content-Type', 'text/html');
	response.end('<html><body><h1>This is the Express Server</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
	"use strict";
	console.log(`Server running at http://${hostname}:${port}`);
});
