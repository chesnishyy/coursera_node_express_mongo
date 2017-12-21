const MongoClient = require('mongodb').MongoClient;

const dboper = require('./operations');

const url = 'mongodb://127.0.0.1:27017/conFusion';

MongoClient.connect(url).then((client) => {

	console.log(`Connected correctly to server`);

	const dbName = 'conFusion';
	const db = client.db(dbName);

	dboper.insertDocument(db, {name: 'Vadonut', description: 'Test'}, 'dishes')
		.then((result) => {
			console.log('Insert document: \n', result.ops);

			return dboper.findDocuments(db, 'dishes');
		})
		.then((docs) => {
			console.log('Found Documents: \n', docs);

			return dboper.updateDocument(db, {name: 'Vadonut'}, {description: 'Updated Test'}, 'dishes');
		})
		.then((result) => {
			console.log('Updated Document: \n', result.result);

			return dboper.findDocuments(db, 'dishes');
		})
		.then((docs) => {
			console.log('Found Updated Document: \n', docs);

			return db.dropCollection('dishes');
		})
		.then((result) => {
			console.log('Dropped Collection: ', result);

			return client.close();
		})
		.catch((err) => console.log(err));

}, (err) => console.log(err))
	.catch((err) => console.log(err));
