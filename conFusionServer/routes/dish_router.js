const express = require('express');
const body_parser = require('body-parser');
const mongoose = require('mongoose');

const Dishes = require('../models/dishes')

const dish_router = express.Router();

//dish_router.use(body_parser.json());

dish_router.route('/')

	.get((req, res, next) => {
		"use strict";
		Dishes.find({})
			.then((dishes) => {
				res.statusCode = 200;
				res.setHeader('Contrent-Type', 'application/json');
				res.json(dishes)
			}, (err) => next(err))
			.catch((err) => next(err));
	})
	.post((req, res, next) => {
		"use strict";
		Dishes.create(req.body)
			.then((dish) => {
				console.log('Dish Created', dish);
				res.statusCode = 200;
				res.setHeader('Contrent-Type', 'application/json');
				res.json(dish) 
			}, (err) => next(err))
			.catch((err) => next(err));
	})
	.put((req, res, next) => {
		"use strict";
		res.statusCode = 403;
		res.end(`PUT operation not supported on /dishes`);
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

dish_router.route('/:dish_id')
	.get((req, res, next) => {
		"use strict";
		Dishes.findById(req.params.dish_id)
			.then((dish) => {
				res.statusCode = 200;
				res.setHeader('Contrent-Type', 'application/json');
				res.json(dish)
			}, (err) => next(err))
			.catch((err) => next(err));
	})
	.post((req, res, next) => {
		"use strict";
		res.statusCode = 403;
		res.end(`POST operation not supported on /dishes/ ${req.params.dish_id}`);
	})
	.put((req, res, next) => {
		"use strict";
		Dishes.findByIdAndUpdate(req.params.dish_id, {
			$set: req.body
		}, { new: true })
			.then((dish) => {
				res.statusCode = 200;
				res.setHeader('Contrent-Type', 'application/json');
				res.json(dish)
			}, (err) => next(err))
			.catch((err) => next(err));
	})
	.delete((req, res, next) => {
		"use strict";
		Dishes.findByIdAndRemove(req.params.dish_id)
			.then((response) => {
				res.statusCode = 200;
					res.setHeader('Contrent-Type', 'application/json');
					res.json(response)
			}, (err) => console.log(err))
			.catch((err) => console.log(err));
	});

module.exports = dish_router;

