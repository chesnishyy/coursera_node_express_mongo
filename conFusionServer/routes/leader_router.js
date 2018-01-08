const express = require('express');
const body_parser = require('body-parser');
const mongoose = require('mongoose');

const Leaders = require('../models/leaders');

const leader_router = express.Router();

leader_router.use(body_parser.json());

leader_router.route('/')
	.get((req, res, next) => {
		"use strict";
		Leaders.find({})
			.then((leaders) => {
				res.statusCode = 200;
				res.setHeader('Contrent-Type', 'application/json');
				res.json(leaders);
			}, (err) => console.log(err))
			.catch((err) => console.log(err));
	})
	.post((req, res, next) => {
		"use strict";
		Leaders.create(req.body)
			.then((leader) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(leader);
			}, (err) => console.log(err))
			.catch((err) => console.log(err));
	})
	.put((req, res, next) => {
		"use strict";
		res.statusCode = 403;
		res.end(`PUT operation not supported on /leaders`);
	})
	.delete((req, res, next) => {
		"use strict";
		Leaders.remove({})
			.then((response) => {
				res.statusCode = 200;
				res.setHeader('Contrent-Type', 'application/json');
				res.json(response)
			}, (err) => console.log(err))
			.catch((err) => console.log(err));
	});

leader_router.route('/:leaderId')
	.get((req, res, next) => {
		"use strict";
		Leaders.findById(req.params.leaderId)
			.then((leader) => {
				res.statusCode = 200;
				res.setHeader('Contrent-Type', 'application/json');
				res.json(leader)
			}, (err) => next(err))
			.catch((err) => next(err));
	})
	.post((req, res, next) => {
		"use strict";
		res.statusCode = 403;
		res.end(`POST operation not supported on /leaders/ ${req.params.leaderId}`);
	})
	.put((req, res, next) => {
		"use strict";
		Leaders.findByIdAndUpdate(req.params.leaderId, {
			$set: req.body
		}, {
				new: true
			})
			.then((leader) => {
				res.statusCode = 200;
				res.setHeader('Contrent-Type', 'application/json');
				res.json(leader)
			}, (err) => next(err))
			.catch((err) => next(err));
	})
	.delete((req, res, next) => {
		"use strict";
		Leaders.findByIdAndRemove(req.params.leaderId)
			.then((response) => {
				res.statusCode = 200;
				res.setHeader('Contrent-Type', 'application/json');
				res.json(response)
			}, (err) => console.log(err))
			.catch((err) => console.log(err));
	});

module.exports = leader_router;