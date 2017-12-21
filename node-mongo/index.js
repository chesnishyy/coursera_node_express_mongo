const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://127.0.0.1:27017/conFusion';

MongoClient.connect(url, (err, client) => {
	"use strict";
	assert.equal(err, null);

	console.log(`Connected correctly to server`);

	const dbName = 'conFusion';
	const db = client.db(dbName);
	const collection = db.collection('dishes');

	collection.insertOne({
		'name': 'Utappizza',
		'description': 'test'
	}, (err, result) => {
		assert.equal(err, null);

		console.log('After Inseert: \n');
		console.log(result.ops);

		collection.find({}).toArray((err, docs) => {
			assert.equal(err, null);

			console.log('Found: \n');
			console.log(docs);

			db.dropCollection('dishes', (err, result) => {
				assert.equal(err, null);

				client.close();
			})
		})
	});

});
