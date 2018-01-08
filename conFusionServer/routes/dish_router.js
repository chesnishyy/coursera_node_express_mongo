const express = require('express');
const body_parser = require('body-parser');
const mongoose = require('mongoose');

const Dishes = require('../models/dishes')

const dish_router = express.Router();

dish_router.use(body_parser.json());

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
		}, {
				new: true
			})
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


dish_router.route('/:dish_id/comments')

	.get((req, res, next) => {
		"use strict";
		Dishes.findById(req.params.dish_id)
			.then((dish) => {
				if (dish !== null) {
					res.statusCode = 200;
					res.setHeader('Contrent-Type', 'application/json');
					res.json(dish.comments)
				} else {
					err = new Error('Dish ' + req.params.dish_id + ' not found')
					err.status = 404;
					return next(err);
				}
			}, (err) => next(err))
			.catch((err) => next(err));
	})
	.post((req, res, next) => {
		"use strict";
		Dishes.findById(req.params.dish_id)
			.then((dish) => {
				if (dish !== null) {
					dish.comments.push(req.body);
					dish.save()
						.then((dish) => {
							res.statusCode = 200;
							res.setHeader('Contrent-Type', 'application/json');
							res.json(dish);
						}, (err) => next(err))
				} else {
					err = new Error('Dish ' + req.params.dish_id + ' not found')
					err.status = 404;
					return next(err);
				}
			}, (err) => next(err))
			.catch((err) => next(err));
	})
	.put((req, res, next) => {
		"use strict";
		res.statusCode = 403;
		res.end(`PUT operation not supported on /dishes` + req.params.dish_id + '/comments');
	})
	.delete((req, res, next) => {
		"use strict";
		Dishes.findById(req.params.dish_id)
			.then((dish) => {
				if (dish !== null) {
					for (let i = dish.comments.length - 1; i >= 0; i--) {
						dish.comments.id(dish.comments[i]._id).remove();
					}
					dish.save()
						.then((dish) => {
							res.statusCode = 200;
							res.setHeader('Contrent-Type', 'application/json');
							res.json(dish);
						}, (err) => next(err))
				} else {
					err = new Error('Dish ' + req.params.dish_id + ' not found')
					err.status = 404;
					return next(err);
				}
			}, (err) => console.log(err))
			.catch((err) => console.log(err));
	});

dish_router.route('/:dish_id/comments/:comment_id')
	.get((req, res, next) => {
		"use strict";
		Dishes.findById(req.params.dish_id)
			.then((dish) => {
				if (dish !== null && dish.comments.id(req.params.comment_id) !== null) {
					res.statusCode = 200;
					res.setHeader('Contrent-Type', 'application/json');
					res.json(dish.comments.id(req.params.comment_id))
				} else if (dish === null) {
					err = new Error('Dish ' + req.params.dish_id + ' not found')
					err.status = 404;
					return next(err);
				} else {
					err = new Error('Comment ' + req.params.comment_id + ' not found')
					err.status = 404;
					return next(err);
				}
			}, (err) => next(err))
			.catch((err) => next(err));
	})
	.post((req, res, next) => {
		"use strict";
		res.statusCode = 403;
		res.end(`POST operation not supported on /dishes/ ${req.params.dish_id}/comments${req.params.comment_id}`);
	})
	.put((req, res, next) => {
		"use strict";
		Dishes.findById(req.params.dish_id)
			.then((dish) => {
				if (dish !== null && dish.comments.id(req.params.comment_id) !== null) {
					if (req.body.rating) {
						dish.comments.id(req.params.comment_id).rating = req.body.rating;
					}
					if (req.body.comment) {
						dish.comments.id(req.params.comment_id).comment = req.body.comment;
					}
					dish.save()
						.then((dish) => {
							res.statusCode = 200;
							res.setHeader('Contrent-Type', 'application/json');
							res.json(dish);
						}, (err) => next(err))
				} else if (dish === null) {
					err = new Error('Dish ' + req.params.dish_id + ' not found')
					err.status = 404;
					return next(err);
				} else {
					err = new Error('Comment ' + req.params.comment_id + ' not found')
					err.status = 404;
					return next(err);
				}
			}, (err) => next(err))
			.catch((err) => next(err));
	})
	.delete((req, res, next) => {
		"use strict";
		Dishes.findById(req.params.dish_id)
			.then((dish) => {
				if (dish !== null && dish.comments.id(req.params.comment_id) !== null) {
					dish.comments.id(req.params.comment_id).remove();
					dish.save()
						.then((dish) => {
							res.statusCode = 200;
							res.setHeader('Contrent-Type', 'application/json');
							res.json(dish);
						}, (err) => next(err))
				} else if (dish === null) {
					err = new Error('Dish ' + req.params.dish_id + ' not found')
					err.status = 404;
					return next(err);
				} else {
					err = new Error('Comment ' + req.params.comment_id + ' not found')
					err.status = 404;
					return next(err);
				}
			}, (err) => console.log(err))
			.catch((err) => console.log(err));
	})
module.exports = dish_router;