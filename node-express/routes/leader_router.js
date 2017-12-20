const express = require('express');
const body_parser = require('body-parser');

const leader_router = express.Router();

leader_router.use(body_parser.json());

leader_router.route('/')
	.all((req, res, next) => {
		"use strict";
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain');
		next();
	})
	.get((req, res, next) => {
		"use strict";
		res.end('Will send all the leaders to you!');
	})
	.post((req, res, next) => {
		"use strict";
		res.end(`Will add the leader: ${req.body.name} with  details: ${req.body.description}`);
	})
	.put((req, res, next) => {
		"use strict";
		res.statusCode = 403;
		res.end(`PUT operation not supported on /leaders`);
	})
	.delete((req, res, next) => {
		"use strict";
		res.end('Deleting all the leaders!');
	});

leader_router.route('/:leaderId')
	.get((req, res, next) => {
		"use strict";
		res.end(`Will send details of the leader: ${req.params.leaderId} to you!`);
	})
	.post((req, res, next) => {
		"use strict";
		res.statusCode = 403;
		res.end(`POST operation not supported on /leaders/ ${req.params.leaderId}`);
	})
	.put((req, res, next) => {
		"use strict";
		res.write(`Updating the leader: ${req.params.leaderId} \n`);
		res.end(`Will update the leader: ${req.body.name} with details ${req.body.description}`)
	})
	.delete((req, res, next) => {
		"use strict";
		res.end(`Deleting leader: ${req.params.leaderId}!`);
	});

module.exports = leader_router;

