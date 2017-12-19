const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer();

server.on('request', (request, response) => {
	const {url, method, headers} = request;
	const user_agent = headers['user-agent'];

	console.log(`Request for ${url} by method ${method}`);
	console.log(headers);
	console.log(`user-agent: ${user_agent}`);

	if (method === 'GET') {
		let fileUrl;
		if (url === '/') fileUrl = '/index.html';
		else fileUrl = url;

		const filePath = path.resolve(`./public${fileUrl}`);
		const fileExt = path.extname(filePath);

		if (fileExt === '.html') {
			const exists = fs.existsSync(filePath);
			if (!exists) {
				response.statusCode = 404;
				response.setHeader('Content-Type', 'text/html');
				response.end(`<html><body><h1>Error 404: ${fileUrl} not found</h1></body>`);

				return null;
			}
			else {
				response.statusCode = 200;
				response.setHeader('Content-Type', 'text/html');
				fs.createReadStream(filePath).pipe(response);

				return null;
			}
		}
		else {
			response.statusCode = 404;
			response.setHeader('Content-Type', 'text/html');
			response.end(`<html><body><h1>Error 404: ${fileUrl} not  an HTML file</h1></body>`);

			return null;
		}
	}
	else {
		response.statusCode = 404;
		response.setHeader('Content-Type', 'text/html');
		response.end(`<html><body><h1>Error 404: ${req.method} not supported</h1></body>`);

		return null;
	}
});

server.listen(port, hostname, () => {
	"use strict";
	console.log(`Server running at http://${hostname}:${port}`);
});
