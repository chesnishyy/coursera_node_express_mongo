const express = require('express');
const body_parser = require('body-parser');

const dish_router = express.Router();

dish_router.use(body_parser.json());

dish_router.route('/')
	.all((req, res, next) => {
		"use strict";
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain');
		next();
	})
	.get((req, res, next) => {
		"use strict";
		res.end('Will send all the dishes to you!');
	})
	.post((req, res, next) => {
		"use strict";
		res.end(`Will add the dish: ${req.body.name} with  details: ${req.body.description}`);
	})
	.put((req, res, next) => {
		"use strict";
		res.statusCode = 403;
		res.end(`PUT operation not supported on /dishes`);
	})
	.delete((req, res, next) => {
		"use strict";
		res.end('Deleting all the dishes!');
	});

dish_router.route('/:dish_id')
	.get((req, res, next) => {
		"use strict";
		res.end(`Will send details of the dish: ${req.params.dish_id} to you!`);
	})
	.post((req, res, next) => {
		"use strict";
		res.statusCode = 403;
		res.end(`POST operation not supported on /dishes/ ${req.params.dish_id}`);
	})
	.put((req, res, next) => {
		"use strict";
		res.write(`Updating the dish: ${req.params.dish_id} \n`);
		res.end(`Will update the dish: ${req.body.name} with details ${req.body.description}`)
	})
	.delete((req, res, next) => {
		"use strict";
		res.end(`Deleting dish: ${req.params.dish_id}!`);
	});

module.exports = dish_router;

