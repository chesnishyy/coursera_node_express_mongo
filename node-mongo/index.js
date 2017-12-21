const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url, (err, db) => {
	"use strict";
	assert.equal(err, null);

	console.log(`Connected correctly to server`);

	const collection = db.collection('dishes');

	collection.insertOne({
		'name': 'Utappizza',
		'description': 'test'
	})
		.then((result) => {
			console.log('After Insert: \n');
			console.log(result.ops);
			return result;
		})
		.find({}).toArray()
		.then((docs) => {
			console.log('Found: \n')
			console.log(docs)
		});

	db.dropCollection('dishes')
});
