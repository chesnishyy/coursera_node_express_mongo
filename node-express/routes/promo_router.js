const express = require('express');
const body_parser = require('body-parser');

const promo_router = express.Router();

promo_router.use(body_parser.json());

promo_router.route('/')
	.all((req, res, next) => {
		"use strict";
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain');
		next();
	})
	.get((req, res, next) => {
		"use strict";
		res.end('Will send all the promotions to you!');
	})
	.post((req, res, next) => {
		"use strict";
		res.end(`Will add the promotion: ${req.body.name} with  details: ${req.body.description}`);
	})
	.put((req, res, next) => {
		"use strict";
		res.statusCode = 403;
		res.end(`PUT operation not supported on /promotions`);
	})
	.delete((req, res, next) => {
		"use strict";
		res.end('Deleting all the promotions!');
	});

promo_router.route('/:promoId')
	.get((req, res, next) => {
		"use strict";
		res.end(`Will send details of the promo: ${req.params.promoId} to you!`);
	})
	.post((req, res, next) => {
		"use strict";
		res.statusCode = 403;
		res.end(`POST operation not supported on /promotions/ ${req.params.promoId}`);
	})
	.put((req, res, next) => {
		"use strict";
		res.write(`Updating the promo: ${req.params.promoId} \n`);
		res.end(`Will update the promo: ${req.body.name} with details ${req.body.description}`)
	})
	.delete((req, res, next) => {
		"use strict";
		res.end(`Deleting promo: ${req.params.promoId}!`);
	});

module.exports = promo_router;

