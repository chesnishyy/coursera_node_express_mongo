const express = require('express');
const body_parser = require('body-parser');
const mongoose = require('mongoose');

const Promotions = require('../models/promotions');

const promo_router = express.Router();

promo_router.use(body_parser.json());

promo_router.route('/')
	.get((req, res, next) => {
		"use strict";
		Promotions.find({})
			.then((promotions) => {
				res.statusCode = 200;
				res.setHeader('Contrent-Type', 'application/json');
				res.json(promotions)
			}, (err) => next(err))
			.catch((err) => console.log(err));
	})
	.post((req, res, next) => {
		"use strict";
		Promotions.create(req.body)
			.then((promotion) => {
				console.log('Promotion Created', promotion);
				res.statusCode = 200;
				res.setHeader('Contrent-Type', 'application/json');
				res.json(promotion)
			}, (err) => next(err))
			.catch((err) => next(err));
	})
	.put((req, res, next) => {
		"use strict";
		res.statusCode = 403;
		res.end(`PUT operation not supported on /promotions`);
	})
	.delete((req, res, next) => {
		"use strict";
		Dishes.remove({})
			.then((response) => {
				res.statusCode = 200;
				res.setHeader('Contrent-Type', 'application/json');
				res.json(response)
			}, (err) => console.log(err))
			.catch((err) => console.log(err));
	});

promo_router.route('/:promoId')
	.get((req, res, next) => {
		"use strict";
		Promotions.findById(req.params.promoId)
			.then((promotion) => {
				res.statusCode = 200;
				res.setHeader('Contrent-Type', 'application/json');
				res.json(promotion)
			}, (err) => next(err))
			.catch((err) => next(err));
	})
	.post((req, res, next) => {
		"use strict";
		res.statusCode = 403;
		res.end(`POST operation not supported on /promotions/ ${req.params.promoId}`);
	})
	.put((req, res, next) => {
		"use strict";
		Promotions.findByIdAndUpdate(req.params.promoId, {
			$set: req.body
		}, {
				new: true
			})
			.then((promotion) => {
				res.statusCode = 200;
				res.setHeader('Contrent-Type', 'application/json');
				res.json(promotion)
			}, (err) => next(err))
			.catch((err) => next(err));
	})
	.delete((req, res, next) => {
		"use strict";
		Promotions.findByIdAndRemove(req.params.promoId)
			.then((response) => {
				res.statusCode = 200;
				res.setHeader('Contrent-Type', 'application/json');
				res.json(response)
			}, (err) => console.log(err))
			.catch((err) => console.log(err));
	});

module.exports = promo_router;

