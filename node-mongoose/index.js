const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Dishes = require('./models/dishes');

const url = 'mongodb://127.0.0.1:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {

    console.log('Connected correctly to server');

    Dishes.create({
        name: "Uthappizza",
        description: 'TEST'
    })
    .then((dish) => {
        console.log(dish);

        return Dishes.find({}).exec();
    })
    .then((dishes) => {
        console.log(dishes);

        return db.connection.db.collection('dishes').drop();
    })
    .then(() => {
        return db.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });
});